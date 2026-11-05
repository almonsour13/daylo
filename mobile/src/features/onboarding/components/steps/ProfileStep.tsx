import { Card } from "@/shared/components/ui/Card";
import { ColView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { Profile } from "@/shared/types/type";
import { useEffect } from "react";
import { Dimensions, TextInput } from "react-native";
import Animated, {
    cancelAnimation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function ProfileStep({
    isActive,
    profile,
    setProfile,
}: {
    isActive: boolean;
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) {
    const titleProgress = useSharedValue(0);
    const contentProgress = useSharedValue(0);

    useEffect(() => {
        if (!isActive) {
            // Stop and reset so the animation replays next time
            cancelAnimation(titleProgress);
            cancelAnimation(contentProgress);
            titleProgress.value = 0;
            contentProgress.value = 0;
            return;
        }

        titleProgress.value = withTiming(1, { duration: 500 });
        contentProgress.value = withDelay(
            150,
            withTiming(1, { duration: 500 }),
        );
    }, [isActive, titleProgress, contentProgress]);

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleProgress.value,
        transform: [
            { translateY: interpolate(titleProgress.value, [0, 1], [16, 0]) },
        ],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentProgress.value,
        transform: [
            {
                translateY: interpolate(contentProgress.value, [0, 1], [16, 0]),
            },
        ],
    }));

    useEffect(() => {
        if (__DEV__) {
            setProfile({
                name: "John Doe",
            });
        }
    }, []);

    return (
        <ColView className="flex-1 gap-4" style={{ width }}>
            <Animated.View style={titleStyle} className="px-4 gap-4">
                <Text
                    accessibilityRole="header"
                    className="text-4xl font-semibold"
                >
                    Tell us about{"\n"}yourself
                </Text>
                <Text className="text-base text-muted-foreground leading-relaxed">
                    We'll use this to calculate your calories and distance,
                </Text>
            </Animated.View>

            <Animated.View style={contentStyle} className="px-4 gap-4">
                <ColView>
                    <Text>Name</Text>
                    <Card className="h-16 py-2">
                        <TextInput
                            placeholder="Enter your name"
                            value={profile?.name}
                            onChangeText={(v) =>
                                setProfile({ ...profile, name: v })
                            }
                            className="text-foreground"
                        />
                    </Card>
                </ColView>
            </Animated.View>
        </ColView>
    );
}
