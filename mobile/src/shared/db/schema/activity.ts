import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activity = sqliteTable(
    "activity",
    {
        id: text("id")
            .primaryKey()
            .$defaultFn(() => crypto.randomUUID()),

        name: text("name").notNull(),
        description: text("description"),

        // "YYYY-MM-DD"
        date: text("date").notNull(),
        startTime: text("start_time").notNull(),
        endTime: text("end_time").notNull(),

        repeatType: text("repeatType").notNull(),
        repeatDays: text("repeat_days").default("[]").notNull(),

        priority: text("priority").default("none").notNull(),
        category: text("category").default("none").notNull(),

        notificationEnabled: integer("notification_enabled", {
            mode: "boolean",
        })
            .default(false)
            .notNull(),
        status: text("status").default("active").notNull(),

        createdAt: integer("created_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .notNull(),

        updatedAt: integer("updated_at", { mode: "timestamp" })
            .$defaultFn(() => new Date())
            .$onUpdate(() => new Date())
            .notNull(),

        // null = not deleted. Set on soft delete, cleared on restore.
        deletedAt: integer("deleted_at", { mode: "timestamp" }),
    },
    (table) => ({
        statusIdx: index("activity_status_idx").on(table.status),
        dateIdx: index("activity_date_idx").on(table.date),
    }),
);
