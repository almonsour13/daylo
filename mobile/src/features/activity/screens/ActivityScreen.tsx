import ActivityEmptyState from "@/shared/components/ActivityEmptyState";
import ActivityListSkeleton from "@/shared/components/ActivityListSkeleton";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { NavigationProp } from "@/shared/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    RefreshControl,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOut,
    FadeOutUp,
    LinearTransition,
} from "react-native-reanimated";
import ActivityListError from "../../../shared/components/ActivityListError";
import {
    ActivityFilterPanel,
    ActivityFilterToggle,
} from "../components/list/ActivityFilters";
import ActivityList from "../components/list/ActivityList";
import ActivitySearchBar from "../components/list/ActivitySearchBar";
import ActivitySelectionHeader from "../components/list/ActivitySelectionHeader";
import { useActivityList } from "../hooks/use-activity-list";
import { useActivitySelection } from "../hooks/use-activity-selection";

const ENTER_DURATION = 200;
const EXIT_DURATION = 100;
const layoutTransition = LinearTransition.duration(200);

export default function ActivityScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [showFilters, setShowFilters] = useState(false);

    const {
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
    } = useActivityList();

    const {
        isSelectionMode,
        selectedCount,
        editId,
        allSelected,
        canEdit,
        canDelete,
        enterSelectionMode,
        exitSelectionMode,
        toggleSelectAll,
        deleteSelected,
    } = useActivitySelection(activities, isLoading);

    const isFiltering = !!searchValue || activeFilterCount > 0;

    const renderContent = () => {
        if (isLoading) return <ActivityListSkeleton />;
        if (error) return <ActivityListError onRetry={refetch} />;
        if (activities.length === 0) {
            return (
                <ActivityEmptyState
                    icon={isFiltering ? "search" : "calendar"}
                    title={
                        isFiltering ? "No results found" : "No activities yet"
                    }
                    description={
                        activeFilterCount > 0
                            ? "Nothing matches your filters. Try changing or clearing them."
                            : searchValue
                              ? `Nothing matches "${searchValue}". Try a different keyword.`
                              : "Create your first activity and start building your routine."
                    }
                />
            );
        }
        return <ActivityList activities={activities} />;
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
            <Animated.View layout={layoutTransition} className="pb-54 gap-4">
                {isSelectionMode ? (
                    <Animated.View
                        key="selection-header"
                        entering={FadeInDown.duration(ENTER_DURATION).delay(
                            EXIT_DURATION,
                        )}
                        exiting={FadeOutUp.duration(EXIT_DURATION)}
                    >
                        <ActivitySelectionHeader
                            count={selectedCount}
                            allSelected={allSelected}
                            canEdit={canEdit}
                            canDelete={canDelete}
                            onClose={exitSelectionMode}
                            onEdit={() =>
                                navigation.navigate("ActivityFormScreen", {
                                    activityId: editId,
                                })
                            }
                            onToggleAll={toggleSelectAll}
                            onDelete={deleteSelected}
                        />
                    </Animated.View>
                ) : (
                    <Animated.View
                        key="default-header"
                        entering={FadeInDown.duration(ENTER_DURATION).delay(
                            EXIT_DURATION,
                        )}
                        exiting={FadeOutUp.duration(EXIT_DURATION)}
                        className="p-4 pb-0"
                    >
                        <Text className="text-xl text-muted-foreground">
                            Activities
                        </Text>
                        <Text className="capitalize text-2xl text-foreground">
                            manage your activities.
                        </Text>
                    </Animated.View>
                )}

                <Animated.View layout={layoutTransition} className="gap-2">
                    {!isSelectionMode && (
                        <Animated.View
                            key="search-block"
                            entering={FadeIn.duration(ENTER_DURATION).delay(
                                EXIT_DURATION,
                            )}
                            exiting={FadeOut.duration(EXIT_DURATION)}
                            className="gap-2"
                        >
                            <RowView className="px-4 items-center gap-2">
                                <View className="flex-1">
                                    <ActivitySearchBar
                                        value={search}
                                        onChange={setSearch}
                                    />
                                </View>
                                <ActivityFilterToggle
                                    open={showFilters}
                                    count={activeFilterCount}
                                    onPress={() => setShowFilters((v) => !v)}
                                />
                            </RowView>

                            <ActivityFilterPanel
                                open={showFilters}
                                filters={filters}
                                onChange={updateFilter}
                                onReset={resetFilters}
                                activeCount={activeFilterCount}
                            />
                            <RowView className="px-4 justify-between items-end">
                                <Text className="text-base">
                                    {`${activities.length} ${
                                        activities.length === 1
                                            ? "Activity"
                                            : "Activities"
                                    }`}
                                </Text>
                                {activities.length > 0 && (
                                    <TouchableOpacity
                                        onPress={enterSelectionMode}
                                        hitSlop={12}
                                        accessibilityRole="button"
                                        accessibilityLabel="Select activities"
                                    >
                                        <Text className="text-base text-primary">
                                            Select
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </RowView>
                        </Animated.View>
                    )}

                    <ColView className="px-4 gap-1">{renderContent()}</ColView>
                </Animated.View>
            </Animated.View>
        </ScrollView>
    );
}
