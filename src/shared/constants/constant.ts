import Feather from "@expo/vector-icons/Feather";
import { Reapet_Days } from "../types/activity";

export const STATUS: Record<
    number,
    {
        label: string;
        color: string;
    }
> = {
    0: {
        label: "None",
        color: "bg-zinc-300",
    },
    1: {
        label: "Upcoming",
        color: "bg-yellow-400",
    },
    2: {
        label: "Completed",
        color: "bg-green-400",
    },
    3: {
        label: "Cancelled",
        color: "bg-gray-400",
    },
    4: {
        label: "Missed",
        color: "bg-red-400",
    },
};

export const ACTIVITY_PRIORITY = ["none", "low", "medium", "high"] as const;
export const PRIORITY = {
    none: {
        label: "None",
        color: "bg-zinc-300",
        icon: "circle",
    },
    low: {
        label: "Low",
        color: "bg-green-400",
        icon: "arrow-down-circle",
    },
    medium: {
        label: "Medium",
        color: "bg-yellow-400",
        icon: "minus-circle",
    },
    high: {
        label: "High",
        color: "bg-red-400",
        icon: "arrow-up-circle",
    },
};
export const ACTIVITY_STATUS = [
    "active",
    "inactive",
    "temporary_deleted",
    "deleted",
] as const;
export const ACTIVITY_REPEAT_TYPE = [
    "once",
    "daily",
    "weekly",
    "custom",
] as const;
export const ACTIVITY_REAPEAT_DAYS: Reapet_Days[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];
export const CATEGORY: Record<
    string,
    {
        label: string;
        bgColor: string;
        textColor: string;
        icon: keyof typeof Feather.glyphMap;
    }
> = {
    none: {
        label: "None",
        bgColor: "bg-zinc-300",
        textColor: "text-zinc-700",
        icon: "circle",
    },
    work: {
        label: "Work",
        bgColor: "bg-blue-400",
        textColor: "text-blue-900",
        icon: "briefcase",
    },
    exercise: {
        label: "Exercise",
        bgColor: "bg-green-400",
        textColor: "text-green-900",
        icon: "activity",
    },
    personal: {
        label: "Personal",
        bgColor: "bg-purple-400",
        textColor: "text-purple-900",
        icon: "user",
    },
    health: {
        label: "Health",
        bgColor: "bg-red-400",
        textColor: "text-red-900",
        icon: "heart",
    },
    learning: {
        label: "Learning",
        bgColor: "bg-yellow-400",
        textColor: "text-yellow-900",
        icon: "book-open",
    },
    social: {
        label: "Social",
        bgColor: "bg-pink-400",
        textColor: "text-pink-900",
        icon: "users",
    },
    finance: {
        label: "Finance",
        bgColor: "bg-emerald-400",
        textColor: "text-emerald-900",
        icon: "dollar-sign",
    },
    home: {
        label: "Home",
        bgColor: "bg-orange-400",
        textColor: "text-orange-900",
        icon: "home",
    },
    travel: {
        label: "Travel",
        bgColor: "bg-cyan-400",
        textColor: "text-cyan-900",
        icon: "map-pin",
    },
    school: {
        label: "School",
        bgColor: "bg-indigo-400",
        textColor: "text-indigo-900",
        icon: "book",
    },
};
export const ACTIVITY_CATEGORIES = [
    "none",
    "health",
    "work",
    "personal",
    "exercise",
    "travel",
    "school",
    "home",
    "learning",
    "finance",
    "social",
] as const;
