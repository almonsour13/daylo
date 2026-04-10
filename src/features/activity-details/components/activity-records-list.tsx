import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer from "@/shared/components/ui/drawer";
import { Text, View } from "react-native";
import { useActivityRecords } from "../hooks/use-activity-records";
import ActivityRecordCard from "./activity-record-card";
import ActivityRecordPreviewDrawer from "./activity-record-preview-drawer";

export default function ActivityRecords() {
    const { activityRecords, isActivityRecordsLoading, activityRecordsError } =
        useActivityRecords();

    return (
        <ColumnView className="px-4">
            <RowView>
                <Text>Records</Text>
            </RowView>
            {isActivityRecordsLoading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : activityRecords.length > 0 ? (
                <View className="flex-col rounded-2xl overflow-hidden bg-white">
                    {activityRecords.map((record, i) => {
                        return (
                            <Drawer
                                triggerButton={
                                    <ActivityRecordCard
                                        activityRecord={record}
                                    />
                                }
                            >
                                <ActivityRecordPreviewDrawer
                                    activityRecord={record}
                                />
                            </Drawer>
                        );
                    })}
                </View>
            ) : (
                <Text>No Activity Records Found</Text>
            )}
        </ColumnView>
    );
}
