import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import { activitiesData } from "@/shared/constants/data";
import { Text } from "react-native";
import ActivityCard from "./activity-card";

export default function TodayActivities() {
    const todayActivities = activitiesData();

    return (
        <ColumnView className="">
            <RowView className="px-4">
                <Text className="text-2xl leading-normal tracking-wide">
                    Your Have{" "}
                    <Text className="font-semibold">{`(${todayActivities.length})`}</Text>{" "}
                    Activities Today
                </Text>
            </RowView>
            <ColumnView className="px-4">
                {todayActivities.map((activity, i) => (
                    <ActivityCard key={i} activity={activity} />
                ))}
            </ColumnView>
        </ColumnView>
    );
}
