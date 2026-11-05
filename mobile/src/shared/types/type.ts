import { CATEGORY, PRIORITY, REPEAT_TYPE } from "../constants/constant";
import { activity } from "../db/schema";

export type Activity = typeof activity.$inferSelect;

export type RepeatType = (typeof REPEAT_TYPE)[number]["label"];
export type CategoryType = (typeof CATEGORY)[number]["label"];
export type priorityType = (typeof PRIORITY)[number]["label"];

export type ThemeMode = "light" | "dark" | "system";

export type Preferences = {
    theme: ThemeMode;
    remindersEnabled?: boolean;
    reminderLeadMinutes?: "0" | "5" | "10" | "15";
    timeFormat?: "12h" | "24h";
    notificationSound?: "default" | "silent";
};

export type Settings = {
    preferences: Preferences;
};

export type Profile = {
    id?: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};
