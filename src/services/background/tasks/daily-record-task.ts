import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { format } from "date-fns";

export const DAILY_RECORD_TASK = "DAYLO_DAILY_RECORD_CREATION";

TaskManager.defineTask(DAILY_RECORD_TASK, async () => {
    try {
        const today = format(new Date(), "yyyy-MM-dd");

        console.log(`[DailyLogTask] Running for date: ${today}`);
        // create activity records for all activities for a day,
        // check if the activity has already record for a day
        // check if the activity schedule date has already passed or already starting
        // schedule a notification
    } catch (error) {
        console.error("Failed to execute the background task:", error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
});
