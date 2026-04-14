import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { ColumnView } from "../custom-view";
import Wheel, { WheelHandle } from "./wheel";
import { useActivityFormContext } from "@/shared/context/activity-form-context";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
interface Props {
    defaultDate?: string;
    onSelectDate?: (date: string) => void;
}

export default function Calendar({ defaultDate, onSelectDate }: Props) {
    const dayWheelRef = useRef<WheelHandle>(null);
    const today = new Date();
    const hasInteracted = useRef(false);

    const parseDefault = () => {
        if (!defaultDate) return { month: 0, day: 0 };
        const date = new Date(defaultDate);
        const monthOffset = date.getMonth() - today.getMonth();
        const filteredDayIndex =
            date.getDate() -
            (date.getMonth() === today.getMonth() ? today.getDate() : 1);
        return {
            month: Math.max(0, monthOffset),
            day: Math.max(0, filteredDayIndex),
        };
    };

    const defaults = parseDefault();

    const [viewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(defaults.month);
    const [viewDay, setViewDay] = useState(defaults.day);

    // ✅ months from today
    const filteredMonths = MONTHS.slice(today.getMonth());

    // ✅ convert to real month
    const realMonth = today.getMonth() + viewMonth;

    const getDaysInMonth = (y: number, m: number) =>
        new Date(y, m + 1, 0).getDate();

    // ✅ generate REAL days (1..n)
    const allDays = Array.from(
        { length: getDaysInMonth(viewYear, realMonth) },
        (_, i) => i + 1,
    );

    // ✅ filter days correctly
    const filteredDays =
        realMonth === today.getMonth()
            ? allDays.slice(today.getDate() - 1)
            : allDays;

    // ✅ FIX: compute actual selected day
    const actualDay = filteredDays[viewDay];

    // ✅ FIX: compute weekday from REAL date
    const selectedDate = new Date(viewYear, realMonth, actualDay + 1);
    const weekday = DAYS[selectedDate.getDay()];

    useEffect(() => {
        if (!hasInteracted.current) return;
        const formatted = selectedDate.toISOString().split("T")[0];
        onSelectDate?.(formatted);
    }, [actualDay, realMonth, viewYear]);

    // prevent overflow
    useEffect(() => {
        if (viewDay >= filteredDays.length) {
            setViewDay(filteredDays.length - 1);
        }
    }, [viewMonth]);

    const handleMonthSelect = (i: number) => {
        hasInteracted.current = true;
        setViewMonth(i);
        setViewDay(0);
        setTimeout(() => dayWheelRef.current?.reset(), 0);
    };

    const handleDaySelect = (i: number) => {
        hasInteracted.current = true;
        setViewDay(i);
    };
    return (
        <View className="p-4">
            <ColumnView className="items-center">
                <Text>
                    {filteredMonths[viewMonth]} {weekday} {actualDay},{" "}
                    {viewYear}
                </Text>

                <View className="flex-row rounded-md overflow-hidden">
                    <Wheel
                        data={filteredMonths}
                        initialIndex={defaults.month} // ← was hardcoded 0
                        onSelect={handleMonthSelect}
                    />

                    <Wheel
                        key={`day-${viewMonth}`}
                        ref={dayWheelRef}
                        data={filteredDays.map((d) => {
                            const date = new Date(viewYear, realMonth, d);
                            return `${d} ${DAYS[date.getDay()]} `;
                        })}
                        initialIndex={defaults.day} // ← was hardcoded 0
                        onSelect={handleDaySelect}
                    />
                </View>
            </ColumnView>
        </View>
    );
}
