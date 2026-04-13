import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";
import { useActivities } from "../hooks/use-activities";
import ActivityCard from "./activity-card";
import { useActivityContext } from "../context/activity-context";
import Feather from "@expo/vector-icons/Feather";
import Badge from "@/shared/components/ui/badge";

export default function ActivityList() {
    const { activities, isActivitiesLoading, activitiesError } =
        useActivityContext();
    return (
        <ColumnView className="px-4">
            <RowView className="hidden px-4 justify-between items-center">
                <Text className="text-2xl tracking-wide">
                    {activities.length}{" "}
                    {activities.length > 1 ? "Activities" : "Activity"}
                </Text>
                <RowView className="hidden items-center">
                    <Badge className="px-3 bg-white">
                        <Text className="text-sm tracking-wide">All</Text>
                        <Feather name="sliders" size={14} color="" />
                    </Badge>
                </RowView>
            </RowView>
            {isActivitiesLoading ? (
                <ColumnView className="items-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <View
                            key={i}
                            className="h-64 w-full  rounded-4xl bg-white animate-pulse"
                        />
                    ))}
                </ColumnView>
            ) : activities.length > 0 ? (
                activities.map((activity, i) => (
                    <ActivityCard key={i} activity={activity} />
                ))
            ) : (
                <Text>No activities found</Text>
            )}
        </ColumnView>
    );
}
