import { ColumnView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";

export default function Header() {
    return (
        <ColumnView className="px-4 pt-12">
            <View className="flex-1 flex-col gap-1">
                <Text className="text-2xl">Your </Text>
                <Text className="text-5xl">Activities</Text>
            </View>
        </ColumnView>
    );
}
