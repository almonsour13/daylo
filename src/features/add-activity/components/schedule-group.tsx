import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import { toDateTime } from "@/shared/utils/time";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import { Text, View } from "react-native";
import { useAddActivityContext } from "../context/add-activity-context";
import DateDrawer from "./drawer/date-drawer";
import EndTimeDrawer from "./drawer/end-time-drawer";
import RepeatTypeDrawer from "./drawer/repeat-type-drawer";
import StartTimeDrawer from "./drawer/start-time-drawer";

export default function ScheduleGroup() {
    const { newActivity } = useAddActivityContext();
    const schedule = [
        {
            name: "Date",
            value: format(new Date(newActivity.date), "dd, MMM yyyy"),
            drawer: DateDrawer,
        },
        {
            name: "Start Time",
            value: format(
                toDateTime(newActivity.date, newActivity.startTime),
                "p",
            ),
            drawer: StartTimeDrawer,
        },
        {
            name: "End Time",
            value: format(
                toDateTime(newActivity.date, newActivity.endTime),
                "p",
            ),
            drawer: EndTimeDrawer,
        },
        {
            name: "Repeat",
            value: "Once",
            drawer: RepeatTypeDrawer,
        },
    ];
    return (
        <ColumnView>
            <Label>Schedule</Label>
            <View className=" rounded-xl overflow-hidden bg-gray-100">
                {schedule.map((item) => (
                    <item.drawer key={item.name}>
                        <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                            <Text className="text-base font-medium">
                                {item.name}
                            </Text>
                            <RowView className="items-center">
                                <Text className="text-sm text-gray-500">
                                    {item.value}
                                </Text>
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={16}
                                    className="text-gray-500"
                                />
                            </RowView>
                        </RowView>
                    </item.drawer>
                ))}
            </View>
        </ColumnView>
    );
}
