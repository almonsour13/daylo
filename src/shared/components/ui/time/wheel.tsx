import clsx from "clsx";
import { useState } from "react";
import {
    ScrollView,
    Text,
    View,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";
interface Props {
    data: (string | number)[];
    initialIndex?: number;
    onSelect: (i: number) => void;
    width?: number;
}

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 3;
const EDGE_ITEMS = 1;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function Wheel({
    data,
    initialIndex = 0,
    onSelect,
    width = 80,
}: Props) {
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
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
            style={{ height: PICKER_HEIGHT, width }}
        >
            <ScrollView
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                contentOffset={{ x: 0, y: initialIndex * ITEM_HEIGHT }}
                onMomentumScrollEnd={handleScroll}
                contentContainerStyle={{
                    paddingTop: ITEM_HEIGHT * EDGE_ITEMS,
                    paddingBottom: ITEM_HEIGHT * EDGE_ITEMS,
                }}
            >
                {data.map((item, i) => {
                    const isSelected = i === selectedIndex;

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
                            className={clsx(
                                "justify-center items-center border",
                                isSelected ? "bg-green-300" : "bg-red-300",
                            )}
                            style={{ height: ITEM_HEIGHT }}
                        >
                            <Text
                                className={clsx(fontSize, opacity)}
                                style={{ transform: [{ scale }] }}
                            >
                                {item}
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}
