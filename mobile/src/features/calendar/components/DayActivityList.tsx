import ActivityActionDrawer, {
    ActivityActionDrawerHandle,
} from "@/features/activity/components/drawer/ActivityActionDrawer";
import ActivityEmptyState from "@/shared/components/ActivityEmptyState";
import ActivityListError from "@/shared/components/ActivityListError";
import ActivityListSkeleton from "@/shared/components/ActivityListSkeleton";
import Badge from "@/shared/components/ui/Badge";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { getActivityItem } from "@/shared/helper/activity-item";
import { useNow } from "@/shared/hooks/use-now";
import { activityService } from "@/shared/services/activity.service";
import { NavigationProp } from "@/shared/types/navigation";
import { cn } from "@/shared/utils/cn";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format, isBefore, isToday, startOfDay } from "date-fns";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";

export default function DayActivityList({
    selectedDate,
}: {
    selectedDate: Date;
}) {
    const navigation = useNavigation<NavigationProp>();
    const activityActionDrawerRef = useRef<ActivityActionDrawerHandle>(null);
    const now = useNow();

    const {
        data: activities = [],
        isLoading,
        isPlaceholderData,
        error,
        refetch,
    } = useQuery({
        queryKey: ["calendar", format(selectedDate, "yyyy-MM-dd")],
        queryFn: () => activityService.getByDay(selectedDate),
        placeholderData: keepPreviousData,
    });

    // getByDay already sorts by start time
    const items = activities.map((activity) => ({
        activity,
        ...getActivityItem(activity, now, selectedDate),
    }));

    const isPastDay =
        !isToday(selectedDate) &&
        isBefore(startOfDay(selectedDate), startOfDay(now));

    const emptyState = isToday(selectedDate)
        ? {
              icon: "sun" as const,
              title: "Your day is wide open",
              description:
                  "Add your first activity and give the day some shape.",
          }
        : isPastDay
          ? {
                icon: "calendar" as const,
                title: "Nothing was planned",
                description: "No activities were scheduled for this day.",
            }
          : {
                icon: "calendar" as const,
                title: "A blank slate",
                description: "Plan ahead by adding an activity for this day.",
            };

    return (
        <>
            <ColView className="px-4 gap-2">
                <RowView className="justify-between items-end">
                    <ColView className="gap-0">
                        <Text className="text-lg text-foreground">
                            {isToday(selectedDate) ? "Today, " : ""}
                            {format(selectedDate, "dd MMM")}
                        </Text>
                        <Text className="text-sm text-muted-foreground">
                            {items.length}{" "}
                            {items.length === 1 ? "activity" : "activities"}
                        </Text>
                    </ColView>
                    <TouchableOpacity
                        className={cn("flex", isPastDay && "opacity-50")}
                        onPress={() =>
                            navigation.navigate("ActivityFormScreen", {
                                date: format(selectedDate, "yyyy-MM-dd"),
                            })
                        }
                        disabled={isPastDay}
                    >
                        <Card className="flex-1 p-0 justify-center items-center bg-primary aspect-square  border border-border/50">
                            <ColView>
                                <Ionicons
                                    name="add"
                                    size={24}
                                    className="text-white"
                                />
                            </ColView>
                        </Card>
                    </TouchableOpacity>
                </RowView>

                <ColView
                    className={cn("gap-1", isPlaceholderData && "opacity-50")}
                >
                    {isLoading ? (
                        <ActivityListSkeleton />
                    ) : error ? (
                        <ActivityListError onRetry={refetch} />
                    ) : items.length === 0 ? (
                        <ActivityEmptyState
                            icon={emptyState.icon}
                            title={emptyState.title}
                            description={emptyState.description}
                        />
                    ) : (
                        items.map(
                            ({
                                priority,
                                category,
                                activity,
                                timeRange,
                                duration,
                                relativeTime,
                                repeatLabel,
                                isPast,
                            }) => {
                                const {
                                    id,
                                    name,
                                    description,
                                    notificationEnabled,
                                } = activity;

                                return (
                                    <TouchableOpacity
                                        key={id}
                                        accessibilityRole="button"
                                        accessibilityLabel={name}
                                        onPress={() =>
                                            activityActionDrawerRef.current?.openWithActivityId(
                                                id,
                                            )
                                        }
                                    >
                                        <Card
                                            className={cn(
                                                isPast && "opacity-50",
                                            )}
                                        >
                                            <ColView>
                                                <RowView className="items-center justify-between">
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
                                                <RowView className="items-center justify-between">
                                                    <RowView className="items-center gap-1">
                                                        <Feather
                                                            name="clock"
                                                            size={12}
                                                            className="text-muted-foreground"
                                                        />
                                                        <Text className="text-sm text-muted-foreground">
                                                            {timeRange} ·{" "}
                                                            {duration}
                                                        </Text>
                                                    </RowView>
                                                    {!!relativeTime.label && (
                                                        <Text
                                                            className={cn(
                                                                "text-sm text-muted-foreground",
                                                                relativeTime.className,
                                                            )}
                                                        >
                                                            {relativeTime.label}
                                                        </Text>
                                                    )}
                                                </RowView>
                                                {!!description && (
                                                    <CardDescription
                                                        numberOfLines={2}
                                                    >
                                                        {description}
                                                    </CardDescription>
                                                )}
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
                                                            textClassName={cn(
                                                                priority.textColor,
                                                            )}
                                                        >
                                                            {priority.label}
                                                        </Badge>
                                                    )}
                                                    {category && (
                                                        <Badge
                                                            textClassName={cn(
                                                                category.textColor,
                                                            )}
                                                        >
                                                            {category.label}
                                                        </Badge>
                                                    )}
                                                </RowView>
                                            </ColView>
                                        </Card>
                                    </TouchableOpacity>
                                );
                            },
                        )
                    )}
                </ColView>
            </ColView>

            <ActivityActionDrawer
                ref={activityActionDrawerRef}
                hide_action={["view details"]}
            />
        </>
    );
}
