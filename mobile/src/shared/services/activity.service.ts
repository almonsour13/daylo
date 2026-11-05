import { endOfDay, format, parseISO, startOfDay, subDays } from "date-fns";
import { and, eq, inArray, isNull, like, lte, ne, or } from "drizzle-orm";
import { TRASH_RETENTION_DAYS } from "../constants/trash";
import { db } from "../db";
import { activity } from "../db/schema";
import { getRepeatType } from "../helper/helper";
import { Activity } from "../types/type";
import { logger } from "../utils/logger";

const TAG = "[ActivityService]";

const parseDays = (raw?: string | null): number[] => {
    try {
        const value = JSON.parse(raw || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
};

/** Whether an activity occurs on targetDate. Start date is checked by the query. */
const occursOn = (
    a: Pick<Activity, "date" | "repeatType" | "repeatDays">,
    targetDate: Date,
    targetDateStr: string,
): boolean => {
    switch (a.repeatType) {
        case "once":
            return a.date === targetDateStr;
        case "custom":
            return parseDays(a.repeatDays).includes(targetDate.getDay());
        case "weekly":
            return parseISO(a.date).getDay() === targetDate.getDay();
        case "monthly":
            // Day 29-31 skips shorter months, same as the notifications
            return parseISO(a.date).getDate() === targetDate.getDate();
        case "yearly": {
            const start = parseISO(a.date);
            return (
                start.getMonth() === targetDate.getMonth() &&
                start.getDate() === targetDate.getDate()
            );
        }
        default:
            return (
                getRepeatType(a.repeatType)?.value.includes(
                    targetDate.getDay(),
                ) ?? false
            );
    }
};

class ActivityService {
    async get({
        query,
        status = "active",
        category,
        priority,
    }: {
        query?: string;
        status?: string;
        category?: string;
        priority?: string;
    }): Promise<Activity[]> {
        const trimmed = query?.trim();
        try {
            const conditions = [
                status === "all"
                    ? ne(activity.status, "deleted")
                    : eq(activity.status, status),
                ...(category && category !== "all"
                    ? [eq(activity.category, category)]
                    : []),
                ...(priority && priority !== "all"
                    ? [eq(activity.priority, priority)]
                    : []),
                ...(trimmed
                    ? [
                          or(
                              like(activity.name, `%${trimmed}%`),
                              like(activity.description, `%${trimmed}%`),
                          ),
                      ]
                    : []),
            ];
            const activities = await db
                .select()
                .from(activity)
                .where(and(...conditions));

            logger.log(
                `${TAG} get → success`,
                `count=${activities.length}`,
                `status=${status}`,
                `category=${category ?? "all"}`,
                `priority=${priority ?? "all"}`,
                trimmed ? `query="${trimmed}"` : "",
            );
            return activities;
        } catch (error) {
            logger.error(
                `${TAG} get → error`,
                { query: trimmed, status, category, priority },
                error,
            );
            throw error;
        }
    }
    async getByDay(targetDate: Date): Promise<Activity[]> {
        const targetDateStr = format(targetDate, "yyyy-MM-dd");
        try {
            const dayStart = startOfDay(targetDate);
            const dayEnd = endOfDay(targetDate);

            const conditions = [
                eq(activity.status, "active"),
                lte(activity.date, targetDateStr),
            ];

            const data = await db
                .select()
                .from(activity)
                .where(and(...conditions));

            const filtered = data
                .filter((item) => {
                    const activity = item;
                    try {
                        return occursOn(activity, targetDate, targetDateStr);
                    } catch (error) {
                        logger.error(
                            `${TAG} getByDay → skipped invalid activity`,
                            {
                                id: activity.id,
                                repeatType: activity.repeatType,
                            },
                            error,
                        );
                        return false;
                    }
                })
                .sort((a, b) => {
                    const toMinutes = (time: string) => {
                        const [h, m] = time.split(":").map(Number);
                        return h * 60 + m;
                    };
                    return toMinutes(a.startTime) - toMinutes(b.startTime);
                });

            logger.log(
                `${TAG} getByDay → success`,
                `date=${targetDateStr}`,
                `matched=${filtered.length}/${data.length}`,
            );

            return filtered;
        } catch (error) {
            logger.error(
                `${TAG} getByDay → error`,
                { date: targetDateStr },
                error,
            );
            throw error;
        }
    }

    async getById(id: string): Promise<Activity | null> {
        try {
            const data = await db
                .select()
                .from(activity)
                .where(eq(activity.id, id));

            const found = data[0] ?? null;
            logger.log(
                `${TAG} getById → success`,
                `id=${id}`,
                found ? "found" : "not found",
            );
            return found;
        } catch (error) {
            logger.error(`${TAG} getById → error`, { id }, error);
            throw error;
        }
    }

    async create(data: Activity): Promise<void> {
        try {
            await db.insert(activity).values(data);
            logger.log(`${TAG} create → success`, `id=${data.id}`);
        } catch (error) {
            logger.error(`${TAG} create → error`, { id: data.id }, error);
            throw error;
        }
    }
    async updateById(id: string, data: Partial<Activity>): Promise<void> {
        try {
            const {
                id: _id,
                createdAt: _createdAt,
                updatedAt: _updatedAt,
                ...rest
            } = data;
            await db
                .update(activity)
                .set({ ...rest, updatedAt: new Date() })
                .where(eq(activity.id, id));
            logger.log(
                `${TAG} updateById → success`,
                `id=${id}`,
                `fields=${Object.keys(rest).join(",")}`,
            );
        } catch (error) {
            logger.error(`${TAG} updateById → error`, { id }, error);
            throw error;
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await db
                .update(activity)
                .set({ status: "deleted", deletedAt: new Date() })
                .where(eq(activity.id, id));
            logger.log(`${TAG} deleteById → success (soft delete)`, `id=${id}`);
        } catch (error) {
            logger.error(`${TAG} deleteById → error`, { id }, error);
            throw error;
        }
    }

    async deleteByIds(ids: string[]): Promise<void> {
        if (ids.length === 0) return;
        try {
            await db
                .update(activity)
                .set({ status: "deleted", deletedAt: new Date() })
                .where(inArray(activity.id, ids));
            logger.log(
                `${TAG} deleteByIds → success (soft delete)`,
                `count=${ids.length}`,
            );
        } catch (error) {
            logger.error(
                `${TAG} deleteByIds → error`,
                { count: ids.length },
                error,
            );
            throw error;
        }
    }

    async restoreById(id: string): Promise<void> {
        try {
            await db
                .update(activity)
                .set({
                    status: "active",
                    deletedAt: null,
                    updatedAt: new Date(),
                })
                .where(
                    and(eq(activity.id, id), eq(activity.status, "deleted")),
                );
            logger.log(`${TAG} restoreById → success`, `id=${id}`);
        } catch (error) {
            logger.error(`${TAG} restoreById → error`, { id }, error);
            throw error;
        }
    }

    async restoreByIds(ids: string[]): Promise<void> {
        if (ids.length === 0) return;
        try {
            await db
                .update(activity)
                .set({
                    status: "active",
                    deletedAt: null,
                    updatedAt: new Date(),
                })
                .where(
                    and(
                        inArray(activity.id, ids),
                        eq(activity.status, "deleted"),
                    ),
                );
            logger.log(`${TAG} restoreByIds → success`, `count=${ids.length}`);
        } catch (error) {
            logger.error(
                `${TAG} restoreByIds → error`,
                { count: ids.length },
                error,
            );
            throw error;
        }
    }

    async permanentDeleteById(id: string): Promise<void> {
        try {
            await db
                .delete(activity)
                .where(
                    and(eq(activity.id, id), eq(activity.status, "deleted")),
                );
            logger.log(`${TAG} permanentDeleteById → success`, `id=${id}`);
        } catch (error) {
            logger.error(`${TAG} permanentDeleteById → error`, { id }, error);
            throw error;
        }
    }

    async permanentDeleteByIds(ids: string[]): Promise<void> {
        if (ids.length === 0) return;
        try {
            await db
                .delete(activity)
                .where(
                    and(
                        inArray(activity.id, ids),
                        eq(activity.status, "deleted"),
                    ),
                );
            logger.log(
                `${TAG} permanentDeleteByIds → success`,
                `count=${ids.length}`,
            );
        } catch (error) {
            logger.error(
                `${TAG} permanentDeleteByIds → error`,
                { count: ids.length },
                error,
            );
            throw error;
        }
    }

    /** Empties the whole trash. */
    async emptyTrash(): Promise<void> {
        try {
            await db.delete(activity).where(eq(activity.status, "deleted"));
            logger.log(`${TAG} emptyTrash → success`);
        } catch (error) {
            logger.error(`${TAG} emptyTrash → error`, error);
            throw error;
        }
    }

    async purgeExpiredDeleted(days = TRASH_RETENTION_DAYS): Promise<void> {
        try {
            const cutoff = subDays(new Date(), days);
            await db.delete(activity).where(
                and(
                    eq(activity.status, "deleted"),
                    or(
                        lte(activity.deletedAt, cutoff),
                        // Rows trashed before deletedAt existed
                        and(
                            isNull(activity.deletedAt),
                            lte(activity.updatedAt, cutoff),
                        ),
                    ),
                ),
            );
            logger.log(`${TAG} purgeExpiredDeleted → success`, `days=${days}`);
        } catch (error) {
            logger.error(`${TAG} purgeExpiredDeleted → error`, { days }, error);
            throw error;
        }
    }

    async reset(): Promise<void> {
        try {
            await db.delete(activity);
            logger.log(`${TAG} reset → success (all activities removed)`);
        } catch (error) {
            logger.error(`${TAG} reset → error`, error);
            throw error;
        }
    }
}

export const activityService = new ActivityService();
