import { activityService } from "@/shared/services/activity.service";
import {
    notificationService,
    ScheduleResult,
} from "@/shared/services/notification.service";
import { Activity } from "@/shared/types/type";
import { toast } from "@/shared/utils/toast";
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

const ACTIVITY_DATA_KEYS = [
    ["activities"],
    ["activity"],
    ["home-screen"],
    ["calendar"],
] as const;

export function invalidateActivityData(queryClient: QueryClient) {
    return Promise.all(
        ACTIVITY_DATA_KEYS.map((queryKey) =>
            queryClient.invalidateQueries({ queryKey, refetchType: "all" }),
        ),
    );
}

/** Tells the user when they asked for a reminder that can't fire. */
const reportSchedule = (activity: Activity, result: ScheduleResult) => {
    if (!activity.notificationEnabled || activity.status !== "active") return;

    switch (result) {
        case "reminders-off":
            toast.error("Reminders are turned off in Settings.");
            break;
        case "no-permission":
            toast.error(
                "Notifications are blocked. Allow them in your phone's settings.",
            );
            break;
        case "error":
            toast.error("Saved, but the reminder couldn't be scheduled.");
            break;
    }
};

/** Cancel + schedule for one activity. Never throws. */
const syncOne = async (activity: Activity, report = true) => {
    const result =
        await notificationService.syncScheduleActivityNotification(activity);
    if (report) reportSchedule(activity, result);
};

export const useActivityMutations = () => {
    const queryClient = useQueryClient();

    const invalidate = () => invalidateActivityData(queryClient);

    const onError = (message: string) => (error: unknown) => {
        console.error("[useActivityMutations]", error);
        toast.error(message);
    };

    const createMutation = useMutation({
        mutationFn: (data: Activity) => activityService.create(data),
        onSuccess: async (_result, data) => {
            void syncOne(data);
            toast.success("Activity created");
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't create activity"),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Activity> }) => {
            const {
                id: _id,
                createdAt: _createdAt,
                updatedAt: _updatedAt,
                deletedAt: _deletedAt,
                ...rest
            } = data;
            return activityService.updateById(id, rest);
        },
        onSuccess: async (_result, { id }) => {
            // Re-read the saved row so the sync sees the full activity.
            // A switch turned off, a status change or a new time/repeat all
            // flow through the same cancel + schedule.
            void activityService
                .getById(id)
                .then((saved) => (saved ? syncOne(saved) : undefined))
                .catch((e) => console.error("[useActivityMutations]", e));
            toast.success("Activity updated");
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't update activity"),
    });

    // Soft delete (moves to trash)
    const deleteMutation = useMutation({
        mutationFn: (id: string) => activityService.deleteById(id),
        onSuccess: async (_result, id) => {
            queryClient.removeQueries({ queryKey: ["activity", id] });
            void notificationService.cancelActivityNotifications([id]);
            toast.success("Activity deleted");
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't delete activity"),
    });

    const deleteManyMutation = useMutation({
        mutationFn: (ids: string[]) => activityService.deleteByIds(ids),
        onSuccess: async (_result, ids) => {
            ids.forEach((id) =>
                queryClient.removeQueries({ queryKey: ["activity", id] }),
            );
            void notificationService.cancelActivityNotifications(ids);
            toast.success(
                ids.length === 1
                    ? "Activity deleted"
                    : `${ids.length} activities deleted`,
            );
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't delete activities"),
    });

    // Restore from trash
    const restoreManyMutation = useMutation({
        mutationFn: (ids: string[]) => activityService.restoreByIds(ids),
        onSuccess: async (_result, ids) => {
            // Only a single restore warns, so bulk restores don't spam toasts
            const report = ids.length === 1;
            void Promise.allSettled(
                ids.map(async (id) => {
                    const restored = await activityService.getById(id);
                    if (restored) await syncOne(restored, report);
                }),
            );
            toast.success(
                ids.length === 1
                    ? "Activity restored"
                    : `${ids.length} activities restored`,
            );
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't restore activities"),
    });

    // Permanent delete (only rows already in trash)
    const permanentDeleteMutation = useMutation({
        mutationFn: (id: string) => activityService.permanentDeleteById(id),
        onSuccess: async (_result, id) => {
            queryClient.removeQueries({ queryKey: ["activity", id] });
            void notificationService.cancelActivityNotifications([id]);
            toast.success("Activity permanently deleted");
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't delete activity"),
    });

    const permanentDeleteManyMutation = useMutation({
        mutationFn: (ids: string[]) =>
            activityService.permanentDeleteByIds(ids),
        onSuccess: async (_result, ids) => {
            ids.forEach((id) =>
                queryClient.removeQueries({ queryKey: ["activity", id] }),
            );
            void notificationService.cancelActivityNotifications(ids);
            toast.success(
                ids.length === 1
                    ? "Activity permanently deleted"
                    : `${ids.length} activities permanently deleted`,
            );
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't delete activities"),
    });

    const emptyTrashMutation = useMutation({
        mutationFn: () => activityService.emptyTrash(),
        onSuccess: async () => {
            toast.success("Trash emptied");
            await invalidateActivityData(queryClient);
        },
        onError: onError("Couldn't empty trash"),
    });

    return {
        invalidate,
        createActivity: createMutation.mutateAsync,
        updateActivity: updateMutation.mutateAsync,
        deleteActivity: deleteMutation.mutateAsync,
        deleteActivities: deleteManyMutation.mutateAsync,
        restoreActivities: restoreManyMutation.mutateAsync,
        permanentDeleteActivity: permanentDeleteMutation.mutateAsync,
        permanentDeleteActivities: permanentDeleteManyMutation.mutateAsync,
        emptyTrash: emptyTrashMutation.mutateAsync,
        isDeleting: deleteManyMutation.isPending || deleteMutation.isPending,
        isPending:
            createMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending ||
            deleteManyMutation.isPending ||
            restoreManyMutation.isPending ||
            permanentDeleteMutation.isPending ||
            permanentDeleteManyMutation.isPending ||
            emptyTrashMutation.isPending,
    };
};
