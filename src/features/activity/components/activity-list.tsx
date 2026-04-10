import { ColumnView } from "@/shared/components/ui/custom-view";
import { Text, View } from "react-native";
import { useActivities } from "../hooks/use-activities";
import ActivityCard from "./activity-card";

export default function ActivityList() {
    const { activities, isActivitiesLoading, activitiesError } =
        useActivities();

    return (
        <ColumnView className="px-4 gap-2">
            {/* <RowView className="justify-between items-center">
                <Text className="text-base font-semibold">
                    {activities.length}{" "}
                    {activities.length > 1 ? "Activities" : "Activity"}
                </Text>
                <RowView className="items-center">
                    <Text className="text-base font-semibold">All</Text>
                    <Feather name="sliders" size={14} color="" />
                </RowView>
            </RowView> */}
            {isActivitiesLoading ? (
                <View>
                    <Text>Loading...</Text>
                </View>
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
