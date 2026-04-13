import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useMemo, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
interface Props {
    value: string;
    onChange: (time: string) => void;
    children: React.ReactNode;
    minTime?: string;
    maxTime?: string;
    excludeTime?: string;
}

const ITEM_HEIGHT = 50;
const ALL_HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const ALL_MINUTES = Array.from({ length: 60 }, (_, i) => i);
const pad = (n: number) => String(n).padStart(2, "0");

const toMinutes = (h: number, m: number, period: "AM" | "PM") => {
    let hour = h;
    if (period === "AM" && h === 12) hour = 0;
    if (period === "PM" && h !== 12) hour += 12;
    return hour * 60 + m;
};

const parseTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return { totalMinutes: h * 60 + m, h, m };
};

function ScrollPicker({
    data,
    selected,
    onChange,
}: {
    data: number[];
    selected: number | null;
    onChange: (v: number) => void;
}) {
    return (
        <View style={{ height: ITEM_HEIGHT * 5, overflow: "hidden", flex: 1 }}>
            <View
                style={{
                    position: "absolute",
                    top: ITEM_HEIGHT * 2,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT,
                    borderTopWidth: 2,
                    borderBottomWidth: 2,
                    borderColor: "#000",
                    zIndex: 1,
                }}
            />
            <FlatList
                data={[null, null, ...data, null, null]}
                keyExtractor={(_, i) => String(i)}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                initialScrollIndex={
                    selected !== null ? data.indexOf(selected) + 2 : 0
                }
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                    );
                    const value = data[index];
                    if (value !== undefined) onChange(value);
                }}
                renderItem={({ item }) => {
                    const isSelected = item === selected;
                    const isNear =
                        item !== null &&
                        selected !== null &&
                        Math.abs(
                            data.indexOf(item) - data.indexOf(selected),
                        ) === 1;
                    return (
                        <View
                            style={{
                                height: ITEM_HEIGHT,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: isSelected ? 32 : 24,
                                    fontWeight: isSelected ? "600" : "300",
                                    color: isSelected
                                        ? "#000"
                                        : isNear
                                          ? "rgba(0,0,0,0.5)"
                                          : "rgba(0,0,0,0.2)",
                                }}
                            >
                                {item !== null ? pad(item) : ""}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default function TimePickerDrawer({
    value,
    onChange,
    children,
    minTime,
    maxTime,
    excludeTime,
}: Props) {
    const drawerRef = useRef<DrawerHandle>(null);

    const [period, setPeriod] = useState<"AM" | "PM">("AM");
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [selectedMin, setSelectedMin] = useState<number | null>(null);

    const min = minTime ? parseTime(minTime) : null;
    const max = maxTime ? parseTime(maxTime) : null;
    const exclude = excludeTime ? parseTime(excludeTime) : null;

    // ✅ filter allowed periods
    const allowedPeriods = useMemo(() => {
        const periods: ("AM" | "PM")[] = [];
        if (!min && !max) return ["AM", "PM"] as ("AM" | "PM")[];

        const amEnd = 11 * 60 + 59;
        const pmStart = 12 * 60;
        const minMins = min?.totalMinutes ?? 0;
        const maxMins = max?.totalMinutes ?? 23 * 60 + 59;

        if (minMins <= amEnd) periods.push("AM");
        if (maxMins >= pmStart) periods.push("PM");

        return periods;
    }, [min, max]);

    // ✅ only valid hours shown
    const availableHours = useMemo(() => {
        return ALL_HOURS.filter((hour) => {
            const totalMins = toMinutes(hour, selectedMin ?? 0, period);
            if (min && totalMins < min.totalMinutes) return false;
            if (max && totalMins > max.totalMinutes) return false;
            if (exclude) {
                let h = hour;
                if (period === "AM" && h === 12) h = 0;
                if (period === "PM" && h !== 12) h += 12;
                if (h === exclude.h && (selectedMin ?? 0) === exclude.m)
                    return false;
            }
            return true;
        });
    }, [selectedMin, period, min, max, exclude]);

    // ✅ only valid minutes shown
    const availableMinutes = useMemo(() => {
        return ALL_MINUTES.filter((minute) => {
            const totalMins = toMinutes(selectedHour ?? 1, minute, period);
            if (min && totalMins < min.totalMinutes) return false;
            if (max && totalMins > max.totalMinutes) return false;
            if (exclude) {
                let hour = selectedHour ?? 1;
                if (period === "AM" && hour === 12) hour = 0;
                if (period === "PM" && hour !== 12) hour += 12;
                if (hour === exclude.h && minute === exclude.m) return false;
            }
            return true;
        });
    }, [selectedHour, period, min, max, exclude]);

    // ✅ auto-correct on period switch
    const handlePeriodChange = (p: "AM" | "PM") => {
        setPeriod(p);
        if (selectedHour !== null && selectedMin !== null) {
            const totalMins = toMinutes(selectedHour, selectedMin, p);
            if (min && totalMins < min.totalMinutes) {
                setSelectedHour(min.h % 12 || 12);
                setSelectedMin(min.m);
            }
            if (max && totalMins > max.totalMinutes) {
                setSelectedHour(max.h % 12 || 12);
                setSelectedMin(max.m);
            }
        }
    };

    // ✅ auto-correct selected hour if it's no longer in availableHours
    const handleHourChange = (hour: number) => {
        setSelectedHour(hour);
        // reset minute if current minute is no longer valid for new hour
        if (selectedMin !== null) {
            const totalMins = toMinutes(hour, selectedMin, period);
            if (min && totalMins < min.totalMinutes) setSelectedMin(null);
            if (max && totalMins > max.totalMinutes) setSelectedMin(null);
        }
    };

    const isConfirmDisabled = selectedHour === null || selectedMin === null;

    const handleConfirm = () => {
        if (isConfirmDisabled) return;
        let hour = selectedHour!;
        if (period === "AM" && hour === 12) hour = 0;
        if (period === "PM" && hour !== 12) hour += 12;
        onChange(`${pad(hour)}:${pad(selectedMin!)}`);
        drawerRef.current?.close();
    };

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <ColumnView className="p-6 gap-4">
                <Text className="text-xl font-semibold text-center">
                    Select Time
                </Text>
                <RowView className="items-center justify-center gap-2">
                    <ScrollPicker
                        data={availableHours}
                        selected={selectedHour}
                        onChange={handleHourChange}
                    />
                    <Text className="text-4xl font-semibold">:</Text>
                    <ScrollPicker
                        data={availableMinutes}
                        selected={selectedMin}
                        onChange={setSelectedMin}
                    />
                </RowView>

                {/* AM / PM */}
                <RowView className="gap-2">
                    {(["AM", "PM"] as const).map((p) => {
                        const isAllowed = allowedPeriods.includes(p);
                        return (
                            <TouchableOpacity
                                key={p}
                                onPress={() =>
                                    isAllowed && handlePeriodChange(p)
                                }
                                disabled={!isAllowed}
                                className={`flex-1 h-12 rounded-full border-2 justify-center items-center ${
                                    !isAllowed
                                        ? "border-gray-200 opacity-30"
                                        : period === p
                                          ? "bg-black border-black"
                                          : "bg-transparent border-black"
                                }`}
                            >
                                <Text
                                    className={`font-semibold ${
                                        period === p && isAllowed
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    {p}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </RowView>

                {/* confirm */}
                <TouchableOpacity
                    onPress={handleConfirm}
                    disabled={isConfirmDisabled}
                    className={`h-16 rounded-full justify-center items-center ${
                        isConfirmDisabled ? "bg-gray-200" : "bg-black"
                    }`}
                >
                    <Text
                        className={`text-base font-semibold ${
                            isConfirmDisabled ? "text-gray-400" : "text-white"
                        }`}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </ColumnView>
        </Drawer>
    );
}
