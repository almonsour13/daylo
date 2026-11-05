import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useSlideVisibility(
    visible: boolean,
    distance = 24,
    duration = 250,
) {
    const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
    const translateY = useRef(
        new Animated.Value(visible ? 0 : distance),
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: visible ? 1 : 0,
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: visible ? 0 : distance,
                duration,
                useNativeDriver: true,
            }),
        ]).start();
    }, [visible, distance, duration, opacity, translateY]);

    return { opacity, translateY };
}
