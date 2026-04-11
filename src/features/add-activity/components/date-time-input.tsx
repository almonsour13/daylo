import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { format } from "date-fns";
import { Text } from "react-native";
import { useAddActivityContext } from "../context/add-activity-context";
import { toDateTime } from "@/shared/utils/time";

export default function DateTimeInput() {
    const { newActivity, setNewActivity } = useAddActivityContext();
    return (
        <ColumnView className="gap-4">
            <InputField>
                <Label>Date and Time:</Label>
                <RowView className="h-12 px-4 rounded-md justify-between items-center bg-white">
                    <Text
                        className={clsx(
                            "text-base",
                            newActivity.date ? "" : "text-zinc-500",
                        )}
                    >
                        {newActivity.date
                            ? format(newActivity.date, "dd MMMM yy")
                            : "Select Date"}
                    </Text>
                    <Feather name="calendar" size={16} />
                </RowView>
            </InputField>
            <RowView className="flex-1 justify-between items-center">
                <InputField className="flex-1">
                    <Label>From:</Label>
                    <RowView className="h-12 px-4 rounded-md justify-between items-center bg-white">
                        <Text
                            className={clsx(
                                "text-base",
                                newActivity.startTime ? "" : "text-zinc-500",
                            )}
                        >
                            {newActivity.startTime
                                ? format(
                                      toDateTime(
                                          newActivity.date,
                                          newActivity.startTime,
                                      ),
                                      "p",
                                  )
                                : "Select Time"}
                        </Text>
                        <Feather name="clock" size={16} />
                    </RowView>
                </InputField>
                <InputField className="flex-1">
                    <Label>To:</Label>
                    <RowView className="h-12 px-4 rounded-md justify-between items-center bg-white">
                        <Text
                            className={clsx(
                                "text-base",
                                newActivity.endTime ? "" : "text-zinc-500",
                            )}
                        >
                            {newActivity.endTime
                                ? format(
                                      toDateTime(
                                          newActivity.date,
                                          newActivity.endTime,
                                      ),
                                      "p",
                                  )
                                : "Select Time"}
                        </Text>
                        <Feather name="clock" size={16} />
                    </RowView>
                </InputField>
            </RowView>
        </ColumnView>
    );
}
