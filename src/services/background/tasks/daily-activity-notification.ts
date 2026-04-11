import * as TaskManager from "expo-task-manager";
import * as BackgroundTask from "expo-background-task";
import { format } from "date-fns";

export const DAILY_ACTIVITY_NOTIFICATION_TASK =
    "DAILY_ACTIVITY_NOTIFICATION_CREATION";

TaskManager.defineTask(DAILY_ACTIVITY_NOTIFICATION_TASK, async () => {
    try {
        const today = format(new Date(), "yyyy-MM-dd");
        //RUN EVERY 24 hours
        // SET NOTIFICATION FOR ALL ACTIVITIES SCHEDULED TODAY
        // CHECK IF THERE'S AN ACTIVITY, STOP IF EMPTY
        // CHECK IF ACITIVTY DATE IS DURING TODAY OR ALREADY PASSED TO SCHEDULE, eg: you cannot schedule notification an activity that the date is still upcoming
        // GET THE TIME STARTING TIME AND GET TODAY DATE TO SETUP THE NOTIFICATION
    } catch (error) {
        console.error("Failed to execute the background task:", error);
        return BackgroundTask.BackgroundTaskResult.Failed;
    }
    return BackgroundTask.BackgroundTaskResult.Success;
});
