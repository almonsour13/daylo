import { ColumnView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";

export default function Header() {
    return (
        <ColumnView className="px-4 pt-12">
            <View className="flex-col gap-2">
                <Text className="text-2xl">Manage your </Text>
                <Text className="text-6xl">Activities</Text>
            </View>
        </ColumnView>
    );
}
