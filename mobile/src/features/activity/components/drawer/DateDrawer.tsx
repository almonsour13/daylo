import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { Activity } from "@/shared/types/type";
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

const ITEM_HEIGHT = 56;
const VISIBLE_ITEMS = 5;

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear + i);
const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

// Today, normalized to midnight, used for all "is this in the past" checks.
const TODAY = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
})();

const parseDate = (value?: Date | string | null) => {
    const d = value ? new Date(value) : new Date();
    return {
        dayIndex: d.getDate() - 1,
        monthIndex: d.getMonth(),
        yearIndex:
            YEARS.indexOf(d.getFullYear()) === -1
                ? 0
                : YEARS.indexOf(d.getFullYear()),
    };
};

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
    const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.y / ITEM_HEIGHT,
        );
        const clamped = Math.max(0, Math.min(index, data.length - 1));
        onSelect(clamped);
    };

    return (
        <View style={{ flex: 1, position: "relative" }}>
            <FlatList
                data={data}
                keyExtractor={(_, i) => i.toString()}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
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
                style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
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

const DateDrawer = forwardRef<DrawerHandle, Props>(({ form, update }, ref) => {
    const drawerRef = useRef<DrawerHandle>(null);

    useImperativeHandle(ref, () => ({
        open: () => drawerRef.current?.open(),
        close: () => drawerRef.current?.close(),
    }));

    const parsed = parseDate(form.date);

    const [monthIndex, setMonthIndex] = useState(() => parsed.monthIndex);
    const [yearIndex, setYearIndex] = useState(() => parsed.yearIndex);
    const [dayIndex, setDayIndex] = useState(() => parsed.dayIndex);

    const selectedYear = YEARS[yearIndex];
    const isCurrentYear = selectedYear === TODAY.getFullYear();
    const isCurrentMonth = isCurrentYear && monthIndex === TODAY.getMonth();

    // Only months from "now" onward are selectable when viewing the current
    // year. In future years, all 12 months are valid.
    const visibleMonths = isCurrentYear
        ? MONTHS.slice(TODAY.getMonth())
        : MONTHS;
    const monthOffset = isCurrentYear ? TODAY.getMonth() : 0;

    // Only days from "today" onward are selectable when viewing the current
    // month+year. Otherwise the full month is valid.
    const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
    const visibleDays = isCurrentMonth
        ? Array.from(
              { length: daysInMonth - TODAY.getDate() + 1 },
              (_, i) => TODAY.getDate() + i,
          )
        : Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const dayOffset = isCurrentMonth ? TODAY.getDate() - 1 : 0;

    // dayIndex/monthIndex are stored as absolute indices (0-based day-of-month,
    // 0-based month-of-year) so the picker columns below need to translate
    // between "absolute index" and "index within the filtered list".
    const visibleMonthIndex = Math.max(0, monthIndex - monthOffset);
    const visibleDayIndex = Math.max(0, dayIndex - dayOffset);

    const handleMonthSelect = (visibleIndex: number) => {
        const absoluteMonth = visibleIndex + monthOffset;
        setMonthIndex(absoluteMonth);

        const maxDay = getDaysInMonth(absoluteMonth, selectedYear);
        const willBeCurrentMonth =
            isCurrentYear && absoluteMonth === TODAY.getMonth();
        const minDay = willBeCurrentMonth ? TODAY.getDate() : 1;

        if (dayIndex + 1 > maxDay || dayIndex + 1 < minDay) {
            setDayIndex(minDay - 1);
        }
    };

    const handleYearSelect = (i: number) => {
        setYearIndex(i);
        const willBeCurrentYear = YEARS[i] === TODAY.getFullYear();
        const minMonth = willBeCurrentYear ? TODAY.getMonth() : 0;

        let nextMonth = monthIndex;
        if (monthIndex < minMonth) {
            nextMonth = minMonth;
            setMonthIndex(nextMonth);
        }

        const willBeCurrentMonth =
            willBeCurrentYear && nextMonth === TODAY.getMonth();
        const minDay = willBeCurrentMonth ? TODAY.getDate() : 1;
        const maxDay = getDaysInMonth(nextMonth, YEARS[i]);

        if (dayIndex + 1 > maxDay || dayIndex + 1 < minDay) {
            setDayIndex(minDay - 1);
        }
    };

    const handleDaySelect = (visibleIndex: number) => {
        setDayIndex(visibleIndex + dayOffset);
    };

    const handleConfirm = () => {
        const selected = new Date(selectedYear, monthIndex, dayIndex + 1);
        const yyyy = selected.getFullYear();
        const mm = String(selected.getMonth() + 1).padStart(2, "0");
        const dd = String(selected.getDate()).padStart(2, "0");
        update({ date: `${yyyy}-${mm}-${dd}` });
        drawerRef.current?.close();
    };

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
                    <Text className="text-lg font-medium">Select Date</Text>
                </RowView>

                <RowView className="px-4 items-center">
                    <ScrollColumn
                        key={`day-${monthIndex}-${yearIndex}`}
                        data={visibleDays}
                        initialIndex={visibleDayIndex}
                        onSelect={handleDaySelect}
                        formatLabel={(item) => String(item).padStart(2, "0")}
                    />
                    <ScrollColumn
                        key={`month-${yearIndex}`}
                        data={visibleMonths}
                        initialIndex={visibleMonthIndex}
                        onSelect={handleMonthSelect}
                        formatLabel={(item) => item as string}
                    />
                    <ScrollColumn
                        key="year"
                        data={YEARS}
                        initialIndex={yearIndex}
                        onSelect={handleYearSelect}
                        formatLabel={(item) => String(item)}
                    />
                </RowView>

                <RowView className="px-4">
                    <TouchableOpacity
                        onPress={() => drawerRef.current?.close()}
                        className="flex-1"
                    >
                        <Card className="h-14 bg-muted justify-center items-center">
                            <Text>Cancel</Text>
                        </Card>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleConfirm}
                        className="flex-1"
                    >
                        <Card className="h-14 bg-primary justify-center items-center">
                            <Text className="text-white">Confirm</Text>
                        </Card>
                    </TouchableOpacity>
                </RowView>
            </ColView>
        </Drawer>
    );
});

export default DateDrawer;
