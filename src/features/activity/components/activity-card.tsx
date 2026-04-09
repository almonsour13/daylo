import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { PRIORITY } from "@/shared/constants/constant";
import { Activity } from "@/shared/types/activity";
import { parseRepeat } from "@/shared/utils/activity";
import { getDurationLabel, isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";
import { Text, TouchableOpacity, View } from "react-native";

export default function ActivityCard({ activity }: { activity: Activity }) {
    const duration = getDurationLabel(activity.startTime, activity.endTime);
    const isUpcoming = isUpcomingDate(activity.date);
    const repeat = parseRepeat(activity.repeat);
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const isDisbled = activity.status === 2;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() => router.push(`/${activity.id}`)}
        >
            <View className="relative p-4 bg-white rounded-2xl overflow-hidden">
                <View className="absolute z-0 top-0 bottom-0 left-0 right-0 bg-green-300" />
                {isDisbled && (
                    <View className="absolute z-2 top-0 bottom-0 left-0 right-0 bg-white opacity-75" />
                )}
                <ColumnView className="gap-2">
                    <RowView className="justify-between">
                        <RowView>
                            <RowView className="px-3 h-8 rounded-full justify-center items-center bg-black">
                                <Feather
                                    name="briefcase"
                                    size={12}
                                    color="white"
                                />
                                <Text className="text-sm text-white">Work</Text>
                            </RowView>
                            <RowView className="px-3 h-8 rounded-full justify-center items-center bg-black">
                                <Feather
                                    name={PRIORITY[activity.priority].icon}
                                    size={12}
                                    color="white"
                                />
                                <Text className="text-sm text-white">
                                    {PRIORITY[activity.priority].label}
                                </Text>
                            </RowView>
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
                        <Text className="text-4xl text-nowrap tracking-normal font-normal flex-1">
                            {activity.name}
                        </Text>
                    </RowView>
                    {activity.description && (
                        <Text className="test-sm">{activity.description}</Text>
                    )}
                    <RowView className="justify-between items-center">
                        <RowView className="">
                            {!isUpcoming && (
                                <RowView className="h-8 px-3  rounded-full items-center bg-black">
                                    <Feather
                                        name="calendar"
                                        size={12}
                                        color="white"
                                    />
                                    <Text className="text-sm text-white">
                                        {format(activity.date, "dd MMM")}
                                    </Text>
                                </RowView>
                            )}
                            <RowView className="h-8 px-3  rounded-full items-center bg-black">
                                <Feather name="clock" size={12} color="white" />
                                <Text className="text-sm text-white">
                                    {format(activity.startTime, "p")} -{" "}
                                    {format(activity.endTime, "p")}
                                </Text>
                            </RowView>
                            <RowView className="h-8 px-3  rounded-full items-center bg-black">
                                <Text className="text-sm text-white">
                                    {duration}
                                </Text>
                            </RowView>
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
            </View>
        </TouchableOpacity>
    );
}
