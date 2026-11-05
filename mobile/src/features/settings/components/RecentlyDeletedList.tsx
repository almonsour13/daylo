import ActivityActionDrawer, {
    ActivityActionDrawerHandle,
} from "@/features/activity/components/drawer/ActivityActionDrawer";
import SelectionCheck from "@/shared/components/SelectionCheck";
import { Card, CardTitle } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { Activity } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { format } from "date-fns";
import { useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native";

export default function RecentlyDeletedList({
    isSelectionMode,
    selectedActivities,
    activities,
    handleSelect,
}: {
    isSelectionMode: boolean;
    selectedActivities: string[];
    activities: Activity[];
    handleSelect: (id: string) => void;
}) {
    const activityActionDrawerRef = useRef<ActivityActionDrawerHandle>(null);

    const selectedSet = useMemo(
        () => new Set(selectedActivities),
        [selectedActivities],
    );

    if (activities.length === 0) return null;

    return (
        <>
            {activities.map((activity) => {
                const { id, name, description, deletedAt } = activity;
                const isSelected = selectedSet.has(id);

                return (
                    <TouchableOpacity
                        key={id}
                        accessibilityRole="button"
                        accessibilityLabel={name}
                        accessibilityHint={
                            isSelectionMode
                                ? "Double tap to toggle selection"
                                : "Double tap to open. Long press to select."
                        }
                        accessibilityState={{ selected: isSelected }}
                        onPress={() => {
                            if (isSelectionMode) {
                                handleSelect(id);
                            } else {
                                activityActionDrawerRef.current?.openWithActivityId(
                                    id,
                                );
                            }
                        }}
                        onLongPress={() => handleSelect(id)}
                        className="w-full flex flex-row items-start"
                    >
                        <SelectionCheck
                            visible={isSelectionMode}
                            selected={isSelected}
                        />

                        <Card
                            className={cn(
                                "flex-1",
                                isSelected && "border-primary bg-primary/5",
                            )}
                        >
                            <ColView>
                                <RowView className="items-center justify-between gap-2">
                                    <CardTitle
                                        className="flex-1"
                                        numberOfLines={1}
                                    >
                                        {name}
                                    </CardTitle>
                                </RowView>
                                {!!description && (
                                    <Text
                                        className="text-sm text-muted-foreground"
                                        numberOfLines={2}
                                    >
                                        {description}
                                    </Text>
                                )}
                                {deletedAt && (
                                    <Text className="text-muted-foreground text-xs">
                                        Deleted at{" "}
                                        {format(
                                            new Date(deletedAt),
                                            "MMM dd, yyyy p",
                                        )}
                                    </Text>
                                )}
                            </ColView>
                        </Card>
                    </TouchableOpacity>
                );
            })}
            <ActivityActionDrawer
                ref={activityActionDrawerRef}
                variant="trash"
            />
        </>
    );
}
