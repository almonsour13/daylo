import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activity = sqliteTable("activity", {
    id: integer("id").primaryKey({ autoIncrement: true }),

    name: text("name").notNull(),
    description: text("description"),

    date: text("date").notNull(), // YYYY-MM-DD
    startTime: text("start_time").notNull(),
    endTime: text("end_time").notNull(),

    // Repeat settings
    // repeatType: text("repeat_type", {
    //     enum: ["once", "weekly", "mon_to_fri", "custom"],
    // })
    //     .default("once")
    //     .notNull(),
    // repeatDays: text("repeat_days").default("[]").notNull(),

    repeat: text("repeat").default("[]").notNull(),

    // Priority and status
    status: integer("status").default(0).notNull(),
    priority: integer("priority").notNull(),

    // Notifications
    notificationEnabled: integer("notification_enabled").default(0).notNull(),

    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),

    updatedAt: integer("updated_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
});
