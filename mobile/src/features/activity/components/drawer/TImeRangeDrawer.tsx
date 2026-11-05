import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { Activity } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
    form: Activity;
    update: (f: Partial<Activity>) => void;
}

type Tab = "start" | "end";
// Times are kept as "HH:mm" (24h) strings, or null when not set
type Draft = { start: string | null; end: string | null };

const pad = (n: number) => n.toString().padStart(2, "0");
const ITEM_HEIGHT = 56;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
const LAST_MINUTE_OF_DAY = 23 * 60 + 59;

// Only where the wheel starts when nothing is set. It is never written to the
// form unless the user confirms (start) or explicitly adds an end time.
const DEFAULT_TIME = "07:00";

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const PERIODS = ["AM", "PM"];

const parseTime = (value?: string | null) => {
    const fallback = { hourIndex: 6, minuteIndex: 0, periodIndex: 0 }; // 7:00 AM
    if (!value) return fallback;

    const [h, m] = value.split(":").map((v) => parseInt(v, 10));
    if (Number.isNaN(h) || Number.isNaN(m)) return fallback;

    const hourIndex = HOURS.indexOf(h % 12 || 12);
    const minuteIndex = MINUTES.indexOf(m);
    const periodIndex = PERIODS.indexOf(h >= 12 ? "PM" : "AM");
    if (hourIndex < 0 || minuteIndex < 0) return fallback;

    return { hourIndex, minuteIndex, periodIndex };
};

const to24Hour = (
    hourIndex: number,
    minuteIndex: number,
    periodIndex: number,
) => {
    let h = HOURS[hourIndex];
    const period = PERIODS[periodIndex];
    if (period === "AM" && h === 12) h = 0;
    if (period === "PM" && h !== 12) h += 12;
    return `${pad(h)}:${pad(MINUTES[minuteIndex])}`;
};

const toMinutes = (value: string) => {
    const [h, m] = value.split(":").map((v) => parseInt(v, 10));
    return h * 60 + m;
};

