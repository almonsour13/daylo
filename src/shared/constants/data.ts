export const ActivitiesData = () => {
    const today = new Date();

    const toDateString = (date: Date) => date.toISOString().split("T")[0];

    const dayOffset = (days: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + days);
        return toDateString(d);
    };

    const timeISO = (hours: number, minutes = 0) => {
        const d = new Date(today);
        d.setHours(hours, minutes, 0, 0);
        return d.toISOString();
    };
    const now = new Date();

    return {
        id: 1,
        name: "Morning Workout",
        description: "Exercise and stretching",
        date: dayOffset(0),
        startTime: timeISO(6, 0),
        endTime: timeISO(7, 0),
        repeat: JSON.stringify(["Mon", "Wed", "Fri"]),
        status: 1,
        priority: 1,
        notificationEnabled: 0,
        createdAt: now,
        updatedAt: now,
    };
};
