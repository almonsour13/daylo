import {
    addDays,
    format,
    startOfDay,
    startOfMonth,
    subDays,
    subMonths,
    subYears,
} from "date-fns";
import { like } from "drizzle-orm";
import { CATEGORY, PRIORITY, REPEAT_TYPE } from "../constants/constant";
import { logger } from "../utils/logger";
import { db } from "./index";
import { activity } from "./schema";

type NewActivity = typeof activity.$inferInsert;

const TAG = "[Seed]";
const PREFIX = "seed-";

const pick = (list: { label: string }[], name: string) => {
    const hit = list.find((i) => i.label.toLowerCase() === name.toLowerCase());
    if (!hit) throw new Error(`${TAG} "${name}" is not in the constants list`);
    return hit.label;
};
const cat = (n: string) => pick(CATEGORY, n);
const pri = (n: string) => pick(PRIORITY, n);
const rep = (n: string) => pick(REPEAT_TYPE, n);

const today = startOfDay(new Date());
const day = (offset: number) => format(addDays(today, offset), "yyyy-MM-dd");
const ago = (days: number) => subDays(new Date(), days);

const make = (
    id: string,
    o: Partial<NewActivity> & Pick<NewActivity, "name" | "date" | "startTime">,
): NewActivity => ({
    id: `${PREFIX}${id}`,
    description: null,
    endTime: "",
    repeatType: rep("once"),
    repeatDays: "[]",
    priority: pri("none"),
    category: cat("none"),
    notificationEnabled: false,
    status: "active",
    createdAt: ago(14),
    updatedAt: ago(14),
    deletedAt: null,
    ...o,
});

