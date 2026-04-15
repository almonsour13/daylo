import {
    ACTIVITY_CATEGORIES,
    ACTIVITY_PRIORITY,
    ACTIVITY_REPEAT_TYPE,
    ACTIVITY_STATUS,
} from "@/shared/constants/constant";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activity = sqliteTable("activity", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
    description: text("description"),

    date: text("date").notNull(), // YYYY-MM-DD
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),

    repeatType: text("repeatType", { enum: ACTIVITY_REPEAT_TYPE })
        .default("once")
        .notNull(),

    repeatDays: text("repeat_days").default("[]").notNull(),

    priority: text("priority", { enum: ACTIVITY_PRIORITY })
        .default("none")
        .notNull(),
    category: text("category", { enum: ACTIVITY_CATEGORIES })
        .default("none")
        .notNull(),

    notificationEnabled: integer("notification_enabled").default(0).notNull(),
    status: text("status", {
        enum: ACTIVITY_STATUS,
    })
        .default("active")
        .notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),

    updatedAt: integer("updated_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
});
