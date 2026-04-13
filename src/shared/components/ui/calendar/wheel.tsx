import clsx from "clsx";
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

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 3;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

const Wheel = forwardRef<WheelHandle, Props>(
    ({ data, initialIndex, onSelect }, ref) => {
        const scrollRef = useRef<ScrollView>(null);
        const [selectedIndex, setSelectedIndex] = useState(initialIndex);

        useImperativeHandle(ref, () => ({
            reset: () => {
                scrollRef.current?.scrollTo({ y: 0, animated: true });
                setSelectedIndex(0);
            },
        }));

        const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const y = e.nativeEvent.contentOffset.y;
            const index = Math.round(y / ITEM_HEIGHT);
            setSelectedIndex(index);
            onSelect(index);
        };
        return (
            <View
                style={[{ height: PICKER_HEIGHT, width: 120 }]}
                className="overflow-hidden"
            >
                <ScrollView
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={handleScroll}
                    contentOffset={{ x: 0, y: initialIndex * ITEM_HEIGHT }}
                >
                    <View style={{ height: ITEM_HEIGHT }} />
                    {data.map((m, i) => {
                        const realIndex = i;
                        const isSelected = realIndex === selectedIndex;
                        const distance = Math.abs(realIndex - selectedIndex);
                        return (
                            <View
                                key={m}
                                style={{ height: ITEM_HEIGHT }}
                                className="justify-center items-center"
                            >
                                <Text
                                    className={clsx(
                                        isSelected
                                            ? "text-2xl font-bold"
                                            : "text-xl",
                                        // isSelected &&
                                        //     "text-xl font-bold",
                                        // distance === 1 &&
                                        //     "text-lg opacity-40",
                                        // distance >= 2 &&
                                        //     "text-base opacity-5",
                                    )}
                                >
                                    {m}
                                </Text>
                            </View>
                        );
                    })}
                    <View style={{ height: ITEM_HEIGHT }} />
                </ScrollView>
            </View>
        );
    },
);

export default Wheel;
