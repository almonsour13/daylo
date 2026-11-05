import {
    formatDuration,
    getActivityTimeRange,
    getCategory,
    getPriority,
    getRelativeTimeLabel,
    getRepeatLabel,
} from "@/shared/helper/helper";
import { Activity } from "@/shared/types/type";

// Plain function (not a hook): safe to call inside .map()
export function getActivityItem(
    activity: Activity,
    now: Date,
    selectedDate?: Date,
) {
    const effectiveDate = selectedDate ?? now;

    const {
        start,
        end, // null when the activity has no end time
        label: timeRange,
    } = getActivityTimeRange(
        activity.startTime,
        activity.endTime,
        effectiveDate,
    );

    const priority = getPriority(activity.priority);
    const category = getCategory(activity.category);
    const duration = formatDuration(start, end); // "" without an end time

    return {
        priority,
        category,
        timeRange,
        duration,
        // "6:00 AM - 6:30 AM · 30m", or just "6:00 AM" without an end time
        timeSummary: duration ? `${timeRange} · ${duration}` : timeRange,
        relativeTime: getRelativeTimeLabel(now, start, end), // { label, className }
        repeatLabel: getRepeatLabel(activity.repeatType, activity.repeatDays),
        // Without an end time the activity is a point in time: never "now",
        // and past as soon as the start time has passed
        isNow: end ? now >= start && now < end : false,
        isPast: end ? now >= end : now >= start,
    };
}
