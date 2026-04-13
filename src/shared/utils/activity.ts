import { NewActivity } from "@/features/add-activity/context/add-activity-context";
import type { Activity, Reapet_Days } from "@/shared/types/activity";

export function parseRepeat(raw: string | null): Reapet_Days[] {
    try {
        return JSON.parse(raw ?? "[]") as Reapet_Days[];
    } catch {
        return [];
    }
}

export function parseActivity(a: Activity | NewActivity) {
    return { ...a, repeat: parseRepeat(a.repeatDays) };
}
export const toggleStatus = (activity: Activity): Activity => ({
    ...activity,
    status: activity.status === "active" ? "inactive" : "active",
});
