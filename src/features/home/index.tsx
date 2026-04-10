import { ColumnView } from "@/shared/components/ui/custom-view";
import { ScrollView } from "react-native";
import Header from "./components/header";
import TodayActivities from "./components/today-activities";
import WeekDaysProgress from "./components/week-day-progress";

export default function HomeScreen() {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <ColumnView className="pb-40 gap-8">
                <Header />
                <WeekDaysProgress />
                <TodayActivities />
            </ColumnView>
        </ScrollView>
    );
}
