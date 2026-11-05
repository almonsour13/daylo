import { PREFERENCE_DEFAULTS as D } from "@/shared/constants/preferences";
import { logger } from "@/shared/utils/logger";
import { format, startOfDay } from "date-fns";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { getRepeatType } from "../helper/helper";
import { useSettingsStore } from "../stores/use-settings-store";
import { Activity, Preferences } from "../types/type";
import { activityService } from "./activity.service";

export type ScheduleResult =
    | "scheduled"
    | "disabled" // trashed, inactive, or the activity's own switch is off
    | "reminders-off" // master switch in Settings is off
    | "no-permission"
    | "deferred" // repeating, starts on a later date
    | "past" // one-time, already over
    | "invalid" // bad time/date or no repeat days
    | "error";

const prefs = (): Partial<Preferences> =>
    useSettingsStore.getState().settings?.preferences ?? {};

const remindersOn = () => prefs().remindersEnabled ?? D.remindersEnabled;
const soundOn = () =>
    (prefs().notificationSound ?? D.notificationSound) !== "silent";
const is24h = () => (prefs().timeFormat ?? D.timeFormat) === "24h";
const leadMinutes = () => {
    const n = Number(prefs().reminderLeadMinutes ?? D.reminderLeadMinutes);
    return Number.isFinite(n) && n > 0 ? n : 0;
};

// Android fixes a channel's sound at creation, so each sound mode gets its own channel
const channelId = () =>
    soundOn() ? "activity-reminders" : "activity-reminders-silent";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: soundOn(),
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

const TAG = "[Notification]";
const T = Notifications.SchedulableTriggerInputTypes;

type Time = { hour: number; minute: number };

// App days: 0 = Sunday ... 6 = Saturday. Expo weekdays: 1 = Sunday ... 7 = Saturday.
const toExpoWeekday = (day: number) => day + 1;

const parseTime = (value?: string): Time | null => {
    const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? "");
    if (!match) return null;
    const hour = Number(match[1]);
    const minute = Number(match[2]);
    return hour < 24 && minute < 60 ? { hour, minute } : null;
};

const parseDays = (raw?: string | null): number[] => {
    try {
        const value = JSON.parse(raw ?? "[]");
        return Array.isArray(value)
            ? value.filter((n) => Number.isInteger(n) && n >= 0 && n <= 6)
            : [];
    } catch {
        return [];
    }
};

const parseLocalDate = (value: string): Date | null => {
    const [y, m, d] = (value ?? "").split("-").map(Number);
    return y && m && d ? new Date(y, m - 1, d) : null;
};

const resolveDays = (activity: Activity): number[] => {
    if (activity.repeatType === "custom") return parseDays(activity.repeatDays);
    return getRepeatType(activity.repeatType)?.value ?? [];
};

// Shifts a time of day back by `minutes`. dayShift is -1 when it wraps past midnight.
const shiftTime = (time: Time, minutes: number) => {
    const total = time.hour * 60 + time.minute - minutes;
    const dayShift = Math.floor(total / 1440);
    const wrapped = ((total % 1440) + 1440) % 1440;
    return {
        hour: Math.floor(wrapped / 60),
        minute: wrapped % 60,
        dayShift,
    };
};

class NotificationService {
    // One job at a time: a cancel+schedule pair from an edit, a foreground
    // syncAll and a settings change must never interleave
    private queue: Promise<unknown> = Promise.resolve();

    private enqueue<T>(task: () => Promise<T>): Promise<T> {
        const run = this.queue.then(task);
        this.queue = run.catch(() => undefined);
        return run;
    }

    private async ensureChannel() {
        if (Platform.OS !== "android") return;
        await Notifications.setNotificationChannelAsync(channelId(), {
            name: soundOn()
                ? "Activity reminders"
                : "Activity reminders (silent)",
            importance: Notifications.AndroidImportance.HIGH,
            sound: soundOn() ? "default" : null,
        });
    }

    async hasPermission(): Promise<boolean> {
        const { status } = await Notifications.getPermissionsAsync();
        return status === "granted";
    }

