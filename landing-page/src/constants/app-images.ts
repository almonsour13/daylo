export type AppScreen = "home" | "calendar" | "activity" | "activityForm";

export const APP_IMAGES = {
    home: {
        light: "/app/home-light.png",
        dark: "/app/home-dark.png",
        alt: "Daylo home screen showing the daily overview and planned activities.",
        description:
            "The home screen greets the user, shows the days of the week, and lists today's activities with their schedules.",
    },
    calendar: {
        light: "/app/calendar-light.png",
        dark: "/app/calendar-dark.png",
        alt: "Daylo calendar screen showing a month and the selected day's activities.",
        description:
            "The calendar lets users move between months, select a date, review that day's activities, and add an activity.",
    },
    activity: {
        light: "/app/activity-light.png",
        dark: "/app/activity-dark.png",
        alt: "Daylo activities screen showing tools to search, filter, and manage activities.",
        description:
            "The activities screen lists scheduled activities and provides search, filters, and multi-select management.",
    },
    activityForm: {
        light: "/app/activity-form-light.png",
        dark: "/app/activity-form-dark.png",
        alt: "Daylo activity form for creating or editing a scheduled activity.",
        description:
            "The activity form captures activity details, category, priority, date, time range, repeat schedule, notifications, and active status.",
    },
} as const satisfies Record<
    AppScreen,
    { light: string; dark: string; alt: string; description: string }
>;

export const ALL_APP_IMAGES: string[] = Object.values(APP_IMAGES).flatMap(
    ({ light, dark }) => [light, dark],
);
export const SHOT = { width: 1080, height: 2340 };
