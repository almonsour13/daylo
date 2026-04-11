import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { DAILY_RECORD_TASK } from "./tasks/daily-record-task";
import { MISSED_ACTIVITY_CHECK } from "./tasks/missed-activity-task";
import { TASK_NAME } from "./tasks/minute-notification-task";
import "./tasks/minute-notification-task";

const ONE_HOUR_SECS = 60 * 60;
const FIFTEEN_MINS_SECS = 15 * 60;

export const backgroundService = {
    async start() {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);

        if (isRegistered) {
            console.log("✅ Already registered");
            return;
        }

        await BackgroundTask.registerTaskAsync(TASK_NAME, {
            minimumInterval: 5, // for testing only — iOS ignores anything under ~10 min
        });

        console.log("🚀 Background task started");
    },

    async stop() {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);

        if (!isRegistered) {
            console.log("⚠️ Task not registered, nothing to stop");
            return;
        }

        await BackgroundTask.unregisterTaskAsync(TASK_NAME);
        console.log("🛑 Background task stopped");
    },

    async isRunning(): Promise<boolean> {
        return TaskManager.isTaskRegisteredAsync(TASK_NAME);
    },
};

export async function registerBackgroundTasks(): Promise<void> {
    // await registerTask(DAILY_RECORD_TASK, ONE_HOUR_SECS);
    // await registerTask(MISSED_ACTIVITY_CHECK, FIFTEEN_MINS_SECS);
}

export async function unregisterBackgroundTasks(): Promise<void> {
    await unregisterTask(DAILY_RECORD_TASK);
    await unregisterTask(MISSED_ACTIVITY_CHECK);
}
export async function getTaskStatus(): Promise<{
    dailyLog: boolean;
    missedActivity: boolean;
}> {
    const [dailyLog, missedActivity] = await Promise.all([
        TaskManager.isTaskRegisteredAsync(DAILY_RECORD_TASK),
        TaskManager.isTaskRegisteredAsync(MISSED_ACTIVITY_CHECK),
    ]);
    return { dailyLog, missedActivity };
}
async function registerTask(
    taskName: string,
    intervalSeconds: number,
): Promise<void> {
    try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(taskName);

        if (isRegistered) {
            console.log(
                `[TaskManager] ${taskName} already registered, skipping`,
            );
            return;
        }

        await BackgroundTask.registerTaskAsync(taskName, {
            minimumInterval: intervalSeconds,
        });

        console.log(`[TaskManager] Registered: ${taskName}`);
    } catch (e) {
        console.error(`[TaskManager] Failed to register ${taskName}:`, e);
    }
}
async function unregisterTask(taskName: string): Promise<void> {
    try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(taskName);
        if (!isRegistered) return;

        await BackgroundTask.unregisterTaskAsync(taskName);
        console.log(`[TaskManager] Unregistered: ${taskName}`);
    } catch (e) {
        console.error(`[TaskManager] Failed to unregister ${taskName}:`, e);
    }
}
