import * as Notifications from "expo-notifications";
import { router } from "expo-router";

type NotificationData = {
    activityId: number;
    screen: string;
};
// call once in root _layout.tsx on mount
export function registerNotificationHandlers(): () => void {
    const receivedSub = Notifications.addNotificationReceivedListener(
        (notification) => {
            const data = notification.request.content.data as NotificationData;
            console.log("[Notification received] activityId:", data.activityId);
        },
    );
    const responseSub = Notifications.addNotificationResponseReceivedListener(
        (response) => {
            const data = response.notification.request.content
                .data as NotificationData;

            if (data.screen === "activity") {
                router.push({
                    pathname: "/activity",
                    params: { activityId: String(data.activityId) },
                });
            }
        },
    );

    return () => {
        receivedSub.remove();
        responseSub.remove();
    };
}
