import { ColumnView } from "@/shared/components/ui/custom-view";
import { ScrollView, Text } from "react-native";
import ActivityList from "./components/activity-list";

export default function ActivityScreen() {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <ColumnView className="pb-40 flex-1 gap-4">
                <ColumnView className="px-4 pt-12 gap-1">
                    <Text className="text-4xl">Your </Text>
                    <Text className="text-7xl">Activities</Text>
                </ColumnView>
                <ActivityList />
            </ColumnView>
        </ScrollView>
    );
}
