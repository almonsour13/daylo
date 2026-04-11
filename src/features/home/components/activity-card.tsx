import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import PriorityBadge from "@/shared/components/ui/activity-card/priority-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import Card from "@/shared/components/ui/card";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { PRIORITY } from "@/shared/constants/constant";
import { Activity } from "@/shared/types/activity";
import { isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ActivityPreviewDrawer from "./activity-preview-drawer";

interface Props {
    activity: Activity;
}
export default function ActivityCard({ activity }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const isNotificationEnabled = activity.notificationEnabled === 1;
    const priority = PRIORITY[activity.priority];
    const isUpcoming = isUpcomingDate(activity.date);

    return (
        <Drawer
            ref={drawerRef}
            triggerButton={
                <Card>
                    <View
                        className={clsx(
                            "absolute z-0 top-0 bottom-0 left-0 right-0 ",
                            priority.color,
                        )}
                    />
                    <ColumnView className={clsx("relative p-4")}>
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
                            <Text className="text-3xl text-nowrap tracking-normal font-normal">
                                {activity.name}
                            </Text>
                        </RowView>
                        {activity.description && (
                            <Text className="text-base line-clamp-2">
                                {activity.description}
                            </Text>
                        )}
                        <RowView className="justify-between items-center">
                            <RowView className="">
                                {!isUpcoming && (
                                    <DateBadge date={activity.date} />
                                )}
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
                            <TouchableOpacity className="h-12 rounded-full flex-1 justify-center items-center bg-white">
                                <Text className="text-base text-black">
                                    Skip
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="h-12 rounded-full flex-1 justify-center items-center bg-black">
                                <Text className="text-base text-white">
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </RowView>
                    </ColumnView>
                </Card>
            }
        >
            <ActivityPreviewDrawer
                onClose={() => drawerRef.current?.close()} // ✅ now works
                activity={activity}
            />
        </Drawer>
    );
}
