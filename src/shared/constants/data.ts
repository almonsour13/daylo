import { ActivityRecord } from "../types/activity";
export const activitiesData = () => {
    const today = new Date();

    const toDateString = (date: Date) => date.toISOString().split("T")[0];

    const dayOffset = (days: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + days);
        return toDateString(d);
    };

    const toTime = (hours: number, minutes = 0) =>
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    const now = new Date();

    return [
        {
            id: 1,
            name: "Morning Workout",
            description:
                "Start the day with a structured workout routine that includes light stretching, mobility exercises, and a mix of cardio and strength training. Focus on improving flexibility, boosting energy levels, and maintaining overall physical health. This session helps build consistency, reduce stress, and prepare both body and mind for the day ahead.",
            date: dayOffset(0),
            startTime: toTime(6, 0),
            endTime: toTime(7, 0),
            repeat: JSON.stringify([
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
            ]),
            status: 1,
            priority: 1,
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 2,
            name: "Morning Workout",
            description:
                "Start the day with a structured workout routine that includes light stretching, mobility exercises, and a mix of cardio and strength training. Focus on improving flexibility, boosting energy levels, and maintaining overall physical health. This session helps build consistency, reduce stress, and prepare both body and mind for the day ahead.",
            date: dayOffset(0),
            startTime: toTime(6, 0),
            endTime: toTime(7, 0),
            repeat: JSON.stringify(["Mon", "Wed", "Fri"]),
            status: 1,
            priority: 2,
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 3,
            name: "Morning Workout",
            description:
                "Start the day with a structured workout routine that includes light stretching, mobility exercises, and a mix of cardio and strength training. Focus on improving flexibility, boosting energy levels, and maintaining overall physical health. This session helps build consistency, reduce stress, and prepare both body and mind for the day ahead.",
            date: dayOffset(0),
            startTime: toTime(6, 0),
            endTime: toTime(7, 0),
            repeat: JSON.stringify(["Mon", "Wed", "Fri"]),
            status: 2,
            priority: 3,
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
    ];
};

export const activitysData = (): ActivityRecord[] => {
    const today = new Date();

    const toDateString = (date: Date) => date.toISOString().split("T")[0];

    const dayOffset = (days: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() + days);
        return toDateString(d);
    };

    const timeISO = (hours: number, minutes = 0) => {
        const d = new Date(today);
        console.log(hours, minutes);
        d.setHours(hours, minutes, 0, 0);
        return d.toISOString();
    };

    const now = new Date();

    return [
        {
            id: 1,
            activityId: 1,
            date: dayOffset(0),
            status: 1, // completed
            startTime: timeISO(6, 0),
            endTime: timeISO(7, 0),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 2,
            activityId: 1,
            date: dayOffset(-1),
            status: 2, // missed / not completed
            startTime: timeISO(6, 0),
            endTime: timeISO(7, 0),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 3,
            activityId: 2,
            date: dayOffset(-2),
            status: 3,
            startTime: timeISO(8, 0),
            endTime: timeISO(9, 0),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 4,
            activityId: 3,
            date: dayOffset(-3),
            status: 2,
            startTime: timeISO(7, 30),
            endTime: timeISO(8, 30),
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 5,
            activityId: 2,
            date: dayOffset(1),
            status: 4,
            startTime: timeISO(6, 30),
            endTime: timeISO(7, 30),
            createdAt: now,
            updatedAt: now,
        },
    ];
};
