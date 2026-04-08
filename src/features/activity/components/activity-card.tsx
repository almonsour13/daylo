import { Activity } from "@/shared/types/activity";
import { Text, View } from "react-native";

export default function ActivityCard({ activity }: { activity: Activity }) {
    return (
        <View className="p-4 bg-red-200">
            <Text className="text-2xl">{activity.name}</Text>
        </View>
    );
}