    async requestPermissions(): Promise<boolean> {
        try {
            // Android 13+ needs a channel before the prompt
            await this.ensureChannel();

            const existing = await Notifications.getPermissionsAsync();
            if (existing.status === "granted") return true;
            if (!existing.canAskAgain) {
                logger.warn(`${TAG} requestPermissions → blocked in settings`);
                return false;
            }

            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                logger.warn(`${TAG} requestPermissions → denied (${status})`);
                return false;
            }
            logger.log(`${TAG} requestPermissions → granted`);
            return true;
        } catch (error) {
            logger.error(`${TAG} requestPermissions → error`, error);
            return false;
        }
    }

    async getScheduledNotifications(): Promise<
        Notifications.NotificationRequest[]
    > {
        try {
            const notifications =
                await Notifications.getAllScheduledNotificationsAsync();
            logger.log(
                `${TAG} getScheduledNotifications → count=${notifications.length}`,
            );
            return notifications;
        } catch (error) {
            logger.error(`${TAG} getScheduledNotifications → error`, error);
            return [];
        }
    }

    // ---- internals (never call these from outside the queue) ----

    private async doCancel(ids: string[]): Promise<void> {
        if (ids.length === 0) return;
        const idSet = new Set(ids);
        const scheduled =
            await Notifications.getAllScheduledNotificationsAsync();

        const mine = scheduled.filter((n) => {
            const owner = n.content.data?.activityId as string | undefined;
            if (owner && idSet.has(owner)) return true;
            // legacy identifiers: "<id>-<day>"
            return ids.some((id) => n.identifier.startsWith(`${id}-`));
        });

        await Promise.all(
            mine.map((n) =>
                Notifications.cancelScheduledNotificationAsync(n.identifier),
            ),
        );
        logger.log(
            `${TAG} cancel → ${mine.length} removed for ${ids.length} activity(ies)`,
        );
    }

    private async doSchedule(activity: Activity): Promise<ScheduleResult> {
        const label = `"${activity.name}" (id=${activity.id})`;

        // 1. The activity's own switch (and trash/status)
        if (
            activity.deletedAt ||
            activity.status !== "active" ||
            !activity.notificationEnabled
        ) {
            logger.log(`${TAG} schedule → disabled: ${label}`);
            return "disabled";
        }

        // 2. The master switch in Settings
        if (!remindersOn()) {
            logger.log(`${TAG} schedule → reminders off: ${label}`);
            return "reminders-off";
        }

        const time = parseTime(activity.startTime);
        const base = parseLocalDate(activity.date);
        if (!time || !base) {
            logger.log(`${TAG} schedule → invalid time/date: ${label}`);
            return "invalid";
        }

        // Repeating triggers can't take a start date, so wait until it arrives.
        // syncAllActivityNotifications() schedules these on app start/foreground.
        if (
            activity.repeatType !== "once" &&
            base.getTime() > startOfDay(new Date()).getTime()
        ) {
            logger.log(`${TAG} schedule → deferred (starts later): ${label}`);
            return "deferred";
        }

        // 3. The system permission
        if (!(await this.requestPermissions())) {
            logger.warn(`${TAG} schedule → no permission: ${label}`);
            return "no-permission";
        }

        // Read once so one run uses consistent settings
        const channel = channelId();
        const sound = soundOn();
        const lead = leadMinutes();

        const startLabel = format(
            new Date(2000, 0, 1, time.hour, time.minute),
            is24h() ? "HH:mm" : "h:mm a",
        );

        // offset = minutes before the start time
        const slots = [
            { suffix: "start", offset: 0, body: `Starts at ${startLabel}` },
            ...(lead > 0
                ? [
                      {
                          suffix: "pre",
                          offset: lead,
                          body: `Starts in ${lead} minutes (${startLabel})`,
                      },
                  ]
                : []),
        ];

        const schedule = (
            id: string,
            body: string,
            trigger: Notifications.NotificationTriggerInput,
        ) =>
            Notifications.scheduleNotificationAsync({
                identifier: `${activity.id}:${id}`,
                content: {
                    title: activity.name,
                    body,
                    sound: sound ? "default" : false,
                    data: { activityId: activity.id },
                },
                trigger,
            });

        const jobs: Promise<string>[] = [];

        if (activity.repeatType === "once") {
            const start = new Date(base);
            start.setHours(time.hour, time.minute, 0, 0);

            for (const slot of slots) {
                const at = new Date(start.getTime() - slot.offset * 60_000);
                if (at.getTime() <= Date.now()) continue;
                jobs.push(
                    schedule(`once:${slot.suffix}`, slot.body, {
                        type: T.DATE,
                        date: at,
                        channelId: channel,
                    }),
                );
            }
        } else {
            for (const slot of slots) {
                const { hour, minute, dayShift } = shiftTime(time, slot.offset);

                switch (activity.repeatType) {
                    case "weekly": {
                        const day = (((base.getDay() + dayShift) % 7) + 7) % 7;
                        jobs.push(
                            schedule(`weekly:${slot.suffix}`, slot.body, {
                                type: T.WEEKLY,
                                weekday: toExpoWeekday(day),
                                hour,
                                minute,
                                channelId: channel,
                            }),
                        );
                        break;
                    }

                    case "monthly": {
                        // A wrap past midnight would need the previous month's length
                        if (dayShift !== 0) break;
                        jobs.push(
                            schedule(`monthly:${slot.suffix}`, slot.body, {
                                type: T.MONTHLY,
                                day: base.getDate(),
                                hour,
                                minute,
                                channelId: channel,
                            }),
                        );
                        break;
                    }

                    case "yearly": {
                        if (dayShift !== 0) break;
                        jobs.push(
                            schedule(`yearly:${slot.suffix}`, slot.body, {
                                type: T.YEARLY,
                                month: base.getMonth(), // 0-11
                                day: base.getDate(),
                                hour,
                                minute,
                                channelId: channel,
                            }),
                        );
                        break;
                    }

                    default: {
                        // daily, mon to fri, custom
                        const days = resolveDays(activity);
                        if (days.length === 7) {
                            jobs.push(
                                schedule(`daily:${slot.suffix}`, slot.body, {
                                    type: T.DAILY,
                                    hour,
                                    minute,
                                    channelId: channel,
                                }),
                            );
                        } else {
                            for (const day of days) {
                                const shifted =
                                    (((day + dayShift) % 7) + 7) % 7;
                                jobs.push(
                                    schedule(
                                        `w${day}:${slot.suffix}`,
                                        slot.body,
                                        {
                                            type: T.WEEKLY,
                                            weekday: toExpoWeekday(shifted),
                                            hour,
                                            minute,
                                            channelId: channel,
                                        },
                                    ),
                                );
                            }
                        }
                    }
                }
            }
        }

        if (jobs.length === 0) {
            return activity.repeatType === "once" ? "past" : "invalid";
        }

        await Promise.all(jobs);
        logger.log(`${TAG} schedule → ${jobs.length} scheduled: ${label}`);
        return "scheduled";
    }

    // ---- public API (all serialized through the queue) ----

    /** Cancels any existing reminders for the activity, then schedules fresh ones. */
    async syncScheduleActivityNotification(
        activity: Activity,
    ): Promise<ScheduleResult> {
        try {
            return await this.enqueue(async () => {
                await this.doCancel([activity.id]);
                return this.doSchedule(activity);
            });
        } catch (error) {
            logger.error(`${TAG} sync → error for id=${activity.id}`, error);
            return "error";
        }
    }

    /** Removes the reminders of one or many activities in a single pass. */
    async cancelActivityNotifications(ids: string[]): Promise<void> {
        try {
            await this.enqueue(() => this.doCancel(ids));
        } catch (error) {
            logger.error(`${TAG} cancel → error`, error);
        }
    }

    async cancelActivityNotification(activityId: string): Promise<void> {
        await this.cancelActivityNotifications([activityId]);
    }

    async cancelAllScheduleActivityNotifications(): Promise<void> {
        try {
            await this.enqueue(() =>
                Notifications.cancelAllScheduledNotificationsAsync(),
            );
            logger.log(`${TAG} cancelAll → success`);
        } catch (error) {
            logger.error(`${TAG} cancelAll → error`, error);
        }
    }

    /**
     * Rebuilds every schedule from the database. Call on app start/foreground
     * and after any reminder setting changes. With reminders off it only cancels.
     */
    async syncAllActivityNotifications(): Promise<number> {
        try {
            return await this.enqueue(async () => {
                await Notifications.cancelAllScheduledNotificationsAsync();
                if (!remindersOn()) return 0;

                // Must exclude trashed activities (deletedAt is null)
                const activities = await activityService.get({});
                let scheduled = 0;
                for (const activity of activities) {
                    if ((await this.doSchedule(activity)) === "scheduled") {
                        scheduled++;
                    }
                }
                logger.log(
                    `${TAG} syncAll → ${scheduled}/${activities.length} activities scheduled`,
                );
                return scheduled;
            });
        } catch (error) {
            logger.error(`${TAG} syncAll → error`, error);
            return 0;
        }
    }
}

export const notificationService = new NotificationService();
