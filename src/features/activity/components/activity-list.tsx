import { ActivitiesData } from "@/shared/constants/data";
import { Text, View } from "react-native";
import ActivityCard from "./activity-card";

export default function ActivityList() {
    const activity = ActivitiesData();
    return (
        <View className="p-4">
            <Text>{activity.name}</Text>
            <View className="flex-col gap-2">
                {Array.from({ length: 10 }).map((_, i) => (
                    <ActivityCard key={i} activity={activity} />
                ))}
            </View>
        </View>
    );
}
