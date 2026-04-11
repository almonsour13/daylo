import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { activitiesData } from "@/shared/constants/data";
import { Text } from "react-native";
import ActivityCard from "./activity-card";

export default function TodayActivities() {
    const todayActivities = activitiesData();

    return (
        <ColumnView className="">
            <RowView className="px-4">
                <Text className="text-2xl tracking-wide">Today Activities</Text>
            </RowView>
            <ColumnView className="px-2">
                {todayActivities.map((activity, i) => (
                    <ActivityCard key={i} activity={activity} />
                ))}
            </ColumnView>
        </ColumnView>
    );
}
