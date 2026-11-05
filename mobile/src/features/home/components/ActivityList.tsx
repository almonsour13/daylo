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
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { format, startOfDay } from "date-fns";
import { useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native";

export default function ActivityList() {
    const now = useNow();
    const navigation = useNavigation<NavigationProp>();
    const activityActionDrawerRef = useRef<ActivityActionDrawerHandle>(null);

    // Changes at midnight, which triggers a refetch for the new day
    const dayKey = format(now, "yyyy-MM-dd");
    const today = useMemo(() => startOfDay(now), [dayKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        data: activities = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["activities", "home-screen", dayKey],
        queryFn: () => activityService.getByDay(today),
    });

    const items = activities.map((activity) => ({
        activity,
        ...getActivityItem(activity, now),
    }));

    const leftCount = items.filter((i) => !i.isPast).length;

    const hour = now.getHours();
    const isEvening = hour >= 18 || hour < 5;

    return (
        <>
            <ColView className="px-4 flex-1 gap-2">
                <RowView className="justify-between items-end">
                    <Text className="text-base">
                        {items.length}{" "}
                        {items.length === 1 ? "Activity" : "Activities"}
                        {items.length > 0 && ` · ${leftCount} Left`}
                    </Text>

                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel="View all activities"
                        onPress={() =>
                            navigation.navigate("Main", {
                                screen: "ActivityScreen",
                            })
                        }
                        className="hidden"
                    >
                        <Text className="text-base text-primary">View All</Text>
                    </TouchableOpacity>
                </RowView>

                <ColView className="gap-1">
                    {isLoading ? (
                        <ActivityListSkeleton />
                    ) : error ? (
                        <ActivityListError onRetry={refetch} />
                    ) : items.length === 0 ? (
                        <ActivityEmptyState
                            icon={isEvening ? "moon" : "sun"}
                            title={
                                isEvening
                                    ? "Nothing planned today"
                                    : "Your day is wide open"
                            }
                            description={
                                isEvening
                                    ? "Plan ahead and wake up knowing exactly what's next."
                                    : "Add your first activity and give the day some shape."
                            }
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
                                isPast,
                            }) => (
                                <TouchableOpacity
                                    key={activity.id}
                                    accessibilityRole="button"
                                    accessibilityLabel={activity.name}
                                    onPress={() =>
                                        activityActionDrawerRef.current?.openWithActivityId(
                                            activity.id,
                                        )
                                    }
                                >
                                    <Card
                                        className={cn(isPast && "opacity-50")}
                                    >
                                        <ColView>
                                            <RowView className="items-center justify-between">
                                                <CardTitle className="flex-1">
                                                    {activity.name}
                                                </CardTitle>
                                                <Feather
                                                    name={
                                                        activity.notificationEnabled
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
                                                    <Text className="text-sm capitalize text-muted-foreground">
                                                        {timeRange} · {duration}
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
                                            {!!activity.description && (
                                                <CardDescription>
                                                    {activity.description}
                                                </CardDescription>
                                            )}
                                            {(category || priority) && (
                                                <RowView className="flex-1 flex-wrap items-center gap-1">
                                                    {priority && (
                                                        <Badge
                                                            textClassName={cn(
                                                                priority?.textColor,
                                                            )}
                                                        >
                                                            {priority?.label}
                                                        </Badge>
                                                    )}
                                                    {category && (
                                                        <Badge
                                                            textClassName={cn(
                                                                category?.textColor,
                                                            )}
                                                        >
                                                            {category?.label}
                                                        </Badge>
                                                    )}
                                                </RowView>
                                            )}
                                        </ColView>
                                    </Card>
                                </TouchableOpacity>
                            ),
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
