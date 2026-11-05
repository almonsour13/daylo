import { Card } from "@/shared/components/ui/Card";
import { ColView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { NavigationProp } from "@/shared/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, View } from "react-native";
import Animated, {
    FadeInDown,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    ZoomIn,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LOGO = require("../../../../assets/images/splash-icon.png");

export default function OnboardingIntroScreen() {
    const navigation = useNavigation<NavigationProp>();
    const insets = useSafeAreaInsets();

    const scale = useSharedValue(1);
    const buttonStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handleStart = () =>
        navigation.navigate("Onboarding", {
            screen: "OnboardingStepsScreen",
        });

    return (
        <ColView className="flex-1 gap-8">
            <ColView className="flex-1">
                <View className="flex-1 justify-center items-center">
                    <Animated.View
                        entering={ZoomIn.duration(600)}
                        className="items-center justify-center"
                    >
                        <Image
                            source={LOGO}
                            style={{ width: 180, height: 180 }}
                            resizeMode="contain"
                            accessibilityIgnoresInvertColors
                            accessible={false}
                        />
                    </Animated.View>
                </View>
                <ColView className="px-4 justify-center items-center gap-4">
                    <Animated.View
                        entering={FadeInDown.delay(250).duration(500)}
                        className="gap-3 items-center"
                    >
                        <Text
                            accessibilityRole="header"
                            className="text-4xl font-medium text-center"
                        >
                            Make every day count.
                        </Text>
                        <Text className="text-base text-muted-foreground text-center leading-relaxed">
                            Plan your activities, build consistent routines, and
                            stay organized, one day at a time.
                        </Text>
                    </Animated.View>
                </ColView>
            </ColView>
            <Animated.View
                entering={FadeInDown.delay(550).duration(500)}
                className="px-4"
                style={{ paddingBottom: Math.max(insets.bottom, 16) + 16 }}
            >
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Get started"
                    onPress={handleStart}
                    onPressIn={() => {
                        scale.value = withSpring(0.97, { damping: 15 });
                    }}
                    onPressOut={() => {
                        scale.value = withSpring(1, { damping: 15 });
                    }}
                >
                    <Animated.View style={buttonStyle}>
                        <Card className="h-16 flex-row justify-center items-center gap-2 bg-primary">
                            <Text className="text-white text-lg font-medium">
                                Get Started
                            </Text>
                            <Feather
                                name="arrow-right"
                                size={20}
                                className="text-white"
                            />
                        </Card>
                    </Animated.View>
                </Pressable>
            </Animated.View>
        </ColView>
    );
}
