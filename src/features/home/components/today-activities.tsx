import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { PRIORITY } from "@/shared/constants/constant";
import { activitiesData } from "@/shared/constants/data";
import { getDurationLabel, isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { Text, View } from "react-native";

export default function TodayActivities() {
    const todayActivities = activitiesData();

    return (
        <ColumnView className="px-4">
            <RowView>
                <Text className="text-base font-semibold tracking-wide">
                    Today Activities
                </Text>
            </RowView>
            <ColumnView>
                {todayActivities.map((activity, i) => {
                    const isNotificationEnabled =
                        activity.notificationEnabled === 1;
                    const priority = PRIORITY[activity.priority];
                    const duration = getDurationLabel(
                        activity.startTime,
                        activity.endTime,
                    );
                    const isUpcoming = isUpcomingDate(activity.date);
                    return (
                        <ColumnView
                            key={i}
                            className={clsx(
                                "relative p-4 rounded-2xl overflow-hidden bg-white",
                            )}
                        >
                            <View
                                className={clsx(
                                    "absolute z-0 top-0 bottom-0 left-0 right-0",
                                    priority.color,
                                )}
                            />
                            <RowView className="justify-between">
                                <RowView>
                                    <CategoryBadge />
                                    {activity.priority !== 0 && (
                                        <PriorityBadge
                                            priority={activity.priority}
                                        />
                                    )}
                                </RowView>
                                <RowView>
                                    <View className="h-8 aspect-square rounded-full justify-center items-center bg-black">
                                        <Feather
                                            name={
                                                isNotificationEnabled
                                                    ? "bell"
                                                    : "bell-off"
                                            }
                                            size={12}
                                            color="white"
                                        />
                                    </View>
                                </RowView>
                            </RowView>
                            <RowView className="justify-between items-start">
                                <Text className="text-2xl text-nowrap tracking-normal font-normal flex-1">
                                    {activity.name}
                                </Text>
                            </RowView>
                            {activity.description && (
                                <Text className="text-base line-clamp-1">
                                    {activity.description}
                                </Text>
                            )}
                            <RowView className="justify-between items-center">
                                <RowView className="">
                                    {!isUpcoming && (
                                        <DateBadge date={activity.date} />
                                    )}
                                    <TimeBadge
                                        startTime={activity.startTime}
                                        endTime={activity.endTime}
                                    />

                                    <DurationBadge
                                        startTime={activity.startTime}
                                        endTime={activity.endTime}
                                    />
                                </RowView>
                            </RowView>
                        </ColumnView>
                    );
                })}
            </ColumnView>
        </ColumnView>
    );
}
