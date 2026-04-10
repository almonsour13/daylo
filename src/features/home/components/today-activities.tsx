import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { activitiesData } from "@/shared/constants/data";
import { Text } from "react-native";
import ActivityCard from "./activity-card";

export default function TodayActivities() {
    const todayActivities = activitiesData();

    return (
        <ColumnView className="px-4">
            <RowView className="">
                <Text className="text-base font-semibold tracking-wide">
                    Today Activities
                </Text>
            </RowView>
            <ColumnView>
                {todayActivities.map((activity, i) => (
                    <ActivityCard key={i} activity={activity} />
                ))}
            </ColumnView>
        </ColumnView>
    );
}
