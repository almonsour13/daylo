import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";
import { useActivityLogRecords } from "../hooks/use-activity-log-records";

export default function ActivityLogRecords() {
    const {
        activityLogRecords,
        isActivityLogRecordsLoading,
        activityLogRecordsError,
    } = useActivityLogRecords();
    return (
        <ColumnView>
            <RowView>
                <Text>Activity Log Records</Text>
            </RowView>
            {isActivityLogRecordsLoading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : activityLogRecords.length > 0 ? (
                <ColumnView></ColumnView>
            ) : (
                <Text>No Activity Log Records Found</Text>
            )}
        </ColumnView>
    );
}
