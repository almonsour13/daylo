import { ColumnView } from "@/shared/components/ui/custom-view";
import { ScrollView } from "react-native";
import ActivityList from "./components/activity-list";
import Header from "./components/header";

export default function ActivityScreen() {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <ColumnView className="pb-40 gap-8">
                <Header />
                <ActivityList />
            </ColumnView>
        </ScrollView>
    );
}
