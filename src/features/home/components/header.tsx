import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { useMemo } from "react";
import { Text, View } from "react-native";

const PHRASES = {
    Morning: [
        "Start strong, finish stronger.",
        "Your goals are waiting.",
        "Make today count.",
        "One task at a time.",
        "Build the day you want.",
    ],
    Afternoon: [
        "Keep the momentum going.",
        "You're halfway there.",
        "Stay focused, stay sharp.",
        "Push through — it's worth it.",
        "Every hour counts.",
    ],
    Evening: [
        "Finish what you started.",
        "One last push.",
        "End the day with intention.",
        "Almost there — stay consistent.",
        "Great days are built by nights like this.",
    ],
};

export default function Header() {
    const today = new Date();
    const hour = today.getHours();

    const greeting =
        hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

    // ✅ pick a random phrase based on time of day, stable per render
    const phrase = useMemo(() => {
        const list = PHRASES[greeting];
        return list[Math.floor(Math.random() * list.length)];
    }, [greeting]);

    return (
        <ColumnView className="px-4 pt-12">
            <RowView className="justify-between items-start">
                <View className="flex-col flex-1">
                    <Text className="text-2xl text-gray-500">
                        Good {greeting}, Monsour
                    </Text>
                    <Text className="text-5xl leading-normal">{phrase}</Text>
                </View>
                <View className="hidden opacity-0 h-12 aspect-square rounded-full bg-black justify-center items-center">
                    <Text className="text-xl text-white">M</Text>
                </View>
            </RowView>
        </ColumnView>
    );
}
