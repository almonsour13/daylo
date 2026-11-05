export type Option<T extends string> = { label: string; value: T };

export const REMINDER_LEAD: Option<"0" | "5" | "10" | "15">[] = [
    { label: "At start time", value: "0" },
    { label: "5 min before", value: "5" },
    { label: "10 min before", value: "10" },
    { label: "15 min before", value: "15" },
];

export const TIME_FORMAT: Option<"12h" | "24h">[] = [
    { label: "12-hour", value: "12h" },
    { label: "24-hour", value: "24h" },
];

export const NOTIFICATION_SOUND: Option<"default" | "silent">[] = [
    { label: "Default", value: "default" },
    { label: "Silent", value: "silent" },
];

export const PREFERENCE_DEFAULTS = {
    theme: "system",
    remindersEnabled: true,
    reminderLeadMinutes: "0",
    timeFormat: "12h",
    notificationSound: "default",

    sound: false,
} as const;

export const nextOf = <T extends string>(
    options: Option<T>[],
    current: T,
): T => {
    const i = options.findIndex((o) => o.value === current);
    return options[(i + 1) % options.length].value;
};

export const labelOf = <T extends string>(options: Option<T>[], current: T) =>
    options.find((o) => o.value === current)?.label;
