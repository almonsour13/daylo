import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { DAY_LABELS } from "@/shared/constants/constant";
import { useNow } from "@/shared/hooks/use-now";
import { cn } from "@/shared/utils/cn";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    addMonths,
    format,
    isBefore,
    isSameDay,
    isSameMonth,
    isToday,
    startOfDay,
    subMonths,
} from "date-fns";
import { useEffect, useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
    FadeIn,
    FadeInLeft,
    FadeInRight,
    FadeOut,
    ZoomIn,
    ZoomOut,
} from "react-native-reanimated";
import { buildCalendarWeeks } from "../utils/build-calendar-week";

export default function Calendar({
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
}: {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    currentMonth: Date;
    setCurrentMonth: (date: Date | ((prev: Date) => Date)) => void;
}) {
    const now = useNow();
    const monthKey = format(currentMonth, "yyyy-MM");

    const weeks = useMemo(() => buildCalendarWeeks(currentMonth), [monthKey]);

    const prevMonth = useRef(currentMonth);
    const goingForward = currentMonth.getTime() >= prevMonth.current.getTime();
    useEffect(() => {
        prevMonth.current = currentMonth;
    }, [currentMonth]);

    const gridEntering = goingForward
        ? FadeInRight.duration(220)
        : FadeInLeft.duration(220);

    const showReset =
        !isToday(selectedDate) || !isSameMonth(currentMonth, new Date());

    const goToToday = () => {
        const today = startOfDay(new Date());
        setCurrentMonth(today);
        setSelectedDate(today);
    };

    return (
        <ColView className="px-4">
            <RowView className="justify-between items-center">
                <Animated.View
                    key={`title-${monthKey}`}
                    entering={FadeIn.duration(200)}
                >
                    <Text className="text-xl">
                        {format(currentMonth, "MMMM yyyy")}
                    </Text>
                </Animated.View>
                <RowView className="items-center gap-1">
                    {showReset && (
                        <Animated.View
                            entering={ZoomIn.duration(150)}
                            exiting={ZoomOut.duration(100)}
                        >
                            <TouchableOpacity
                                onPress={goToToday}
                                hitSlop={8}
                                accessibilityRole="button"
                                accessibilityLabel="Go to today"
                            >
                                <Ionicons
                                    name="refresh-outline"
                                    size={24}
                                    className="text-foreground"
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    )}
                    <TouchableOpacity
                        onPress={() => setCurrentMonth((m) => subMonths(m, 1))}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Previous month"
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={28}
                            className="text-foreground"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setCurrentMonth((m) => addMonths(m, 1))}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Next month"
                    >
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={28}
                            className="text-foreground"
                        />
                    </TouchableOpacity>
                </RowView>
            </RowView>
            <ColView className="gap-1">
                <RowView className="gap-1">
                    {DAY_LABELS.slice(0, 7).map((label) => (
                        <Card
                            key={label}
                            className="flex-1 justify-center items-center bg-card p-2 py-1"
                        >
                            <Text className="text-sm text-muted-foreground">
                                {label.substring(0, 3)}
                            </Text>
                        </Card>
                    ))}
                </RowView>
                <Animated.View
                    key={`grid-${monthKey}`}
                    entering={gridEntering}
                    className="gap-1"
                >
                    {weeks.map((week) => (
                        <RowView
                            key={format(week[0].date, "yyyy-MM-dd")}
                            className="gap-1 p-0"
                        >
                            {week.map(({ date, isCurrentMonth }) => {
                                const isTodayCell = isSameDay(date, now);
                                const isSelected = isSameDay(
                                    date,
                                    selectedDate,
                                );
                                const isPastDay = isBefore(
                                    startOfDay(date),
                                    startOfDay(now),
                                );
                                // A selected or today cell keeps its own highlight; only plain past days are dimmed
                                const isDimmed = isPastDay && !isSelected;

                                return (
                                    <TouchableOpacity
                                        key={format(date, "yyyy-MM-dd")}
                                        className={cn(
                                            "flex-1 h-10 flex items-center",
                                            !isCurrentMonth && "opacity-60",
                                        )}
                                        accessibilityRole="button"
                                        accessibilityLabel={format(
                                            date,
                                            "EEEE, d MMMM yyyy",
                                        )}
                                        accessibilityState={{
                                            selected: isSelected,
                                        }}
                                        onPress={() => {
                                            setSelectedDate(startOfDay(date));
                                            if (!isCurrentMonth) {
                                                setCurrentMonth(date);
                                            }
                                        }}
                                    >
                                        <Card
                                            className={cn(
                                                "flex-1 p-0 w-full justify-center items-center bg-card overflow-hidden",
                                                isDimmed && "bg-card/50",
                                                !isSelected &&
                                                    isTodayCell &&
                                                    "bg-primary/50",
                                            )}
                                        >
                                            {isSelected && (
                                                <Animated.View
                                                    entering={FadeIn.duration(
                                                        150,
                                                    )}
                                                    exiting={FadeOut.duration(
                                                        150,
                                                    )}
                                                    className="absolute inset-0 bg-primary"
                                                />
                                            )}
                                            <Text
                                                className={cn(
                                                    "text-base",
                                                    (isSelected ||
                                                        isTodayCell) &&
                                                        "text-white font-semibold",
                                                )}
                                            >
                                                {format(date, "d")}
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                );
                            })}
                        </RowView>
                    ))}
                </Animated.View>
            </ColView>
        </ColView>
    );
}
