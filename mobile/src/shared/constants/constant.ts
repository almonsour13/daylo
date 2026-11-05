export const TIME_SESSION_PHRASES = {
    morning: [
        "Start strong, finish stronger.",
        "Your goals are waiting.",
        "Make today count.",
        "One task at a time.",
        "Build the day you want.",
    ],
    afternoon: [
        "Keep the momentum going.",
        "You're halfway there.",
        "Stay focused, stay sharp.",
        "Push through — it's worth it.",
        "Every hour counts.",
    ],
    evening: [
        "Finish what you started.",
        "One last push.",
        "End the day with intention.",
        "Almost there — stay consistent.",
        "Great days are built by nights like this.",
    ],
};
export const DAY_LABELS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export const CATEGORY = [
    {
        label: "none",
        bgColor: "bg-zinc-300",
        textColor: "text-zinc-500",
        icon: "circle",
    },
    {
        label: "work",
        bgColor: "bg-blue-400",
        textColor: "text-blue-500",
        icon: "briefcase",
    },
    {
        label: "exercise",
        bgColor: "bg-green-400",
        textColor: "text-green-500",
        icon: "activity",
    },
    {
        label: "Personal",
        bgColor: "bg-purple-400",
        textColor: "text-purple-500",
        icon: "user",
    },
    {
        label: "health",
        bgColor: "bg-red-400",
        textColor: "text-red-500",
        icon: "heart",
    },
    {
        label: "learning",
        bgColor: "bg-yellow-400",
        textColor: "text-yellow-500",
        icon: "book-open",
    },
    {
        label: "social",
        bgColor: "bg-pink-400",
        textColor: "text-pink-500",
        icon: "users",
    },
    {
        label: "finance",
        bgColor: "bg-emerald-400",
        textColor: "text-emerald-500",
        icon: "dollar-sign",
    },
    {
        label: "home",
        bgColor: "bg-orange-400",
        textColor: "text-orange-500",
        icon: "home",
    },
    {
        label: "travel",
        bgColor: "bg-cyan-400",
        textColor: "text-cyan-500",
        icon: "map-pin",
    },
    {
        label: "school",
        bgColor: "bg-indigo-400",
        textColor: "text-indigo-500",
        icon: "book",
    },
];
export const PRIORITY = [
    {
        label: "none",
        bgColor: "bg-zinc-300",
        textColor: "text-zinc-500",
        icon: "circle",
    },
    {
        label: "low",
        bgColor: "bg-green-400",
        textColor: "text-green-500",
        icon: "arrow-down-circle",
    },
    {
        label: "medium",
        bgColor: "bg-yellow-400",
        textColor: "text-yellow-500",
        icon: "minus-circle",
    },
    {
        label: "high",
        bgColor: "bg-red-400",
        textColor: "text-red-500",
        icon: "arrow-up-circle",
    },
];
export const REPEAT_TYPE = [
    {
        label: "once",
        value: [],
    },
    {
        label: "daily",
        value: [0, 1, 2, 3, 4, 5, 6],
    },
    {
        label: "mon to fri",
        value: [1, 2, 3, 4, 5],
    },
    {
        label: "weekly",
        value: [],
    },
    {
        label: "monthly",
        value: [],
    },
    {
        label: "yearly",
        value: [],
    },
    {
        label: "custom",
        value: [],
    },
];

export const PREFIX = "@runna/test";

export const STORAGE_KEYS = {
    onboarding: `${PREFIX}:onboarding`,
    activity: `${PREFIX}:activity`,
    profile: `${PREFIX}:profile`,
    settings: `${PREFIX}:settings`,
    welcome: `${PREFIX}:welcome`,
};
