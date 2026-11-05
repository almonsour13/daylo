import {
    CATEGORY,
    DAY_LABELS,
    PRIORITY,
    REPEAT_TYPE,
} from "@/shared/constants/constant";
import {
    differenceInMinutes,
    format,
    formatDistanceToNowStrict,
    startOfDay,
} from "date-fns";

export function getCategory(category: string) {
    return CATEGORY.find((c) => c.label === category && c.label !== "none");
}

export function getPriority(priority: string) {
    return PRIORITY.find((p) => p.label === priority && p.label !== "none");
}
export function getRepeatType(repeatType: string) {
    return REPEAT_TYPE.find((r) => r.label === repeatType);
}

// "HH:mm" on the given day, or null when empty / invalid
function applyTime(date: Date, time?: string | null): Date | null {
    if (!time) return null;
    const [h, m] = time.split(":").map(Number);
    if (!Number.isFinite(h) || !Number.isFinite(m)) return null;

    const result = new Date(date);
    result.setHours(h, m, 0, 0);
    return result;
}

export function getActivityTimeRange(
    startTime: string,
    endTime: string | null | undefined,
    date: Date,
) {
    const start = applyTime(date, startTime) ?? startOfDay(date);
    // End time is optional: null means the activity is a single point in time
    const end = applyTime(date, endTime);

    return {
        start,
        end,
        label: end
            ? [format(start, "p"), format(end, "p")].join(" - ")
            : format(start, "p"),
    };
}

const ENDED_VISIBLE_MS = 5 * 60 * 60 * 1000; // 5 hours

type RelativeTimeLabel = {
    label: string;
    className: string;
};

export function getRelativeTimeLabel(
    now: Date,
    startTime: Date,
    endTime: Date | null,
): RelativeTimeLabel {
    // No end time: only "starts in ..." / "started ... ago"
    if (!endTime) {
        if (now < startTime) {
            return {
                label: `Starts ${formatDistanceToNowStrict(startTime, { addSuffix: true })}`,
                className: "text-muted-foreground",
            };
        }
        return {
            label: `Started ${formatDistanceToNowStrict(startTime, { addSuffix: true })}`,
            className: "text-muted-foreground",
        };
    }

    // Ended, but only within the last 5 hours
    if (
        now >= endTime
        // && now.getTime() - endTime.getTime() <= ENDED_VISIBLE_MS
    ) {
        return {
            label: `Ended ${formatDistanceToNowStrict(endTime, { addSuffix: true })}`,
            className: "text-red-400",
        };
    }

    // Currently happening
    if (now >= startTime && now < endTime) {
        return {
            label: `Ends ${formatDistanceToNowStrict(endTime, { addSuffix: true })}`,
            className: "text-green-500",
        };
    }

    // Upcoming
    if (now < startTime) {
        return {
            label: `Starts ${formatDistanceToNowStrict(startTime, { addSuffix: true })}`,
            className: "text-muted-foreground",
        };
    }

    // Ended more than 5 hours ago: no label
    return { label: "", className: "" };
}

function parseRepeatDays(raw?: string | null): number[] {
    if (!raw) return [];
    try {
        const value = JSON.parse(raw);
        return Array.isArray(value)
            ? value.filter((n): n is number => Number.isInteger(n))
            : [];
    } catch {
        return [];
    }
}

export function getRepeatLabel(repeatType: string, repeatDays?: string | null) {
    const days = parseRepeatDays(repeatDays);
    if (repeatType === "custom" && days.length > 0) {
        return (
            "Every " +
            days
                .map((i) => DAY_LABELS[i]?.slice(0, 3))
                .filter(Boolean)
                .join(", ")
        );
    }
    return repeatType;
}

/** Empty string when there is no end time, so callers can skip it */
export function formatDuration(start: Date, end: Date | null) {
    if (!end) return "";
    const mins = Math.max(0, differenceInMinutes(end, start));
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (!h) return `${m}m`;
    if (!m) return `${h}h`;
    return `${h}h ${m}m`;
}
