import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";
export default function Header() {
    const today = new Date();
    const hour = today.getHours();

    const greeting =
        hour < 12 ? "Morning" : hour < 17 ? "Afternoon" : "Evening";

    return (
        <ColumnView className="px-4 pt-12">
            <RowView className="justify-between">
                <View className="flex-col gap-2">
                    <Text className="text-2xl">Good {greeting}</Text>
                    <Text className="text-6xl">Monsour</Text>
                </View>
                <View className="hidden h-12 aspect-square rounded-full bg-white justify-center items-center">
                    <Text className="text-xl">M</Text>
                </View>
            </RowView>
        </ColumnView>
    );
}
