import { RowView } from "@/shared/components/ui/custom-view";
import { STATUS } from "@/shared/constants/constant";
import { ActivityRecord } from "@/shared/types/activity";
import { getDurationLabel } from "@/shared/utils/time";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, View, ViewProps } from "react-native";

interface Props extends ViewProps {
    activityRecord: ActivityRecord;
}

export default function ActivityRecordCard({ activityRecord }: Props) {
    const status = STATUS[activityRecord.status];
    const date = format(activityRecord.createdAt, "dd MMM");
    const day = format(activityRecord.createdAt, "EEE");
    const startTime = format(activityRecord.startTime, "p");
    const endTime = format(activityRecord.endTime, "p");
    const duration = getDurationLabel(
        activityRecord.startTime,
        activityRecord.endTime,
    );

    return (
        <View className={clsx("p-4 gap-1")}>
            {/* <View
                className={clsx(
                    "absolute top-0 bottom-0 left-0 right-0",
                    status.color,
                )}
            /> */}
            <RowView className="justify-between items-center">
                <Text className="text-base font-medium">
                    {day}, {date}
                </Text>
                <View
                    className={clsx(
                        "px-2 h-6 rounded-full justify-center items-center",
                        status.color,
                    )}
                >
                    <Text className="text-xs text-white">{status.label}</Text>
                </View>
            </RowView>
            <RowView className="justify-between items-center">
                <Text className="text-sm opacity-75">
                    {startTime} — {endTime}
                </Text>
                <Text className="text-sm opacity-75">{duration}</Text>
            </RowView>
        </View>
    );
}
