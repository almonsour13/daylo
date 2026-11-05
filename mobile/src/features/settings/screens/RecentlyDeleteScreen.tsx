import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import ActivityEmptyState from "@/shared/components/ActivityEmptyState";
import ActivityListError from "@/shared/components/ActivityListError";
import ActivityListSkeleton from "@/shared/components/ActivityListSkeleton";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { TRASH_RETENTION_DAYS } from "@/shared/constants/trash";
import { activityService } from "@/shared/services/activity.service";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Alert,
    RefreshControl,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Animated, {
    FadeInDown,
    FadeOutUp,
    LinearTransition,
} from "react-native-reanimated";
import RecentlyDeletedList from "../components/RecentlyDeletedList";

const ENTER_DURATION = 200;
const EXIT_DURATION = 100;
const layoutTransition = LinearTransition.duration(200);

export default function RecentlyDeletedScreen() {
    const navigation = useNavigation();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectionMode, setSelectionMode] = useState(false);

    const {
        invalidate,
        restoreActivities,
        permanentDeleteActivities,
        isPending,
    } = useActivityMutations();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["activities", { status: "deleted" }],
        queryFn: () => activityService.get({ status: "deleted" }),
        placeholderData: keepPreviousData,
    });

    const activities = useMemo(() => data ?? [], [data]);

    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
    const count = selectedIds.length;
    const allSelected =
        activities.length > 0 && activities.every((a) => selectedSet.has(a.id));
    const hasSelection = count > 0;

    useEffect(() => {
        const ids = new Set(activities.map((a) => a.id));
        setSelectedIds((prev) => {
            const next = prev.filter((id) => ids.has(id));
            return next.length === prev.length ? prev : next;
        });
        if (activities.length === 0) setSelectionMode(false);
    }, [activities]);

    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await invalidate();
        } finally {
            setIsRefreshing(false);
        }
    }, [invalidate]);

    const enterSelectionMode = () => setSelectionMode(true);

    const exitSelectionMode = useCallback(() => {
        setSelectionMode(false);
        setSelectedIds([]);
    }, []);

    const handleSelect = useCallback((id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    }, []);

    const toggleSelectAll = () =>
        setSelectedIds(allSelected ? [] : activities.map((a) => a.id));

    const handleRestore = async () => {
        if (!hasSelection || isPending) return;
        try {
            await restoreActivities(selectedIds);
            exitSelectionMode();
        } catch {
            // toast shown by the mutation's onError
        }
    };

    const handleDeleteForever = () => {
        if (!hasSelection || isPending) return;
        const ids = selectedIds;
        Alert.alert(
            "Delete permanently?",
            ids.length === 1
                ? "This activity will be gone forever."
                : `These ${ids.length} activities will be gone forever.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await permanentDeleteActivities(ids);
                            exitSelectionMode();
                        } catch {
                            // toast shown by the mutation's onError
                        }
                    },
                },
            ],
        );
    };

    const renderContent = () => {
        if (isLoading) return <ActivityListSkeleton />;
        if (error) return <ActivityListError onRetry={refetch} />;
        if (activities.length === 0) {
            return (
                <ActivityEmptyState
                    icon="trash-2"
                    title="Trash is empty"
                    description="Deleted activities will show up here so you can restore them."
                />
            );
        }
        return (
            <RecentlyDeletedList
                isSelectionMode={selectionMode}
                selectedActivities={selectedIds}
                handleSelect={handleSelect}
                activities={activities}
            />
        );
    };

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
            }
        >
            <Animated.View layout={layoutTransition} className="flex-1 gap-4">
                {selectionMode ? (
                    <Animated.View
                        key="selection-header"
                        entering={FadeInDown.duration(ENTER_DURATION).delay(
                            EXIT_DURATION,
                        )}
                        exiting={FadeOutUp.duration(EXIT_DURATION)}
                    >
                        <RowView className="p-4 pb-0 justify-between items-center">
                            <RowView className="gap-2 items-center">
                                <TouchableOpacity
                                    onPress={exitSelectionMode}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel="Cancel selection"
                                >
                                    <Feather
                                        name="x"
                                        size={28}
                                        className="text-foreground"
                                    />
                                </TouchableOpacity>
                                <Text className="text-xl">{count}</Text>
                            </RowView>
                            <RowView className="gap-6 items-center">
                                <TouchableOpacity
                                    onPress={toggleSelectAll}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        allSelected
                                            ? "Unselect all"
                                            : "Select all"
                                    }
                                >
                                    <Feather
                                        name={
                                            allSelected
                                                ? "check-square"
                                                : "square"
                                        }
                                        size={24}
                                        className="text-foreground"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleRestore}
                                    disabled={!hasSelection || isPending}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel="Restore selected activities"
                                    accessibilityState={{
                                        disabled: !hasSelection || isPending,
                                    }}
                                >
                                    <Feather
                                        name="rotate-ccw"
                                        size={24}
                                        className={
                                            hasSelection
                                                ? "text-foreground"
                                                : "text-foreground opacity-40"
                                        }
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleDeleteForever}
                                    disabled={!hasSelection || isPending}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel="Delete selected activities permanently"
                                    accessibilityState={{
                                        disabled: !hasSelection || isPending,
                                    }}
                                >
                                    <Feather
                                        name="trash-2"
                                        size={24}
                                        className={
                                            hasSelection
                                                ? "text-destructive"
                                                : "text-foreground opacity-40"
                                        }
                                    />
                                </TouchableOpacity>
                            </RowView>
                        </RowView>
                    </Animated.View>
                ) : (
                    <Animated.View
                        key="default-header"
                        entering={FadeInDown.duration(ENTER_DURATION).delay(
                            EXIT_DURATION,
                        )}
                        exiting={FadeOutUp.duration(EXIT_DURATION)}
                        className="gap-2"
                    >
                        <RowView className="p-4 pb-0 justify-between items-center">
                            <RowView className="gap-2 items-center">
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel="Go back"
                                >
                                    <Icon
                                        name="arrow-back"
                                        size={24}
                                        className="text-foreground"
                                    />
                                </TouchableOpacity>
                                <Text className="text-xl">
                                    Recently Deleted
                                </Text>
                            </RowView>
                            {activities.length > 0 && (
                                <TouchableOpacity
                                    onPress={enterSelectionMode}
                                    hitSlop={12}
                                    accessibilityRole="button"
                                    accessibilityLabel="Select activities"
                                >
                                    <Text className="text-xl text-primary">
                                        Select
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </RowView>
                    </Animated.View>
                )}
                <Text className="px-4 text-muted-foreground text-xs">
                    Activities in Recently Deleted are kept for{" "}
                    {TRASH_RETENTION_DAYS} days before being permanently
                    deleted.
                </Text>
                <ColView className="px-4 gap-1">{renderContent()}</ColView>
            </Animated.View>
        </ScrollView>
    );
}
