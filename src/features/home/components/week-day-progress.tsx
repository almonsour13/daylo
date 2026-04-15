import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { ACTIVITY_REAPEAT_DAYS } from "@/shared/constants/constant";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, View } from "react-native";

export default function WeekDaysProgress() {
    const today = new Date();
    const todayMidnight = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
    );
    const startOfWeek = new Date(todayMidnight);
    startOfWeek.setDate(todayMidnight.getDate() - todayMidnight.getDay());

    return (
        <ColumnView className="">
            <RowView className="px-4 justify-between items-end">
                <Text className="text-2xl tracking-wide">
                    {format(todayMidnight, "MMMM yyyy")}
                </Text>
                <Text className="hidden text-gray-500">
                    Week {format(todayMidnight, "w")}
                </Text>
            </RowView>
            <RowView className="px-4 justify-between items-center">
                {ACTIVITY_REAPEAT_DAYS.map((day, index) => {
                    const date = new Date(startOfWeek);
                    date.setDate(startOfWeek.getDate() + index);

                    const isToday =
                        date.toDateString() === todayMidnight.toDateString();
                    const isPast = date < todayMidnight;

                    return (
                        <View
                            className={clsx(
                                "w-12 py-3 flex-col gap-2 justify-between items-center rounded-xl",
                                isToday ? "bg-black" : "bg-white",
                            )}
                            key={day}
                        >
                            <Text
                                className={clsx(
                                    "text-sm font-semibold",
                                    isToday ? "text-white" : "text-black",
                                )}
                            >
                                {day}
                            </Text>
                            <View
                                className={clsx(
                                    // "h-12 aspect-square",
                                    " justify-center items-center rounded-full",
                                    // isToday ? "bg-black" : "bg-white",
                                )}
                            >
                                <Text
                                    className={clsx(
                                        "text-base font-semibold",
                                        isToday ? "text-white" : "text-black",
                                    )}
                                >
                                    {date.getDate()}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </RowView>
        </ColumnView>
    );
}
