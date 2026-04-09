import { Activity } from "../types/activity";

export function isActivityValid(activity: Activity): boolean {
    if (!activity.name || activity.name.trim() === "") return false;
    if (!activity.date) return false;
    if (!activity.startTime) return false;
    if (!activity.endTime) return false;

    // Optional: basic time check
    if (activity.startTime >= activity.endTime) return false;

    return true;
}
