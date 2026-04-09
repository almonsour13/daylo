import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { WEEK_DAYS } from "@/shared/constants/constant";
import clsx from "clsx";
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
        <ColumnView className="px-4">
            <RowView className="justify-between items-center">
                {WEEK_DAYS.map((day, index) => {
                    const date = new Date(startOfWeek);
                    date.setDate(startOfWeek.getDate() + index);

                    const isToday =
                        date.toDateString() === todayMidnight.toDateString();
                    const isPast = date < todayMidnight;

                    return (
                        <View
                            className={clsx(
                                "flex-col gap-2 justify-between items-center opacity-50",
                                isToday && "opacity-100",
                            )}
                            key={day}
                        >
                            <Text className="text-sm font-semibold">{day}</Text>
                            <View
                                className={clsx(
                                    "h-12 aspect-square justify-center items-center rounded-full",
                                    isToday ? "bg-black" : "bg-white",
                                )}
                            >
                                <Text
                                    className={clsx(
                                        "text-sm font-semibold",
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
