import MoveToTrashDrawer from "@/shared/components/drawer/move-to-trash-drawer";
import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import Badge from "@/shared/components/ui/badge";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import {
    ACTIVITY_REAPEAT_DAYS,
    CATEGORY,
    PRIORITY,
} from "@/shared/constants/constant";
import { Activity } from "@/shared/types/activity";
import { parseRepeat } from "@/shared/utils/activity";
import { capitalize } from "@/shared/utils/string";
import { isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    activity: Activity;
    children?: React.ReactNode;
}
export default function ActivityDetailsDrawer({ activity, children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const moveToTrashDrawerRef = useRef<DrawerHandle>(null);
    const router = useRouter();
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const priority = PRIORITY[activity.priority];
    const category = CATEGORY[activity.category];
    const repeatType = activity.repeatType;
    const repeatDays = parseRepeat(activity.repeatDays);
    const isUpcoming = isUpcomingDate(activity.date);
    const isDisbled = activity.status === "inactive";
    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View
                className={clsx(
                    "absolute z-0 top-0 bottom-0 left-0 right-0",
                    category.bgColor,
                )}
            />
            {isDisbled && (
                <RowView className="relative py-2 justify-between items-center px-4">
                    <View className="absolute top-0 bottom-0 left-0 right-0 flex-1 bg-black opacity-5" />
                    <Text className="text-sm italic">
                        Activity Currently Disbaled
                    </Text>
                    <View className="px-3 h-8 rounded-full justify-center items-center bg-black">
                        <Text className="text-sm text-white">Enable</Text>
                    </View>
                </RowView>
            )}
            <View className="p-4">
                <ColumnView className="gap-4">
                    <RowView className="justify-between">
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
                    <RowView className="justify-between items-center gap-2">
                        <TouchableOpacity
                            className="flex-1 h-16 rounded-full justify-center items-center bg-white"
                            onPress={() => {
                                (router.push(`/activity/edit/${activity.id}`),
                                    drawerRef.current?.close());
                            }}
                        >
                            <Text className="text-base text-black">Edit</Text>
                        </TouchableOpacity>
                        <View className="flex-1">
                            <Drawer
                                ref={moveToTrashDrawerRef}
                                triggerButton={
                                    <View className="h-16 rounded-full justify-center items-center bg-red-500">
                                        <Text className="text-base text-white">
                                            Move to trash
                                        </Text>
                                    </View>
                                }
                            >
                                <MoveToTrashDrawer
                                    activity={activity}
                                    onClose={() =>
                                        moveToTrashDrawerRef.current?.close()
                                    }
                                    onSuccess={() => drawerRef.current?.close()}
                                />
                            </Drawer>
                        </View>
                    </RowView>
                </ColumnView>
            </View>
        </Drawer>
    );
}
