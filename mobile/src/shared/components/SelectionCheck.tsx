import Feather from "@expo/vector-icons/Feather";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const SIZE = 24;
const GAP = 8;
const DURATION = 180;

type Props = {
    visible: boolean;
    selected: boolean;
};

export default function SelectionCheck({ visible, selected }: Props) {
    const reveal = useSharedValue(visible ? 1 : 0);
    const fill = useSharedValue(selected ? 1 : 0);
    const pulse = useSharedValue(1);
    const isFirstRun = useRef(true);

    useEffect(() => {
        reveal.value = withTiming(visible ? 1 : 0, { duration: DURATION });
    }, [visible, reveal]);

    useEffect(() => {
        fill.value = withTiming(selected ? 1 : 0, { duration: DURATION });

        // Small press feedback, skipped on the first render
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        pulse.value = withSequence(
            withTiming(0.85, { duration: 80 }),
            withTiming(1, { duration: 120 }),
        );
    }, [selected, fill, pulse]);

    const slotStyle = useAnimatedStyle(() => ({
        width: reveal.value * (SIZE + GAP),
        opacity: reveal.value,
    }));

    const boxStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    const fillStyle = useAnimatedStyle(() => ({
        opacity: fill.value,
        transform: [{ scale: interpolate(fill.value, [0, 1], [0.4, 1]) }],
    }));

    const checkStyle = useAnimatedStyle(() => ({
        opacity: fill.value,
        transform: [{ scale: interpolate(fill.value, [0, 1], [0.3, 1]) }],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={slotStyle}
            className="mt-1 overflow-hidden"
            importantForAccessibility="no-hide-descendants"
            accessibilityElementsHidden
        >
            <Animated.View
                style={[{ width: SIZE, height: SIZE }, boxStyle]}
                className="items-center justify-center"
            >
                <View className="absolute inset-0 rounded-full border-2 border-border" />
                <Animated.View
                    style={fillStyle}
                    className="absolute inset-0 rounded-full bg-primary"
                />
                <Animated.View style={checkStyle}>
                    <Feather name="check" size={18} className="text-white" />
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
}
