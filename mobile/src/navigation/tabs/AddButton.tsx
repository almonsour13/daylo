import { Card } from "@/shared/components/ui/Card";
import { useSlideVisibility } from "@/shared/hooks/use-slide-visibility";
import { NavigationProp } from "@/shared/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Animated, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AddButton({ visible }: { visible: boolean }) {
    const nav = useNavigation<NavigationProp>();

    const { opacity, translateY } = useSlideVisibility(visible);
    const inset = useSafeAreaInsets();

    return (
        <Animated.View
            pointerEvents={visible ? "auto" : "none"}
            style={{
                position: "absolute",
                right: 16,
                bottom: inset.bottom + 76,
                opacity,
                transform: [{ translateY }],
            }}
        >
            <TouchableOpacity
                onPress={() => nav.navigate("ActivityFormScreen", {})}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Add activity"
            >
                <Card className="h-16 p-0 aspect-square justify-center items-center bg-primary border border-border/50">
                    <Ionicons name="add" size={32} className="text-white" />
                </Card>
            </TouchableOpacity>
        </Animated.View>
    );
}
