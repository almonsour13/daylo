import { RowView } from "@/shared/components/ui/custom-view";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Header() {
    const router = useRouter();
    const onBack = () => {
        router.back();
    };
    return (
        <RowView className="p-4 justify-between items-center">
            <Text className="text-2xl font-semibold">New Activity</Text>
            <TouchableOpacity className="items-center" onPress={onBack}>
                <Feather name="x" size={28} />
            </TouchableOpacity>
        </RowView>
    );
}
