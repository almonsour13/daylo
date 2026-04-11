import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import Card from "@/shared/components/ui/card";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { PRIORITY } from "@/shared/constants/constant";
import { Activity } from "@/shared/types/activity";
import { parseRepeat } from "@/shared/utils/activity";
import { isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ActivityCard({ activity }: { activity: Activity }) {
    const router = useRouter();
    const isUpcoming = isUpcomingDate(activity.date);
    const repeat = parseRepeat(activity.repeat);
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const isDisbled = activity.status === 2;
    const priority = PRIORITY[activity.priority];
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.push(`/${activity.id}`)}
        >
            <Card>
                <View
                    className={clsx(
                        "absolute z-0 top-0 bottom-0 left-0 right-0",
                        priority.color,
                    )}
                />
                {isDisbled && (
                    <View className="absolute z-2 top-0 bottom-0 left-0 right-0 bg-white opacity-75" />
                )}
                <ColumnView className="gap-2 p-4">
                    <RowView className="justify-between items-center">
                        <RowView>
                            <CategoryBadge />
                            {activity.priority !== 0 && (
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
                    {repeat && (
                        <RowView className="rounded-full items-center">
                            <Feather name="repeat" size={16} />
                            <RowView>
                                {repeat.map((day) => {
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
                        </RowView>
                    )}
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
        </TouchableOpacity>
    );
}
