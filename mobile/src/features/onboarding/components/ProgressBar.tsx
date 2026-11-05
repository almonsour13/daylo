import { RowView } from "@/shared/components/ui/CustomView";
import { useEffect, useRef } from "react";
import {
    Animated,
    View
} from "react-native";

export default function ProgressBar({
    total,
    index,
}: {
    total: number;
    index: number;
}) {
    const vals = useRef(
        Array.from(
            { length: total },
            (_, i) => new Animated.Value(i <= index ? 1 : 0),
        ),
    ).current;

    useEffect(() => {
        Animated.parallel(
            vals.map((v, i) =>
                Animated.timing(v, {
                    toValue: i <= index ? 1 : 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ),
        ).start();
    }, [index, vals]);

    return (
        <RowView className="pt-12 px-4 gap-1.5">
            {vals.map((v, i) => (
                <View key={i} className="flex-1 h-1 rounded-full bg-muted">
                    <Animated.View
                        className="h-1 rounded-full bg-primary"
                        style={{
                            width: v.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0%", "100%"],
                            }),
                        }}
                    />
                </View>
            ))}
        </RowView>
    );
}
