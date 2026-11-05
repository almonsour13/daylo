import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { useNow } from "@/shared/hooks/use-now";
import { cn } from "@/shared/utils/cn";
import {
    addDays,
    format,
    isBefore,
    isSameDay,
    startOfDay,
    startOfWeek,
} from "date-fns";
import { useMemo } from "react";

export default function WeekDays() {
    const now = useNow();

    // Changes only at midnight, so the memo below recomputes once per day
    const dayKey = format(now, "yyyy-MM-dd");

    const { today, weekDays } = useMemo(() => {
        const today = startOfDay(now);
        const weekStart = startOfWeek(today, { weekStartsOn: 0 });

        const weekDays = Array.from({ length: 7 }, (_, i) => {
            const date = addDays(weekStart, i);
            return {
                key: format(date, "yyyy-MM-dd"),
                date,
                dayName: format(date, "EEE"),
                dayNumber: format(date, "d"),
                label: format(date, "EEEE, d MMMM yyyy"),
                isToday: isSameDay(date, today),
                isPast: isBefore(date, today),
            };
        });

        return { today, weekDays };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayKey]);

    const weekRange = `${format(weekDays[0].date, "MMM d")} - ${format(
        weekDays[6].date,
        "MMM d",
    )}`;

    return (
        <ColView>
            <RowView className="px-4 justify-between">
                <Text className="text-base">
                    {`Today, ${format(today, "dd MMM, yyyy")}`}
                </Text>
                <Text className="text-base text-muted-foreground">
                    {weekRange}
                </Text>
            </RowView>
            <RowView className="px-4 gap-1">
                {weekDays.map((day) => (
                    <Card
                        key={day.key}
                        accessible
                        accessibilityLabel={day.label}
                        accessibilityState={{ selected: day.isToday }}
                        className={cn(
                            "flex-1 p-2",
                            day.isToday && "bg-primary",
                            day.isPast && "opacity-50",
                        )}
                    >
                        <ColView className="items-center gap-1">
                            <Text
                                className={cn(
                                    "text-sm text-muted-foreground font-medium",
                                    day.isToday && "text-white",
                                )}
                            >
                                {day.dayName}
                            </Text>
                            <Text
                                className={cn(
                                    "text-lg",
                                    day.isToday && "text-white",
                                )}
                            >
                                {day.dayNumber}
                            </Text>
                        </ColView>
                    </Card>
                ))}
            </RowView>
        </ColView>
    );
}
