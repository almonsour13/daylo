import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { WEEK_DAYS } from "@/shared/constants/constant";
import { Text, View } from "react-native";

export default function ActivityStatistic() {
    const activityLogStatus = [
        {
            value: 10,
            label: "Completed",
        },
        {
            value: 2,
            label: "Skipped",
        },
        {
            value: 3,
            label: "Missed",
        },
    ];
    return (
        <View className="px-4">
            <ColumnView className="rounded-4xl">
                <RowView>
                    <Text className="text-base font-semibold">
                        Activity Statistic
                    </Text>
                </RowView>
                <ColumnView
                    className="gap-4 p-4 rounded-4xl"
                    style={{
                        backgroundColor: "rgb(0,0,0,0.1)",
                    }}
                >
                    <RowView className="">
                        {WEEK_DAYS.map((day, index) => {
                            return (
                                <ColumnView
                                    key={day}
                                    className="flex-1 justify-center items-center"
                                >
                                    <View className="h-48 w-full bg-zinc-100 rounded-4xl" />
                                    <Text className="text-sm font-semibold">
                                        {day.charAt(0)}
                                    </Text>
                                </ColumnView>
                            );
                        })}
                    </RowView>
                    <RowView className="flex-1 items-center">
                        {activityLogStatus.map((status, index) => {
                            return (
                                <View
                                    key={status.label}
                                    className="flex-1 flex-col gap-1 justify-center items-center"
                                >
                                    <Text className="text-3xl font-semibold">
                                        {status.value}
                                    </Text>
                                    <Text className="text-xs">
                                        {status.label}
                                    </Text>
                                </View>
                            );
                        })}
                    </RowView>
                </ColumnView>
            </ColumnView>
        </View>
    );
}
