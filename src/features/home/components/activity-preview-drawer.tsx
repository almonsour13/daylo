import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { PRIORITY } from "@/shared/constants/constant";
import { Activity } from "@/shared/types/activity";
import { isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    activity: Activity;
    onClose: () => void;
}
export default function ActivityPreviewDrawer({ activity, onClose }: Props) {
    const router = useRouter();
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const priority = PRIORITY[activity.priority];
    const isUpcoming = isUpcomingDate(activity.date);
    const handleDirectToActivityDetailsScreen = () => {
        onClose();
        router.push(`/${activity.id}`);
    };
    return (
        <>
            <View
                className={clsx(
                    "absolute z-0 top-0 bottom-0 left-0 right-0",
                    priority.color,
                )}
            />
            <View className="p-4">
                <ColumnView className="gap-4">
                    <RowView className="justify-between">
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
                            <TouchableOpacity
                                className="h-8 aspect-square justify-center items-center"
                                onPress={handleDirectToActivityDetailsScreen}
                            >
                                <Feather
                                    name="maximize-2"
                                    size={24}
                                    // color="white"
                                />
                            </TouchableOpacity>
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
                    <RowView className="justify-between items-center">
                        <TouchableOpacity className="h-16 rounded-full flex-1 justify-center items-center bg-white">
                            <Text className="text-base text-black">Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="h-16 rounded-full flex-1 justify-center items-center bg-black">
                            <Text className="text-base text-white">Done</Text>
                        </TouchableOpacity>
                    </RowView>
                </ColumnView>
            </View>
        </>
    );
}
