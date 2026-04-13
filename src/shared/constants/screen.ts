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
        href: "/activity/add",
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
    "/activity/add", // hide on the add-activity form
    "/activity/edit/", // hide on the add-activity form
    "/settings/", // hide on any individual activity detail screen
];
