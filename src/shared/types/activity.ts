export type DayAbbrev = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type ActivityStatus = 0 | 1; // 0 = inactive, 1 = active
export type ActivityPriority = 1 | 2 | 3; // 1 = low, 2 = medium, 3 = high

export type Activity = {
    id: number;
    name: string;
    description: string | null;
    date: string; // 'YYYY-MM-DD'
    startTime: string; // 'HH:mm'
    endTime: string; // 'HH:mm'
    repeat: string | null; // raw JSON string from DB — parse when needed
    status: number;
    priority: number;
    notificationEnabled: number | null; // 0 | 1
    createdAt: Date;
    updatedAt: Date;
};

// Parsed helper type — use this in components
export type ActivityWithRepeat = Omit<Activity, "repeat"> & {
    repeat: DayAbbrev[];
};

export type ActivityLogRecord = {
    id: number;
    activityId: number;
    date: string; // 'YYYY-MM-DD'
    status: number; // 0 | 1
    startTime: string; // 'HH:mm'
    endTime: string; // 'HH:mm'
    createdAt: Date;
    updatedAt: Date;
};
