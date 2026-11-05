import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import { useDebounce } from "@/features/activity/hooks/use-debounce";
import { activityService } from "@/shared/services/activity.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { useCallback, useMemo, useState } from "react";

export type ActivityFilters = {
    status: "all" | "active" | "inactive";
    category: string; // "all" or a CATEGORY label
    priority: string; // "all" or a PRIORITY label
};

export const DEFAULT_FILTERS: ActivityFilters = {
    status: "all",
    category: "all",
    priority: "all",
};

export function useActivityList() {
    const [search, setSearch] = useState("");
    const searchValue = useDebounce(search);
    const [filters, setFilters] = useState<ActivityFilters>(DEFAULT_FILTERS);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { invalidate } = useActivityMutations();

    const { data, isLoading, error, refetch } = useQuery({
        // Starts with "activities", so invalidateActivityData still refreshes it
        queryKey: ["activities", searchValue, filters],
        queryFn: () =>
            activityService.get({
                query: searchValue,
                status: filters.status,
                category: filters.category,
                priority: filters.priority,
            }),
        placeholderData: keepPreviousData,
    });

    const activities = useMemo(
        () =>
            [...(data ?? [])].sort(
                (a, b) =>
                    parseISO(b.date).getTime() - parseISO(a.date).getTime() ||
                    a.startTime.localeCompare(b.startTime),
            ),
        [data],
    );

    const updateFilter = useCallback(
        <K extends keyof ActivityFilters>(key: K, value: ActivityFilters[K]) =>
            setFilters((prev) => ({ ...prev, [key]: value })),
        [],
    );

    const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

    const activeFilterCount = useMemo(
        () =>
            (Object.keys(DEFAULT_FILTERS) as (keyof ActivityFilters)[]).filter(
                (k) => filters[k] !== DEFAULT_FILTERS[k],
            ).length,
        [filters],
    );

    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await invalidate();
        } finally {
            setIsRefreshing(false);
        }
    }, [invalidate]);

    return {
        search,
        setSearch,
        searchValue,
        filters,
        updateFilter,
        resetFilters,
        activeFilterCount,
        activities,
        isLoading,
        error,
        refetch,
        isRefreshing,
        refresh,
    };
}
