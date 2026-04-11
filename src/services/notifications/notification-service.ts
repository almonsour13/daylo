import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

Notifications.scheduleNotificationAsync({
    content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
    },
    trigger: null,
});
export const notificationService = {
    async requestPermissions() {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== "granted") {
            console.log("❌ Notification permission denied");
            return false;
        }

        console.log("✅ Notification permission granted");
        return true;
    },
    async sampleNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "📢 Sample Notification",
                body: "This is a test notification!",
            },
            trigger: null, // immediate
        });
    },
};