const buildRows = (): NewActivity[] => [
    // Repeating, started in the past
    make("run", {
        name: "Morning run",
        description:
            "Easy 30-minute jog around the park before work. Keep a steady pace and stretch afterwards.",
        date: day(-14),
        startTime: "06:00",
        endTime: "06:30",
        repeatType: rep("daily"),
        category: cat("exercise"),
        priority: pri("medium"),
        notificationEnabled: true,
        updatedAt: ago(2), // edited, so "Last Updated" shows
    }),
    make("standup", {
        name: "Team stand-up",
        description:
            "Quick 15-minute sync: what I finished yesterday, what's planned today, and any blockers.",
        date: day(-30),
        startTime: "09:30",
        endTime: "09:45",
        repeatType: rep("mon to fri"),
        category: cat("work"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("gym", {
        name: "Strength training",
        description:
            "Alternate upper-body and lower-body sessions. Bring the water bottle and gym towel.",
        date: day(-21),
        startTime: "18:00",
        endTime: "19:00",
        repeatType: rep("custom"),
        repeatDays: JSON.stringify([1, 3, 5]), // Mon, Wed, Fri
        category: cat("exercise"),
        priority: pri("medium"),
        notificationEnabled: true,
    }),
    make("study", {
        name: "Spanish study session",
        description:
            "Review this week's vocabulary, then practice 20 minutes of listening exercises.",
        date: day(-10),
        startTime: "19:30",
        endTime: "21:00",
        repeatType: rep("custom"),
        repeatDays: JSON.stringify([2, 4]), // Tue, Thu
        category: cat("learning"),
        priority: pri("medium"),
        notificationEnabled: true,
    }),
    make("review", {
        name: "Weekly review",
        description:
            "Look back on the week, tidy up the task list, and choose the top three priorities for next week.",
        date: day(-14), // same weekday as today
        startTime: "17:00",
        endTime: "17:30",
        repeatType: rep("weekly"),
        category: cat("work"),
        priority: pri("medium"),
        notificationEnabled: true,
    }),
    make("rent", {
        name: "Pay rent",
        description:
            "Transfer the monthly rent to the landlord before the 1st to avoid late fees.",
        date: format(subMonths(startOfMonth(today), 2), "yyyy-MM-dd"),
        startTime: "09:00",
        endTime: "09:15",
        repeatType: rep("monthly"),
        category: cat("finance"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("birthday", {
        name: "Mum's birthday",
        description:
            "Call in the morning and pick up the cake from the bakery before dinner.",
        date: format(subYears(addDays(today, 10), 2), "yyyy-MM-dd"), // lands 10 days from now each year
        startTime: "09:00",
        endTime: "09:30",
        repeatType: rep("yearly"),
        category: cat("personal"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("read", {
        name: "Read before bed",
        description:
            "Read 20 pages of the current book to wind down without screens.",
        date: day(-5),
        startTime: "21:30",
        endTime: "22:00",
        repeatType: rep("daily"),
        category: cat("personal"),
        priority: pri("low"),
    }),

    // One-time, one per remaining category
    make("client", {
        name: "Client meeting: project kickoff",
        description:
            "Walk through the scope, timeline, and deliverables. Bring the draft proposal and the list of open questions.",
        date: day(0),
        startTime: "14:00",
        endTime: "15:00",
        category: cat("work"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("dentist", {
        name: "Dentist check-up",
        description:
            "Routine cleaning and check-up. Arrive 10 minutes early to fill in the forms.",
        date: day(3),
        startTime: "14:00",
        endTime: "15:00",
        category: cat("health"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("groceries", {
        name: "Grocery shopping",
        description:
            "Buy vegetables, eggs, rice, and cleaning supplies. Check the pantry list first.",
        date: day(-1), // a past day
        startTime: "18:00",
        endTime: "19:00",
        category: cat("home"),
        priority: pri("low"),
    }),
    make("dinner", {
        name: "Dinner with friends",
        description:
            "Table booked for 7 PM. Confirm the headcount and share the location in the group chat.",
        date: day(2),
        startTime: "19:00",
        endTime: "21:00",
        category: cat("social"),
        priority: pri("medium"),
        notificationEnabled: true,
    }),
    make("airport", {
        name: "Pick up Alex from the airport",
        description:
            "Terminal 2, arrivals. The flight lands at 8:15, so leave early to beat the morning traffic.",
        date: day(5),
        startTime: "08:15",
        endTime: "09:30",
        category: cat("travel"),
        priority: pri("high"),
        notificationEnabled: true,
    }),
    make("assignment", {
        name: "Submit final assignment",
        description:
            "Upload the final report to the class portal and double-check the file format before the deadline.",
        date: day(4),
        startTime: "23:00",
        endTime: "23:30",
        category: cat("school"),
        priority: pri("high"),
        notificationEnabled: true,
    }),

    // Edge cases
    make("future", {
        name: "Guitar lesson",
        description:
            "Practice the new chord progression beforehand and bring the sheet music.",
        date: day(7), // repeating, starts later
        startTime: "20:00",
        endTime: "20:30",
        repeatType: rep("weekly"),
        category: cat("learning"),
        priority: pri("low"),
        notificationEnabled: true,
    }),
    make("long", {
        // Realistic but long, to test truncation and wrapping
        name: "Prepare quarterly performance review presentation for the leadership team",
        description:
            "Collect the key metrics from the last quarter, summarize the major wins and setbacks, and draft the slides for the leadership review. Share the draft with the team for feedback a day before the meeting so there is time to revise.",
        date: day(1),
        startTime: "11:00",
        endTime: "12:00",
        category: cat("work"),
        priority: pri("medium"),
    }),

    // Recently Deleted
    make("del-routine", {
        name: "Evening meditation",
        description:
            "Ten minutes of guided breathing before bed. Replaced by the new reading routine.",
        date: day(-40),
        startTime: "22:00",
        endTime: "22:10",
        repeatType: rep("daily"),
        category: cat("health"),
        status: "deleted",
        deletedAt: ago(2),
        updatedAt: ago(2),
    }),
    make("del-lunch", {
        name: "Team lunch",
        description:
            "Monthly lunch with the design team at the new noodle place.",
        date: day(-12),
        startTime: "12:30",
        endTime: "13:30",
        category: cat("social"),
        status: "deleted",
        deletedAt: ago(9),
        updatedAt: ago(9),
    }),
    make("del-almost", {
        name: "Car service appointment",
        description:
            "Oil change and tire rotation at the workshop. Bring the service booklet.",
        date: day(-35),
        startTime: "10:00",
        endTime: "11:00",
        category: cat("home"),
        status: "deleted",
        deletedAt: ago(29), // purged tomorrow
        updatedAt: ago(29),
    }),
    make("del-expired", {
        name: "Quarterly planning workshop",
        description:
            "Half-day planning session with the product team. Cancelled and rescheduled.",
        date: day(-50),
        startTime: "10:00",
        endTime: "13:00",
        category: cat("work"),
        status: "deleted",
        deletedAt: ago(31), // purged on the next launch
        updatedAt: ago(31),
    }),
];
/** Inserts sample activities. Development only. Re-running replaces earlier seed rows. */
export async function seedActivities({
    reset = true,
}: { reset?: boolean } = {}): Promise<number> {
    if (!__DEV__) {
        logger.warn(`${TAG} skipped: development builds only`);
        return 0;
    }
    try {
        const rows = buildRows();
        if (reset)
            await db.delete(activity).where(like(activity.id, `${PREFIX}%`));
        await db.insert(activity).values(rows);
        logger.log(`${TAG} inserted ${rows.length} activities`);
        return rows.length;
    } catch (error) {
        logger.error(`${TAG} error`, error);
        throw error;
    }
}

/** Seeds only when the activity table has no rows, so launches never overwrite real data. */
export async function seedIfEmpty(): Promise<number> {
    if (!__DEV__) return 0;
    const existing = await db
        .select({ id: activity.id })
        .from(activity)
        .limit(1);
    if (existing.length > 0) {
        logger.log(`${TAG} skipped: table already has data`);
        return 0;
    }
    return seedActivities({ reset: false });
}

/** Deletes only rows created by the seed functions (ids starting with "seed-"). */
export async function removeSeedActivities(): Promise<void> {
    if (!__DEV__) return;
    await db.delete(activity).where(like(activity.id, `${PREFIX}%`));
    logger.log(`${TAG} removed seeded activities`);
}
