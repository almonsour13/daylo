import { Text, View } from "react-native";
import { ColumnView, RowView } from "../custom-view";
import { useState } from "react";
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
}
export default function TimeSelector({
    type = "start",
    defaultTime = "13:00", //start time
    minTime = "",
    maxTime = "15:00",
}: Props) {
    const parseTime = (time: string) => {
        //default time is 24 hours format convert to 12 hours
        const [hour, minute] = defaultTime.split(":");
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
    const [hour, setHour] = useState(parseDefaultTime.hourIndex);
    const [minute, setMinute] = useState(parseDefaultTime.minuteIndex);
    const [period, setPeriod] = useState(parseDefaultTime.periodIndex);

    const displayHour = HOURS[hour];
    const displayMinute = MINUTES[minute];
    const displayPeriod = PERIODS[period];

    const handleHour = (i: number) => {
        setHour(i);
    };
    const handleMinute = (i: number) => {
        setMinute(i);
    };
    const handlePeriod = (i: number) => {
        setPeriod(i);
    };

    const parseMinTime = parseTime(minTime);
    const parseMaxTime = parseTime(maxTime);

    const filteredHours = HOURS.filter((_, i) => {});
    const filteredMinutes = MINUTES.filter((_, i) => {});
    const filteredPeriods = PERIODS.filter((_, i) => {});
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
