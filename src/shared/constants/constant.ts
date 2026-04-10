import Feather from "@expo/vector-icons/Feather";
import { DayAbbrev } from "../types/activity";

export const WEEK_DAYS: DayAbbrev[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

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
        label: "Pending",
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

export const PRIORITY: Record<
    number,
    {
        label: string;
        color: string;
        icon: keyof typeof Feather.glyphMap;
    }
> = {
    0: {
        label: "None",
        color: "bg-zinc-300",
        icon: "circle",
    },
    1: {
        label: "Low",
        color: "bg-green-400 opacity-50",
        icon: "arrow-down-circle",
    },
    2: {
        label: "Medium",
        color: "bg-yellow-400 opacity-50",
        icon: "minus-circle", // better than plain "circle" for distinction
    },
    3: {
        label: "High",
        color: "bg-red-400 opacity-50",
        icon: "arrow-up-circle",
    },
};

export const NAV_ITEMS = [
    {
        label: "Home",
        icon: "home" as const,
        href: "/", // ← not "/"
        isVisibile: true,
    },
    {
        label: "__fab__",
        icon: "plus" as const,
        href: "/addActivity",
        isVisibile: true,
    },
    {
        label: "Activity",
        icon: "activity" as const,
        href: "/activity",
        isVisibile: true,
    },
] as const;

export const HIDDEN_ON_ROUTES: string[] = [
    "/addActivity", // hide on the add-activity form
    "/settings/", // hide on any individual activity detail screen
];
