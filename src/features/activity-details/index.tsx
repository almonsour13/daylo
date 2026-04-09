import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native";
import { useActivityDetails } from "./hooks/use-activity-details";

export default function ActivityDetailsScreen() {
    const router = useRouter();
    const { activityDetails, isActivityDetailsLoading, activityDetailsError } =
        useActivityDetails();

    return (
        <ScrollView>
            <ColumnView>
                <RowView className="p-4 justify-between items-center">
                    <TouchableOpacity
                        className="p-2 aspect-square rounded-full bg-black"
                        onPress={() => router.back()}
                    >
                        <Feather name="arrow-left" size={20} color="white" />
                    </TouchableOpacity>
                </RowView>
            </ColumnView>
        </ScrollView>
    );
}
