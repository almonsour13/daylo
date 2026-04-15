import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import Card from "@/shared/components/ui/card";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Activity } from "@/shared/types/activity";
import { parseRepeat } from "@/shared/utils/activity";
import { isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "react-native";
import ActivityDetailsDrawer from "./activity-details-drawer";
import Badge from "@/shared/components/ui/badge";
import { CATEGORY, PRIORITY } from "@/shared/constants/constant";
import clsx from "clsx";
import { capitalize } from "@/shared/utils/string";

export default function ActivityCard({ activity }: { activity: Activity }) {
    console.log("Activity:", activity);
    const isUpcoming = isUpcomingDate(activity.date);
    const priority = PRIORITY[activity.priority];
    const category = CATEGORY[activity.category];
    const repeatDays = parseRepeat(activity.repeatDays);
    const repeatType = activity.repeatType;
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const isDisbled = activity.status === "inactive";
    return (
        <ActivityDetailsDrawer activity={activity}>
            <Card>
                <View
                    className={clsx(
                        "absolute z-0 top-0 bottom-0 left-0 right-0",
                        category.bgColor,
                    )}
                />
                {isDisbled && (
                    <View className="absolute z-2 top-0 bottom-0 left-0 right-0 bg-white opacity-75" />
                )}
                <ColumnView className="gap-2 p-4">
                    <RowView className="justify-between items-center">
                        <RowView>
                            {activity.category && (
                                <CategoryBadge category={activity.category} />
                            )}
                            {activity.priority !== "none" && (
                                <PriorityBadge priority={activity.priority} />
                            )}
                        </RowView>
                        <RowView className="items-center">
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
                            <View className="h-8 aspect-square justify-center items-center">
                                <Feather
                                    name="more-vertical"
                                    size={24}
                                    // color="white"
                                />
                            </View>
                        </RowView>
                    </RowView>
                    <RowView className="justify-between items-start">
                        <Text className="text-4xl text-nowrap tracking-normal font-normal flex-1">
                            {activity.name}
                        </Text>
                    </RowView>
                    {activity.description && (
                        <Text className="text-base">
                            {activity.description}
                        </Text>
                    )}
                    <RowView className="justify-between items-center">
                        <RowView className="">
                            {!isUpcoming && <DateBadge date={activity.date} />}
                            <TimeBadge
                                date={activity.date}
                                startTime={activity.startTime}
                                endTime={activity.endTime}
                            />

                            <DurationBadge
                                date={activity.date}
                                startTime={activity.startTime}
                                endTime={activity.endTime}
                            />
                        </RowView>
                    </RowView>
                    <RowView className="rounded-full items-center">
                        <Feather name="repeat" size={16} />
                        {repeatType !== "custom" ? (
                            <Badge>
                                <Text className="text-white text-sm">
                                    {capitalize(repeatType)}
                                </Text>
                            </Badge>
                        ) : (
                            <RowView>
                                {repeatDays.map((day) => {
                                    return (
                                        <View
                                            key={day}
                                            className="h-8 aspect-square rounded-full justify-center items-center bg-black"
                                        >
                                            <Text className="text-sm text-white">
                                                {day.charAt(0)}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </RowView>
                        )}
                    </RowView>
                    {isDisbled && (
                        <RowView className="z-3 justify-between items-center">
                            <Text className="text-sm italic">
                                Activity Currently Disbaled
                            </Text>
                            <View className="px-3 h-8 rounded-full justify-center items-center bg-black">
                                <Text className="text-sm text-white">
                                    Enable
                                </Text>
                            </View>
                        </RowView>
                    )}
                </ColumnView>
            </Card>
        </ActivityDetailsDrawer>
    );
}
