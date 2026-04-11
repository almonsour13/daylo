// repositories/activity-repositories.ts
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { activity } from "../schema";

export type Activity = typeof activity.$inferSelect;
export type CreateActivityInput = typeof activity.$inferInsert;
export type UpdateActivityInput = Partial<CreateActivityInput>;

export const activityRepository = {
    async getAll(): Promise<Activity[]> {
        console.log("[activityRepository] getAll");
        const rows = await db.select().from(activity);
        console.log(
            "[activityRepository] getAll result:",
            JSON.stringify(rows),
        ); // ✅ log raw result
        return rows;
    },
    async get(id: number): Promise<Activity | undefined> {
        console.log("[activityRepository] get", id);
        const rows = await db
            .select()
            .from(activity)
            .where(eq(activity.id, id));
        return rows[0];
    },
    async create(data: CreateActivityInput): Promise<Activity> {
        console.log("[activityRepository] create", data);
        const rows = await db.insert(activity).values(data).returning();
        return rows[0];
    },
    async update(
        id: number,
        data: UpdateActivityInput,
    ): Promise<Activity | undefined> {
        console.log("[activityRepository] update", id, data);
        const rows = await db
            .update(activity)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(activity.id, id))
            .returning();
        return rows[0];
    },
    async delete(id: number): Promise<boolean> {
        console.log("[activityRepository] delete", id);
        const rows = await db
            .delete(activity)
            .where(eq(activity.id, id))
            .returning();
        return rows.length > 0;
    },
};
