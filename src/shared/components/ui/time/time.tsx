import { Text, View } from "react-native";
import { ColumnView, RowView } from "../custom-view";
import { useEffect, useRef, useState } from "react";
import Wheel from "./wheel";

const HOURS = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
);
const MINUTES = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0"),
);
const PERIODS = ["AM", "PM"];

interface Props {
    type: "start" | "end";
    defaultTime?: string;
    minTime?: string;
    maxTime?: string;
    onSelect?: (v: string) => void;
}
export default function TimeSelector({
    type = "start",
    defaultTime = "", //start time
    minTime = "",
    maxTime = "",
    onSelect,
}: Props) {
    const parseTime = (time: string) => {
        //default time is 24 hours format convert to 12 hours
        const [hour, minute] = time.split(":");
        const integerHour = parseInt(hour);
        const integerMinute = parseInt(minute);

        let hour12 = integerHour % 12;
        if (hour12 === 0) hour12 = 12;
        const period = integerHour >= 12 ? 1 : 0;

        return {
            hourIndex: hour12 - 1, // ✅ convert to index
            minuteIndex: integerMinute,
            periodIndex: period,
        };
    };
    const parseDefaultTime = parseTime(defaultTime);
    const hasInteracted = useRef(false);
    const [hour, setHour] = useState(parseDefaultTime.hourIndex);
    const [minute, setMinute] = useState(parseDefaultTime.minuteIndex);
    const [period, setPeriod] = useState(parseDefaultTime.periodIndex);

    const handleHour = (i: number) => {
        hasInteracted.current = true;
        setHour(i);
    };
    const handleMinute = (i: number) => {
        hasInteracted.current = true;
        setMinute(i);
    };
    const handlePeriod = (i: number) => {
        hasInteracted.current = true;
        setPeriod(i);
    };
    const to24Hour = () => {
        let h = hour + 1;

        if (period === 0 && h === 12) h = 0; // AM
        if (period === 1 && h !== 12) h += 12; // PM

        return `${String(h).padStart(2, "0")}:${MINUTES[minute]}`;
    };

    useEffect(() => {
        if (!hasInteracted.current) return;

        const formattedTime = to24Hour(); // ✅ FIXED
        onSelect?.(formattedTime);
    }, [hour, minute, period]);
    return (
        <ColumnView className="items-center">
            <RowView>
                <Wheel data={HOURS} initialIndex={hour} onSelect={handleHour} />
                <Wheel
                    data={MINUTES}
                    initialIndex={minute}
                    onSelect={handleMinute}
                />
                <Wheel
                    data={PERIODS}
                    initialIndex={period}
                    onSelect={handlePeriod}
                />
            </RowView>
        </ColumnView>
    );
}
