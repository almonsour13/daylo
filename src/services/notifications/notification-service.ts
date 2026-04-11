import { Activity } from "@/shared/types/activity";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});
export const notificationService = {
    async sampleNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "📢 Sample Notification",
                body: "This is a test notification!",
            },
            trigger: null, // immediate
        });
    },
    async scheduleDailyReminders(
        activities: Activity[],
        date: Date,
    ): Promise<{ activityId: number; notificationId: string }[]> {
        const results: { activityId: number; notificationId: string }[] = [];

        for (const activity of activities) {
            if (!activity.notificationEnabled) continue;

            const [hours, minutes] = activity.startTime.split(":").map(Number);

            const trigger = new Date(date);
            trigger.setHours(hours, minutes, 0, 0);

            // skip if time has already passed
            if (trigger <= new Date()) continue;

            const notificationId =
                await notificationService.scheduleActivityReminder(
                    activity,
                    trigger,
                );

            if (notificationId) {
                results.push({ activityId: activity.id, notificationId });
            }
        }

        return results;
    },
    // schedule a notification for a single activity at a specific date
    async scheduleActivityReminder(
        activity: Activity,
        scheduledDate: Date,
    ): Promise<string | null> {
        try {
            const hasPermission =
                await notificationService.requestPermissions();
            if (!hasPermission) return null;

            const notificationId =
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `⏰ ${activity.name}`,
                        body:
                            activity.description ??
                            "Your activity is starting now.",
                        data: {
                            activityId: activity.id,
                            screen: "activity",
                        },
                        sound: "default",
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.DATE,
                        date: scheduledDate,
                    },
                });

            return notificationId;
        } catch (e) {
            console.error("[notificationService] scheduleActivityReminder:", e);
            return null;
        }
    },
    async setupAndroidChannel(): Promise<void> {
        if (Platform.OS !== "android") return;

        await Notifications.setNotificationChannelAsync("activity-reminders", {
            name: "Activity Reminders",
            description: "Notifies you when an activity is about to start",
            importance: Notifications.AndroidImportance.HIGH,
            sound: "default",
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    },
    async requestPermissions() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            console.log("❌ Notification permission denied");
            return false;
        }

        console.log("✅ Notification permission granted");
        return true;
    },
};
