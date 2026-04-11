import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { WEEK_DAYS } from "@/shared/constants/constant";
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
            <RowView className="px-4 justify-between items-center">
                <Text className="text-2xl tracking-wide">
                    {format(todayMidnight, "dd MMMM, yyyy")}
                </Text>
            </RowView>
            <RowView className="px-2 justify-between items-center">
                {WEEK_DAYS.map((day, index) => {
                    const date = new Date(startOfWeek);
                    date.setDate(startOfWeek.getDate() + index);

                    const isToday =
                        date.toDateString() === todayMidnight.toDateString();
                    const isPast = date < todayMidnight;

                    return (
                        <View
                            className={clsx(
                                "p-4 px-2 flex-1 rounded-4xl flex-col gap-2 justify-between items-center",
                                isToday ? "bg-black" : "bg-white",
                                // isToday && "opacity-100",
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
                                    "justify-center items-center rounded-full",
                                    // isToday ? "bg-black" : "bg-white",
                                )}
                            >
                                <Text
                                    className={clsx(
                                        "text- font-semibold",
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
