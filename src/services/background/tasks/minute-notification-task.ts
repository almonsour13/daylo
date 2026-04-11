import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import * as Notifications from "expo-notifications";

export const TASK_NAME = "MINUTE_NOTIFICATION_TASK";

// defineTask must live at module top level
TaskManager.defineTask(TASK_NAME, async () => {
    try {
        console.log("⏰ Background task triggered");

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "🔁 Background Ping",
                body: "This tries to run every ~1 minute",
            },
            trigger: null,
        });

        return BackgroundTask.BackgroundTaskResult.Success;
    } catch (error) {
        console.error("Failed to execute background task:", error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
});