const fromMinutes = (total: number) =>
    `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;

const formatTime = (value: string | null) => {
    if (!value) return "Not set";
    const { hourIndex, minuteIndex, periodIndex } = parseTime(value);
    return `${HOURS[hourIndex]}:${pad(MINUTES[minuteIndex])} ${PERIODS[periodIndex]}`;
};

const toDraft = (start?: string | null, end?: string | null): Draft => ({
    start: start || null,
    end: end || null,
});

const ScrollColumn = ({
    data,
    initialIndex,
    onSelect,
    formatLabel,
}: {
    data: (number | string)[];
    initialIndex: number;
    onSelect: (index: number) => void;
    formatLabel: (item: number | string) => string;
}) => {
    const handleScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.y / ITEM_HEIGHT,
        );
        onSelect(Math.max(0, Math.min(index, data.length - 1)));
    };

    return (
        <View className="relative flex-1">
            <FlatList
                data={data}
                keyExtractor={(_, i) => i.toString()}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
                onScrollEndDrag={handleScrollEnd}
                initialScrollIndex={initialIndex}
                getItemLayout={(_, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })}
                contentContainerStyle={{
                    paddingVertical:
                        ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
                }}
                style={{ height: PICKER_HEIGHT }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            height: ITEM_HEIGHT,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text className="text-foreground text-2xl">
                            {formatLabel(item)}
                        </Text>
                    </View>
                )}
            />
            <ColView className="absolute inset-0" pointerEvents="none">
                <View className="flex-1 bg-card/80" />
                <View style={{ height: ITEM_HEIGHT }} />
                <View className="flex-1 bg-card/80" />
            </ColView>
            <View
                pointerEvents="none"
                className="absolute left-0 right-0 border-y border-muted"
                style={{
                    top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
                    height: ITEM_HEIGHT,
                }}
            />
        </View>
    );
};

const TimeRangeDrawer = forwardRef<DrawerHandle, Props>(
    ({ form, update }, ref) => {
        const drawerRef = useRef<DrawerHandle>(null);
        const { startTime, endTime } = form;

        const [activeTab, setActiveTab] = useState<Tab>("start");
        // Edits stay in this draft until Confirm; the form is untouched before
        const [draft, setDraft] = useState<Draft>(() =>
            toDraft(startTime, endTime),
        );
        // Bumped on every open so the wheels remount at the right position
        const [openKey, setOpenKey] = useState(0);

        useImperativeHandle(
            ref,
            () => ({
                open: () => {
                    setDraft(toDraft(startTime, endTime));
                    setActiveTab("start");
                    setOpenKey((k) => k + 1);
                    drawerRef.current?.open();
                },
                close: () => drawerRef.current?.close(),
            }),
            [startTime, endTime],
        );

        // What the start wheel shows. Not saved until the user confirms.
        const startValue = draft.start ?? DEFAULT_TIME;
        const hasEnd = !!draft.end;

        const rangeError =
            hasEnd && toMinutes(draft.end!) <= toMinutes(startValue)
                ? "End time must be after start time."
                : null;
        const canAddEnd = toMinutes(startValue) < LAST_MINUTE_OF_DAY;

        const setPart = (tab: Tab, part: 0 | 1 | 2, index: number) => {
            setDraft((d) => {
                const current = parseTime(d[tab] ?? DEFAULT_TIME);
                const idx = [
                    current.hourIndex,
                    current.minuteIndex,
                    current.periodIndex,
                ];
                idx[part] = index;
                return { ...d, [tab]: to24Hour(idx[0], idx[1], idx[2]) };
            });
        };

        const addEnd = () => {
            // Start one hour after the start time (capped at the end of the day)
            const startMin = toMinutes(startValue);
            const next = Math.min(startMin + 60, LAST_MINUTE_OF_DAY);
            if (next <= startMin) return;
            setDraft((d) => ({ ...d, end: fromMinutes(next) }));
        };

        const removeEnd = () => setDraft((d) => ({ ...d, end: null }));

        const handleConfirm = () => {
            if (rangeError) return;
            update({
                startTime: startValue,
                endTime: draft.end ?? "", // end time is optional
            });
            drawerRef.current?.close();
        };

        const isStart = activeTab === "start";
        const currentTime = parseTime(isStart ? startValue : draft.end);

        return (
            <Drawer
                ref={drawerRef}
                disableScrollView
                disableBackdrop={true}
                disableHandle={true}
                disableBackHandler={true}
            >
                <ColView className="gap-2 py-4">
                    <RowView className="px-4 justify-center">
                        <Text className="text-lg font-medium">
                            Select Time Range
                        </Text>
                    </RowView>

                    <RowView className="px-4 gap-2">
                        {(["start", "end"] as const).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                className="flex-1"
                                onPress={() => setActiveTab(tab)}
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: activeTab === tab,
                                }}
                            >
                                <Card
                                    className={cn(
                                        "h-14 py-0 justify-center items-center border border-border gap-0.5",
                                        activeTab === tab && "bg-muted",
                                    )}
                                >
                                    <Text className="text-xs capitalize text-muted-foreground">
                                        {tab} time
                                    </Text>
                                    <Text className="font-medium">
                                        {tab === "start"
                                            ? formatTime(startValue)
                                            : formatTime(draft.end)}
                                    </Text>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </RowView>

                    {!isStart && !hasEnd ? (
                        <ColView
                            className="px-4 items-center justify-center gap-3"
                            style={{ height: PICKER_HEIGHT }}
                        >
                            <Text className="text-muted-foreground text-center">
                                No end time. This activity will only have a
                                start time.
                            </Text>
                            <TouchableOpacity
                                onPress={addEnd}
                                disabled={!canAddEnd}
                                accessibilityRole="button"
                                accessibilityLabel="Add end time"
                                className={cn(!canAddEnd && "opacity-50")}
                            >
                                <Card className="h-12 px-6 py-0 bg-muted justify-center items-center">
                                    <Text>Add end time</Text>
                                </Card>
                            </TouchableOpacity>
                        </ColView>
                    ) : (
                        <RowView className="px-4 items-center">
                            <ScrollColumn
                                key={`${openKey}-${activeTab}-h`}
                                data={HOURS}
                                initialIndex={currentTime.hourIndex}
                                onSelect={(i) => setPart(activeTab, 0, i)}
                                formatLabel={(item) => pad(item as number)}
                            />
                            <Text className="text-2xl font-bold pb-1">:</Text>
                            <ScrollColumn
                                key={`${openKey}-${activeTab}-m`}
                                data={MINUTES}
                                initialIndex={currentTime.minuteIndex}
                                onSelect={(i) => setPart(activeTab, 1, i)}
                                formatLabel={(item) => pad(item as number)}
                            />
                            <ScrollColumn
                                key={`${openKey}-${activeTab}-p`}
                                data={PERIODS}
                                initialIndex={currentTime.periodIndex}
                                onSelect={(i) => setPart(activeTab, 2, i)}
                                formatLabel={(item) => item as string}
                            />
                        </RowView>
                    )}

                    {!isStart && hasEnd && (
                        <TouchableOpacity
                            onPress={removeEnd}
                            hitSlop={8}
                            accessibilityRole="button"
                            accessibilityLabel="Remove end time"
                            className="self-center py-2"
                        >
                            <Text className="text-sm text-destructive">
                                Remove end time
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!!rangeError && (
                        <Text className="px-4 text-center text-sm text-destructive py-2">
                            {rangeError}
                        </Text>
                    )}

                    <RowView className="px-4">
                        <TouchableOpacity
                            onPress={() => drawerRef.current?.close()}
                            className="flex-1"
                            accessibilityRole="button"
                        >
                            <Card className="h-14 bg-muted justify-center items-center">
                                <Text>Cancel</Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            disabled={!!rangeError}
                            className={cn(
                                "flex-1",
                                !!rangeError && "opacity-50",
                            )}
                            accessibilityRole="button"
                            accessibilityState={{ disabled: !!rangeError }}
                        >
                            <Card className="h-14 bg-primary justify-center items-center">
                                <Text className="text-white">Confirm</Text>
                            </Card>
                        </TouchableOpacity>
                    </RowView>
                </ColView>
            </Drawer>
        );
    },
);

export default TimeRangeDrawer;
