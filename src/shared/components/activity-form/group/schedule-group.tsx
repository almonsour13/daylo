import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { toDateTime } from "@/shared/utils/time";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { format } from "date-fns";
import { Text, View } from "react-native";
import DateDrawer from "../drawer/date-drawer";
import EndTimeDrawer from "../drawer/end-time-drawer";
import RepeatTypeDrawer from "../drawer/repeat-type-drawer";
import StartTimeDrawer from "../drawer/start-time-drawer";
import { capitalize } from "@/shared/utils/string";
import { parseRepeat } from "@/shared/utils/activity";

export default function ScheduleGroup() {
    const { activityForm } = useActivityFormContext();

    const safeFormat = (date: Date, fmt: string) => {
        if (!date || isNaN(date.getTime())) return null;
        return format(date, fmt);
    };

    const schedule = [
        {
            name: "Date",
            value: activityForm.date
                ? (safeFormat(new Date(activityForm.date), "dd, MMM yyyy") ??
                  "Select Date")
                : "Select Date",
            drawer: DateDrawer,
        },
        {
            name: "Start Time",
            value:
                activityForm.date && activityForm.startTime
                    ? format(
                          toDateTime(activityForm.date, activityForm.startTime),
                          "p",
                      )
                    : "Select Start Time",
            drawer: StartTimeDrawer,
        },
        // {
        //     name: "End Time",
        //     value:
        //         activityForm.date && activityForm.endTime
        //             ? format(
        //                   toDateTime(activityForm.date, activityForm.endTime),
        //                   "p",
        //               )
        //             : "Select End Time",
        //     drawer: EndTimeDrawer,
        // },
        {
            name: "Repeat",
            value:
                activityForm.repeatType !== "custom"
                    ? capitalize(activityForm.repeatType)
                    : parseRepeat(activityForm.repeatDays)
                          .map((day) => capitalize(day))
                          .join(", "),
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
