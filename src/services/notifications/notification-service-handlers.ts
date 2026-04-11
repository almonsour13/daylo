import * as Notifications from "expo-notifications";
import { router } from "expo-router";

type NotificationData = {
    activityId: number;
    screen: string;
};

// call once in root _layout.tsx on mount
export function registerNotificationHandlers(): () => void {
    // fires when notification is received while app is open
    const receivedSub = Notifications.addNotificationReceivedListener(
        (notification) => {
            const data = notification.request.content.data as NotificationData;
            console.log("[Notification received] activityId:", data.activityId);
        },
    );

    // fires when user taps a notification
    const responseSub = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            const data = response.notification.request.content
                .data as NotificationData;

            if (data.screen === "activity") {
                router.push({
                    pathname: "/(app)/activity",
                    params: { activityId: String(data.activityId) },
                });
            }
        },
    );

    // return cleanup function to remove listeners on unmount
    return () => {
        receivedSub.remove();
        responseSub.remove();
    };
}

// handle notification that launched the app from a killed state
export async function handleInitialNotification(): Promise<void> {
    const response = await Notifications.getLastNotificationResponseAsync();
    if (!response) return;

    const data = response.notification.request.content.data as NotificationData;

    if (data.screen === "activity") {
        router.push({
            pathname: "/(app)/activity",
            params: { activityId: String(data.activityId) },
        });
    }
}
