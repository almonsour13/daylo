export type Priority = "none" | "low" | "medium" | "high";
export type Category =
    | "none"
    | "work"
    | "exercise"
    | "personal"
    | "health"
    | "learning"
    | "social"
    | "finance"
    | "home"
    | "travel"
    | "school"; // ✅ no "general"
export type Repeat_Type = "once" | "daily" | "weekly" | "custom";
export type Reapet_Days = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export type Status = "active" | "inactive" | "temporary_deleted" | "deleted";

export type Activity = {
    id: number;
    name: string;
    description: string | null;
    priority: Priority;
    category: Category;
    date: string; // 'YYYY-MM-DD'
    startTime: string; // 'HH:mm'
    endTime: string; // 'HH:mm'
    repeatType: Repeat_Type;
    repeatDays: string;
    status: Status;
    notificationEnabled: number; // 0 | 1
    createdAt: Date;
    updatedAt: Date;
};

export type ActivityRecord = {
    id: number;
    activityId: number;
    date: string; // 'YYYY-MM-DD'
    status: number; // 0 | 1
    startTime: string; // 'HH:mm'
    endTime: string; // 'HH:mm'
    createdAt: Date;
    updatedAt: Date;
};
