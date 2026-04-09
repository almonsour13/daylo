import type {
    Activity,
    ActivityWithRepeat,
    DayAbbrev,
} from "@/shared/types/activity";

export function parseRepeat(raw: string | null): DayAbbrev[] {
    try {
        return JSON.parse(raw ?? "[]") as DayAbbrev[];
    } catch {
        return [];
    }
}

export function parseActivity(a: Activity): ActivityWithRepeat {
    return { ...a, repeat: parseRepeat(a.repeat) };
}
export const toggleStatus = (activity: Activity): Activity => ({
    ...activity,
    status: activity.status === 1 ? 2 : 1,
});
