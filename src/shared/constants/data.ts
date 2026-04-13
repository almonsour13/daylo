import { Activity, ActivityRecord } from "../types/activity";

export const activitiesData = (): Activity[] => {
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
                "Start the day with a structured workout routine that includes light stretching, mobility exercises, and a mix of cardio and strength training.",
            date: dayOffset(0),
            startTime: toTime(6, 0),
            endTime: toTime(7, 0),
            repeatType: "custom",
            repeatDays: JSON.stringify(["Mon", "Wed", "Fri"]),
            status: "active",
            priority: "high",
            category: "exercise",
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 2,
            name: "Deep Work Session",
            description:
                "Focused work session with no distractions. Close all social media and work on the most important task of the day.",
            date: dayOffset(0),
            startTime: toTime(9, 0),
            endTime: toTime(11, 0),
            repeatType: "daily",
            repeatDays: JSON.stringify([]),
            status: "active",
            priority: "high",
            category: "work",
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 3,
            name: "Read 30 Minutes",
            description:
                "Read at least 20 pages of a book. Focus on non-fiction or educational content to grow knowledge.",
            date: dayOffset(0),
            startTime: toTime(12, 0),
            endTime: toTime(12, 30),
            repeatType: "daily",
            repeatDays: JSON.stringify([]),
            status: "active",
            priority: "medium",
            category: "learning",
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 4,
            name: "Lunch Break",
            description:
                "Step away from the desk. Eat a healthy meal and take a short walk to reset focus for the afternoon.",
            date: dayOffset(0),
            startTime: toTime(12, 30),
            endTime: toTime(13, 30),
            repeatType: "weekly",
            repeatDays: JSON.stringify([]),
            status: "inactive",
            priority: "none",
            category: "health",
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 5,
            name: "Evening Run",
            description:
                "5km run around the park. Focus on maintaining a steady pace and enjoy the evening air.",
            date: dayOffset(1),
            startTime: toTime(18, 0),
            endTime: toTime(19, 0),
            repeatType: "custom",
            repeatDays: JSON.stringify(["Tue", "Thu", "Sat"]),
            status: "active",
            priority: "medium",
            category: "exercise",
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 6,
            name: "Spanish Lesson",
            description:
                "Practice vocabulary, grammar and conversational Spanish for 30 minutes using Duolingo or a textbook.",
            date: dayOffset(1),
            startTime: toTime(19, 30),
            endTime: toTime(20, 0),
            repeatType: "custom",
            repeatDays: JSON.stringify(["Mon", "Wed", "Fri"]),
            status: "active",
            priority: "low",
            category: "learning",
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 7,
            name: "Budget Review",
            description:
                "Review monthly expenses, update budget spreadsheet and check savings goals progress.",
            date: dayOffset(2),
            startTime: toTime(20, 0),
            endTime: toTime(20, 30),
            repeatType: "once",
            repeatDays: JSON.stringify([]),
            status: "active",
            priority: "high",
            category: "finance",
            notificationEnabled: 1,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 8,
            name: "Meditation",
            description:
                "10 minutes of mindfulness and breathing exercises to wind down before bed.",
            date: dayOffset(0),
            startTime: toTime(21, 0),
            endTime: toTime(21, 15),
            repeatType: "daily",
            repeatDays: JSON.stringify([]),
            status: "active",
            priority: "low",
            category: "health",
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 9,
            name: "Family Dinner",
            description:
                "Have dinner with family. No phones at the table. Catch up on everyone's day.",
            date: dayOffset(-1),
            startTime: toTime(18, 30),
            endTime: toTime(19, 30),
            repeatType: "custom",
            repeatDays: JSON.stringify(["Sat", "Sun"]),
            status: "temporary_deleted",
            priority: "medium",
            category: "social",
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 10,
            name: "House Cleaning",
            description:
                "Deep clean the living room, kitchen and bathroom. Vacuum and mop all floors.",
            date: dayOffset(-2),
            startTime: toTime(10, 0),
            endTime: toTime(12, 0),
            repeatType: "custom",
            repeatDays: JSON.stringify(["Sat"]),
            status: "inactive",
            priority: "low",
            category: "home",
            notificationEnabled: 0,
            createdAt: now,
            updatedAt: now,
        },
    ];
};
