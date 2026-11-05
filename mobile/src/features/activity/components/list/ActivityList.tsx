import Badge from "@/shared/components/ui/Badge";
import { Card, CardTitle } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { getActivityItem } from "@/shared/helper/activity-item";
import { Activity } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import { format, parseISO } from "date-fns";
import { useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native";
import SelectionCheck from "../../../../shared/components/SelectionCheck";
import { useSelectedActivitiesStore } from "../../store/use-selected-activities.store";
import ActivityActionDrawer, {
    ActivityActionDrawerHandle,
} from "../drawer/ActivityActionDrawer";

export default function ActivityList({
    activities,
}: {
    activities: Activity[];
}) {
    const now = useMemo(() => new Date(), []);
    const activityActionDrawerRef = useRef<ActivityActionDrawerHandle>(null);

    const selectedActivities = useSelectedActivitiesStore(
        (s) => s.selectedActivities,
    );
    const isSelectionMode = useSelectedActivitiesStore((s) => s.selectionMode);
    const handleSelect = useSelectedActivitiesStore((s) => s.toggle);

    const selectedSet = useMemo(
        () => new Set(selectedActivities),
        [selectedActivities],
    );

    if (activities.length === 0) return null;

    return (
        <>
            {activities.map((activity) => {
                const {
                    id,
                    name,
                    description,
                    date,
                    status,
                    repeatType,
                    notificationEnabled,
                    createdAt,
                    updatedAt,
                } = activity;
                const { priority, category, timeRange, duration, repeatLabel } =
                    getActivityItem(activity, now);
                const isActive = status === "active";
                const dateLabel = format(parseISO(date), "dd MMM, yyyy");
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
                                !isActive && "opacity-60",
                                isSelected && "border-primary bg-primary/5",
                            )}
                        >
                            <ColView>
                                <RowView className="items-center justify-between gap-2">
                                    <CardTitle className="flex-1">
                                        {name}
                                    </CardTitle>
                                    <Feather
                                        name={
                                            notificationEnabled
                                                ? "bell"
                                                : "bell-off"
                                        }
                                        size={16}
                                        className="text-muted-foreground"
                                    />
                                </RowView>
                                <RowView className="items-center gap-1">
                                    <Feather
                                        name="clock"
                                        size={12}
                                        className="text-muted-foreground"
                                    />
                                    <Text className="flex-1 text-sm text-muted-foreground">
                                        {repeatType === "once"
                                            ? dateLabel
                                            : `Since ${dateLabel}`}
                                        , {timeRange} · {duration}
                                    </Text>
                                </RowView>
                                {!!description && (
                                    <Text
                                        className="text-sm text-muted-foreground"
                                        numberOfLines={2}
                                    >
                                        {description}
                                    </Text>
                                )}
                                <RowView className="items-start justify-between">
                                    <RowView className="flex-1 flex-wrap items-center gap-1">
                                        <Badge>
                                            <Feather
                                                name="repeat"
                                                size={12}
                                                className="text-foreground"
                                            />
                                            {"  "}
                                            {repeatLabel}
                                        </Badge>
                                        {priority && (
                                            <Badge
                                                textClassName={
                                                    priority.textColor
                                                }
                                            >
                                                {priority.label}
                                            </Badge>
                                        )}
                                        {category && (
                                            <Badge
                                                textClassName={
                                                    category.textColor
                                                }
                                            >
                                                {category.label}
                                            </Badge>
                                        )}
                                    </RowView>
                                    <Badge
                                        textClassName={
                                            isActive
                                                ? "text-success"
                                                : "text-destructive"
                                        }
                                    >
                                        {status}
                                    </Badge>
                                </RowView>
                                {new Date(updatedAt).getTime() !==
                                    new Date(createdAt).getTime() && (
                                    <Text className="text-muted-foreground text-xs">
                                        Last Updated at{" "}
                                        {format(
                                            new Date(updatedAt),
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
                hide_action={["view details"]}
            />
        </>
    );
}
