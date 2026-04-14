import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";

export interface WheelHandle {
    reset: () => void;
}

interface Props {
    data: string[] | number[];
    initialIndex: number;
    onSelect: (i: number) => void;
}

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const EDGE_ITEMS = 2;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const Wheel = forwardRef<WheelHandle, Props>(
    ({ data, initialIndex, onSelect }, ref) => {
        const scrollRef = useRef<ScrollView>(null);
        const [selectedIndex, setSelectedIndex] = useState(initialIndex);

        useImperativeHandle(ref, () => ({
            reset: () => {
                scrollRef.current?.scrollTo({ y: 0, animated: true });
                setSelectedIndex(0);
                onSelect(0);
            },
        }));

        const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const y = e.nativeEvent.contentOffset.y;
            const index = Math.round(y / ITEM_HEIGHT);
            const clamped = Math.max(0, Math.min(index, data.length - 1));
            setSelectedIndex(clamped);
            onSelect(clamped);
        };

        return (
            <View
                className="overflow-hidden relative"
                style={{ height: PICKER_HEIGHT, width: 140 }}
            >
                {/* ── Selection highlight bar ── */}
                <View
                    className="absolute left-0 right-0 z-10 border-y border-black/[0.12] bg-black/[0.04]"
                    style={{
                        top: ITEM_HEIGHT * EDGE_ITEMS,
                        height: ITEM_HEIGHT,
                    }}
                    pointerEvents="none"
                />

                <ScrollView
                    ref={scrollRef}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={handleScroll}
                    contentOffset={{ x: 0, y: initialIndex * ITEM_HEIGHT }}
                    contentContainerStyle={{
                        paddingTop: ITEM_HEIGHT * EDGE_ITEMS,
                        paddingBottom: ITEM_HEIGHT * EDGE_ITEMS,
                    }}
                >
                    {data.map((item, i) => {
                        const distance = Math.abs(i - selectedIndex);

                        const opacity =
                            distance === 0
                                ? "opacity-100"
                                : distance === 1
                                  ? "opacity-40"
                                  : distance === 2
                                    ? "opacity-15"
                                    : "opacity-5";

                        const fontSize =
                            distance === 0
                                ? "text-[22px] font-bold tracking-wide"
                                : "text-lg font-normal";

                        const scale =
                            distance === 0 ? 1 : distance === 1 ? 0.88 : 0.78;

                        return (
                            <View
                                key={`${item}-${i}`}
                                className="justify-center items-center"
                                style={{ height: ITEM_HEIGHT }}
                            >
                                <Text
                                    className={`text-neutral-900 ${opacity} ${fontSize}`}
                                    style={{ transform: [{ scale }] }}
                                >
                                    {item}
                                </Text>
                            </View>
                        );
                    })}
                </ScrollView>

                {/* ── Top fade mask ── */}
                <View
                    className="absolute top-0 left-0 right-0 z-20 flex-col"
                    style={{ height: ITEM_HEIGHT * EDGE_ITEMS }}
                    pointerEvents="none"
                >
                    <View className="flex-1 bg-white/[0.92]" />
                    <View className="flex-1 bg-white/60" />
                    <View className="flex-1 bg-white/30" />
                    <View className="flex-1 bg-white/[0.08]" />
                </View>

                {/* ── Bottom fade mask ── */}
                <View
                    className="absolute bottom-0 left-0 right-0 z-20 flex-col"
                    style={{ height: ITEM_HEIGHT * EDGE_ITEMS }}
                    pointerEvents="none"
                >
                    <View className="flex-1 bg-white/[0.08]" />
                    <View className="flex-1 bg-white/30" />
                    <View className="flex-1 bg-white/60" />
                    <View className="flex-1 bg-white/[0.92]" />
                </View>
            </View>
        );
    },
);

export default Wheel;
