import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import { Activity } from "@/shared/types/type";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useMemo } from "react";
import { Alert, BackHandler } from "react-native";
import { useSelectedActivitiesStore } from "../store/use-selected-activities.store";

export function useActivitySelection(
    activities: Activity[],
    isLoading: boolean,
) {
    const { deleteActivities, isDeleting } = useActivityMutations();

    const selected = useSelectedActivitiesStore((s) => s.selectedActivities);
    const isSelectionMode = useSelectedActivitiesStore((s) => s.selectionMode);
    const prune = useSelectedActivitiesStore((s) => s.prune);
    const clear = useSelectedActivitiesStore((s) => s.clear);
    const selectAll = useSelectedActivitiesStore((s) => s.selectAll);
    const deselectAll = useSelectedActivitiesStore((s) => s.deselectAll);
    const setSelectionMode = useSelectedActivitiesStore(
        (s) => s.setSelectionMode,
    );

    const selectedSet = useMemo(() => new Set(selected), [selected]);

    const allSelected =
        activities.length > 0 && activities.every((a) => selectedSet.has(a.id));
    const canEdit = selected.length === 1;
    const canDelete = selected.length > 0 && !isDeleting;

    useEffect(() => {
        if (isLoading) return;
        prune(activities.map((a) => a.id));
    }, [activities, isLoading, prune]);

    useFocusEffect(useCallback(() => () => clear(), [clear]));

    useFocusEffect(
        useCallback(() => {
            if (!isSelectionMode) return;

            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    clear();
                    return true;
                },
            );

            return () => subscription.remove();
        }, [isSelectionMode, clear]),
    );

    const toggleSelectAll = useCallback(() => {
        if (allSelected) deselectAll();
        else selectAll(activities.map((a) => a.id));
    }, [allSelected, activities, selectAll, deselectAll]);

    const deleteSelected = useCallback(() => {
        if (!canDelete) return;

        const ids = [...selected];
        const count = ids.length;

        Alert.alert(
            `Delete ${count} ${count === 1 ? "activity" : "activities"}?`,
            "This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteActivities(ids);
                            clear();
                        } catch {
                            return;
                        }
                    },
                },
            ],
        );
    }, [canDelete, selected, deleteActivities, clear]);

    return {
        isSelectionMode,
        selectedCount: selected.length,
        editId: selected[0],
        allSelected,
        canEdit,
        canDelete,
        enterSelectionMode: () => setSelectionMode(true),
        exitSelectionMode: clear,
        toggleSelectAll,
        deleteSelected,
    };
}
