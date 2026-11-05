import { ColView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, {
    cancelAnimation,
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

const ZOOM_EASING = Easing.out(Easing.cubic);

export default function FinishStep({ isActive }: { isActive: boolean }) {
    const { width, height } = useWindowDimensions();
    const badgeSize = Math.min(200, width * 0.5, height * 0.25);

    const titleProgress = useSharedValue(0);
    const badgeScale = useSharedValue(0);
    const checkScale = useSharedValue(0);

    useEffect(() => {
        if (!isActive) {
            // Stop and reset so the animation can replay next time
            cancelAnimation(titleProgress);
            cancelAnimation(badgeScale);
            cancelAnimation(checkScale);
            titleProgress.value = 0;
            badgeScale.value = 0;
            checkScale.value = 0;
            return;
        }

        titleProgress.value = withTiming(1, { duration: 500 });
        badgeScale.value = withDelay(
            150,
            withTiming(1, { duration: 450, easing: ZOOM_EASING }),
        );
        checkScale.value = withDelay(
            400,
            withTiming(1, { duration: 350, easing: ZOOM_EASING }),
        );
    }, [isActive, titleProgress, badgeScale, checkScale]);

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleProgress.value,
        transform: [
            { translateY: interpolate(titleProgress.value, [0, 1], [16, 0]) },
        ],
    }));

    const badgeStyle = useAnimatedStyle(() => ({
        transform: [{ scale: badgeScale.value }],
    }));

    const checkStyle = useAnimatedStyle(() => ({
        transform: [{ scale: checkScale.value }],
    }));

    return (
        <ColView className="flex-1 gap-12" style={{ width }}>
            <Animated.View style={titleStyle} className="px-4 gap-4">
                <Text
                    accessibilityRole="header"
                    className="text-4xl font-semibold"
                >
                    You're ready{"\n"}to go!
                </Text>
                <Text className="text-base text-muted-foreground leading-relaxed">
                    Your profile is set up. Start planning your first activity
                    and make today count.
                </Text>
            </Animated.View>

            <View
                className="flex-1 justify-center items-center"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
            >
                <Animated.View
                    style={[
                        { width: badgeSize * 1.2, height: badgeSize * 1.2 },
                        badgeStyle,
                    ]}
                    className="items-center justify-center rounded-full bg-primary/10"
                >
                    <Animated.View style={checkStyle}>
                        <Icon
                            name="checkmark"
                            size={badgeSize * 0.6}
                            className="text-primary"
                        />
                    </Animated.View>
                </Animated.View>
            </View>
        </ColView>
    );
}
