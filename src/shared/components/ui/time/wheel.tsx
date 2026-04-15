import { useRef, useState } from "react";
import {
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    View,
} from "react-native";

interface Props {
    data: (string | number)[];
    initialIndex?: number;
    onSelect: (i: number) => void;
    width?: number;
}

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const EDGE_ITEMS = 2;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

export default function Wheel({
    data,
    initialIndex = 0,
    onSelect,
    width = 80,
}: Props) {
    const scrollY = useRef(
        new Animated.Value(initialIndex * ITEM_HEIGHT),
    ).current;
    const scrollRef = useRef<any>(null);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    const handleLayout = () => {
        scrollRef.current?.scrollTo({
            y: initialIndex * ITEM_HEIGHT,
            animated: false,
        });
    };

    const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = e.nativeEvent.contentOffset.y;
        const index = Math.round(y / ITEM_HEIGHT);
        const clamped = Math.max(0, Math.min(index, data.length - 1));
        setSelectedIndex(clamped);
        onSelect(clamped);
    };

    return (
        <View style={{ height: PICKER_HEIGHT, width, overflow: "hidden" }}>
            {/* Top mask — React Native compatible */}
            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT * EDGE_ITEMS,
                    zIndex: 2,
                    backgroundColor: "transparent",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#E5E5E5",
                }}
            />

            {/* Bottom mask */}
            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT * EDGE_ITEMS,
                    zIndex: 2,
                    backgroundColor: "transparent",
                    borderTopWidth: 0.5,
                    borderTopColor: "#E5E5E5",
                }}
            />

            {/* Selection band */}
            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    top: ITEM_HEIGHT * EDGE_ITEMS,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT,
                    zIndex: 1,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: "#E5E5E5",
                }}
            />

            <Animated.ScrollView
                ref={scrollRef}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onLayout={handleLayout}
                onMomentumScrollEnd={handleMomentumEnd}
                contentContainerStyle={{
                    paddingTop: ITEM_HEIGHT * EDGE_ITEMS,
                    paddingBottom: ITEM_HEIGHT * EDGE_ITEMS,
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                        listener: () => {
                            if (!hasScrolled) setHasScrolled(true);
                        },
                    },
                )}
            >
                {data.map((item, i) => {
                    const distance = Math.abs(i - selectedIndex);

                    // Static values before first scroll
                    const staticScale =
                        distance === 0
                            ? 1
                            : distance === 1
                              ? 0.9
                              : distance === 2
                                ? 0.8
                                : 0.7;
                    const staticOpacity =
                        distance === 0
                            ? 1
                            : distance === 1
                              ? 0.5
                              : distance === 2
                                ? 0.25
                                : 0.1;

                    const inputRange = [
                        (i - 3) * ITEM_HEIGHT,
                        (i - 2) * ITEM_HEIGHT,
                        (i - 1) * ITEM_HEIGHT,
                        i * ITEM_HEIGHT,
                        (i + 1) * ITEM_HEIGHT,
                        (i + 2) * ITEM_HEIGHT,
                        (i + 3) * ITEM_HEIGHT,
                    ];

                    const animatedScale = scrollY.interpolate({
                        inputRange,
                        outputRange: [0.7, 0.8, 0.9, 1, 0.9, 0.8, 0.7],
                        extrapolate: "clamp",
                    });

                    const animatedOpacity = scrollY.interpolate({
                        inputRange,
                        outputRange: [0.1, 0.25, 0.5, 1, 0.5, 0.25, 0.1],
                        extrapolate: "clamp",
                    });

                    // Font weight: bolder at center, lighter at edges
                    // Can't animate fontWeight natively, so snap on selectedIndex
                    const fontWeight = distance === 0 ? "500" : "400";

                    return (
                        <View
                            key={`${item}-${i}`}
                            style={{
                                height: ITEM_HEIGHT,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Animated.Text
                                style={{
                                    fontSize: 22,
                                    fontWeight,
                                    color: "#000",
                                    letterSpacing: 0.3,
                                    opacity: hasScrolled
                                        ? animatedOpacity
                                        : staticOpacity,
                                    transform: [
                                        {
                                            scale: hasScrolled
                                                ? animatedScale
                                                : staticScale,
                                        },
                                    ],
                                }}
                            >
                                {item}
                            </Animated.Text>
                        </View>
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
}
