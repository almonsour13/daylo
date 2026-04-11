import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { format } from "date-fns";

export const MISSED_ACTIVITY_CHECK = "DAYLO_MISSED_ACTIVITY_CHECK";

TaskManager.defineTask(MISSED_ACTIVITY_CHECK, async () => {
    try {
        const today = format(new Date(), "yyyy-MM-dd");

        console.log(
            `[MissedActivityTask] Checking missed activities for: ${today}`,
        );
    } catch (error) {
        console.error("Failed to execute the background task:", error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
});
