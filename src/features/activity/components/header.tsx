import { ColumnView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";
import { useActivityContext } from "../context/activity-context";

export default function Header() {
    const { activities } = useActivityContext();
    return (
        <ColumnView className="px-4 pt-12">
            <View className="flex-col">
                <Text className="text-2xl text-gray-500">Manage your </Text>
                <Text className="text-6xl leading-normal text-neutral-900">
                    Activities {`(${activities.length})`}
                </Text>
            </View>
        </ColumnView>
    );
}
