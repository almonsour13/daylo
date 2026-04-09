import ScreenWrapper from "@/shared/components/layout/screen-wrapper";
import CategoryBadge from "@/shared/components/ui/activity-card/category-badge";
import DateBadge from "@/shared/components/ui/activity-card/date-badge";
import DurationBadge from "@/shared/components/ui/activity-card/duration-badge";
import TimeBadge from "@/shared/components/ui/activity-card/time-badge";
import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { PRIORITY, WEEK_DAYS } from "@/shared/constants/constant";
import { parseRepeat } from "@/shared/utils/activity";
import { getDurationLabel, isUpcomingDate } from "@/shared/utils/time";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useActivityDetails } from "./hooks/use-activity-details";

export default function ActivityDetailsScreen() {
    const router = useRouter();
    const { activityDetails, isActivityDetailsLoading, activityDetailsError } =
        useActivityDetails();

    if (isActivityDetailsLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    if (activityDetailsError || !activityDetails) {
        return (
            <View className="flex-1 items-center justify-center p-8">
                <Text className="text-base text-center text-gray-500">
                    {activityDetailsError ?? "Activity not found."}
                </Text>
                <TouchableOpacity
                    className="mt-4"
                    onPress={() => router.back()}
                >
                    <Text className="text-sm text-blue-600">Go back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const priority = PRIORITY[activityDetails.priority ?? 0];

    const duration = getDurationLabel(
        activityDetails.startTime,
        activityDetails.endTime,
    );
    const isUpcoming = isUpcomingDate(activityDetails.date);
    const repeat = parseRepeat(activityDetails.repeat);
    const isDisbled = activityDetails.status === 2;
    const isNotificationEnabled = activityDetails.notificationEnabled === 1;

    return (
        <ScreenWrapper className={priority.color}>
            <ScrollView>
                <ColumnView>
                    <RowView className="p-4 justify-between items-center">
                        <TouchableOpacity
                            className="flex-row gap-2 items-center"
                            onPress={() => router.back()}
                        >
                            <Feather name="arrow-left" size={28} />
                            <Text className="text-base font-semibold">
                                Back
                            </Text>
                        </TouchableOpacity>
                        <RowView>
                            <TouchableOpacity
                                className="aspect-square rounded-full"
                                onPress={() => router.back()}
                            >
                                <Feather name="more-vertical" size={28} />
                            </TouchableOpacity>
                        </RowView>
                    </RowView>
                    {isDisbled && (
                        <RowView className="relative py-2 justify-between items-center px-4">
                            <View className="absolute top-0 bottom-0 left-0 right-0 flex-1 bg-white opacity-25" />
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
                    <ColumnView className="px-4 gap-4">
                        <RowView className="justify-between">
                            <CategoryBadge />
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
                                {activityDetails.name}
                            </Text>
                        </RowView>
                        {activityDetails.description && (
                            <Text className="text-base">
                                {activityDetails.description}
                            </Text>
                        )}
                        <RowView className="justify-between items-center">
                            <RowView className="">
                                {!isUpcoming && (
                                    <DateBadge date={activityDetails.date} />
                                )}
                                <TimeBadge
                                    startTime={activityDetails.startTime}
                                    endTime={activityDetails.endTime}
                                />

                                <DurationBadge
                                    startTime={activityDetails.startTime}
                                    endTime={activityDetails.endTime}
                                />
                            </RowView>
                        </RowView>
                        {repeat.length > 0 && (
                            <RowView className="gap-2">
                                {WEEK_DAYS.map((day, index) => {
                                    const isActive = repeat.includes(day);
                                    return (
                                        <View
                                            key={index}
                                            className={clsx(
                                                "w-12 border aspect-square rounded-full justify-center items-center",
                                                isActive
                                                    ? "bg-black"
                                                    : "bg-transparent",
                                            )}
                                        >
                                            <Text
                                                className={clsx(
                                                    "text-sm font-semibold",
                                                    isActive
                                                        ? "text-white"
                                                        : "text-black",
                                                )}
                                            >
                                                {day.charAt(0)}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </RowView>
                        )}
                    </ColumnView>
                    {/* <ActivityLogRecords /> */}
                </ColumnView>
            </ScrollView>
        </ScreenWrapper>
    );
}
