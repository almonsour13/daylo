import { VISIBLE_TABS } from "@/shared/constants/tabs";
import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

type Props = {
    tabWidth: number;
    currentScreen: string;
};

export default function ActiveTabIndicator({ tabWidth, currentScreen }: Props) {
    const indicatorX = useRef(new Animated.Value(0)).current;
    const indicatorOpacity = useRef(new Animated.Value(1)).current;
    const hasPositioned = useRef(false);

    const activeIndex = VISIBLE_TABS.findIndex(
        (t) => t.screen === currentScreen,
    );

    useEffect(() => {
        if (tabWidth === 0) return;

        Animated.timing(indicatorOpacity, {
            toValue: activeIndex === -1 ? 0 : 1,
            duration: 150,
            useNativeDriver: true,
        }).start();

        if (activeIndex === -1) return;

        const toValue = activeIndex * tabWidth;

        // First placement: jump, don't animate from 0
        if (!hasPositioned.current) {
            hasPositioned.current = true;
            indicatorX.setValue(toValue);
            return;
        }

        Animated.spring(indicatorX, {
            toValue,
            stiffness: 220,
            damping: 24,
            mass: 1,
            useNativeDriver: true,
        }).start();
    }, [activeIndex, tabWidth, indicatorX, indicatorOpacity]);

    if (tabWidth === 0) return null;

    return (
        <Animated.View
            pointerEvents="none"
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: tabWidth,
                opacity: indicatorOpacity,
                transform: [{ translateX: indicatorX }],
            }}
        >
            <View className="h-1 w-full rounded-t bg-primary" />
        </Animated.View>
    );
}
