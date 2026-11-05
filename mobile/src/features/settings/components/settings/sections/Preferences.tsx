import { DrawerHandle } from "@/shared/components/ui/Drawer";
import {
    PREFERENCE_DEFAULTS as D,
    labelOf,
    NOTIFICATION_SOUND,
    REMINDER_LEAD,
    TIME_FORMAT,
} from "@/shared/constants/preferences";
import { notificationService } from "@/shared/services/notification.service";
import { settingsService } from "@/shared/services/settings.service";
import { useSettingsStore } from "@/shared/stores/use-settings-store";
import { NavigationProp } from "@/shared/types/navigation";
import { Preferences, Settings } from "@/shared/types/type";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import DefaultDrawer from "../../../../../shared/components/drawer/DefaultDrawer";
import { SettingsItem } from "../../../type";
import SettingsSectionList from "../SettingsSectionList";

export default function PreferencesSection() {
    const navigation = useNavigation<NavigationProp>();
    const prefs: Partial<Preferences> =
        useSettingsStore((s) => s.settings?.preferences) ?? {};
    const setSettings = useSettingsStore((s) => s.setSettings);

    const theme = prefs.theme || "system";
    const remindersOn = prefs.remindersEnabled ?? D.remindersEnabled;
    const reminderLead = prefs.reminderLeadMinutes ?? D.reminderLeadMinutes;
    const timeFormat = prefs.timeFormat ?? D.timeFormat;
    const notificationSound = prefs.notificationSound ?? D.notificationSound;

    const reminderLeadDrawer = useRef<DrawerHandle>(null);
    const timeFormatDrawer = useRef<DrawerHandle>(null);
    const soundDrawer = useRef<DrawerHandle>(null);

    /** Updates the store right away, saves, and rolls back if saving fails. */
    const update = async (patch: Partial<Preferences>): Promise<boolean> => {
        // Read the latest state so fast taps don't overwrite each other
        const previous = useSettingsStore.getState().settings;
        const nextPrefs = { ...(previous?.preferences ?? {}), ...patch };

        setSettings({ ...previous, preferences: nextPrefs } as Settings);
        try {
            await settingsService.update({ preferences: nextPrefs });
            return true;
        } catch (e) {
            console.error("[Preferences] Failed to save:", e);
            setSettings(previous);
            return false;
        }
    };

    /** Saves a change that affects scheduled notifications, then rebuilds them. */
    const updateAndResync = async (patch: Partial<Preferences>) => {
        if (await update(patch)) {
            void notificationService.syncAllActivityNotifications();
        }
    };

    // syncAll cancels everything first, so it also handles turning reminders off
    const toggleReminders = () =>
        updateAndResync({ remindersEnabled: !remindersOn });

    const changeReminderLead = (value: Preferences["reminderLeadMinutes"]) => {
        if (value !== reminderLead) {
            void updateAndResync({ reminderLeadMinutes: value });
        }
    };

    // The time format is part of the notification text
    const changeTimeFormat = (value: Preferences["timeFormat"]) => {
        if (value !== timeFormat) void updateAndResync({ timeFormat: value });
    };

    const changeSound = (value: Preferences["notificationSound"]) => {
        if (value !== notificationSound) {
            void updateAndResync({ notificationSound: value });
        }
    };

    const items: SettingsItem[] = [
        {
            id: "theme",
            label: "Theme",
            description: "Light, dark, or system mode",
            icon: "moon",
            value: theme,
            type: "nav",
            onPress: () =>
                navigation.navigate("Settings", { screen: "ThemeScreen" }),
        },
        {
            id: "reminders",
            label: "Reminders",
            description: "Notify me when activities start",
            icon: "notifications",
            value: remindersOn, // boolean, so the Switch reflects the real state
            type: "toggle",
            onPress: toggleReminders,
        },
        {
            id: "reminder-lead",
            label: "Default reminder time",
            description: "Tap to change",
            icon: "alarm",
            value: labelOf(REMINDER_LEAD, reminderLead),
            type: "nav",
            disabled: !remindersOn,
            onPress: () => reminderLeadDrawer.current?.open(),
        },
        {
            id: "time-format",
            label: "Time format",
            description: "Tap to change",
            icon: "time",
            value: labelOf(TIME_FORMAT, timeFormat),
            visible: false,
            type: "nav",
            onPress: () => timeFormatDrawer.current?.open(),
        },
        {
            id: "notification-sound",
            label: "Notification sound",
            description: "Sound played when a reminder fires",
            icon: "volume-high",
            value: labelOf(NOTIFICATION_SOUND, notificationSound),
            type: "nav",
            disabled: !remindersOn,
            onPress: () => soundDrawer.current?.open(),
        },
    ];

    return (
        <>
            <SettingsSectionList sections={[{ title: "Preferences", items }]} />
            <DefaultDrawer
                ref={reminderLeadDrawer}
                title="Default reminder time"
                options={REMINDER_LEAD}
                value={reminderLead}
                onChange={changeReminderLead}
            />
            <DefaultDrawer
                ref={timeFormatDrawer}
                title="Time format"
                options={TIME_FORMAT}
                value={timeFormat}
                onChange={changeTimeFormat}
            />
            <DefaultDrawer
                ref={soundDrawer}
                title="Notification sound"
                options={NOTIFICATION_SOUND}
                value={notificationSound}
                onChange={changeSound}
            />
        </>
    );
}
