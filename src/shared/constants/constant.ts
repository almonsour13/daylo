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
        color: "#e5e7eb",
    },
    1: {
        label: "Pending",
        color: "#fce642",
    },
    2: {
        label: "Completed",
        color: "#22c55e",
    },
    3: {
        label: "Missed",
        color: "#ef4444",
    },
};

export const PRIORITY: Record<
    number,
    {
        label: string;
        color: string;
    }
> = {
    0: {
        label: "None",
        color: "#e5e7eb",
    },
    1: {
        label: "Low",
        color: "#ef4444",
    },
    2: {
        label: "Medium",
        color: "#fce642",
    },
    3: {
        label: "High",
        color: "#22c55e",
    },
};

export const NAV_ITEMS = [
    {
        label: "Home",
        icon: "home" as const,
        href: "/", // ← not "/"
        isVisibile: true,
    },
    // {
    //     label: "__fab__",
    //     icon: "plus" as const,
    //     href: "/add",
    //     isVisibile: true,
    // },
    {
        label: "Activity",
        icon: "activity" as const,
        href: "/activity",
        isVisibile: true,
    },
] as const;

export const HIDDEN_ON_ROUTES: string[] = [
    "/add", // hide on the add-activity form
    "/settings/", // hide on any individual activity detail screen
];
