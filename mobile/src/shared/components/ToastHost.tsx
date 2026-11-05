import { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastStore } from "../utils/toast";

export default function ToastHost() {
    const { id, message } = useToastStore();
    const insets = useSafeAreaInsets();
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (id === 0) return;
        // A new toast restarts the sequence instead of stacking
        opacity.value = withSequence(
            withTiming(1, { duration: 150 }),
            withDelay(2000, withTiming(0, { duration: 250 })),
        );
    }, [id, opacity]);

    const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                {
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: insets.bottom + 96, // above the tab bar
                    alignItems: "center",
                },
                style,
            ]}
        >
            <Text
                style={{
                    backgroundColor: "rgba(50,50,50,0.95)",
                    color: "#fff",
                    fontSize: 14,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 24,
                    overflow: "hidden",
                    textAlign: "center",
                }}
            >
                {message}
            </Text>
        </Animated.View>
    );
}
