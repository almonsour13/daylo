import { ColumnView } from "@/shared/components/ui/custom-view";
import { Button, ScrollView } from "react-native";
import Header from "./components/header";
import TodayActivities from "./components/today-activities";
import WeekDaysProgress from "./components/week-day-progress";
import { notificationService } from "@/services/notifications/notification-service";
import * as BackgroundTask from "expo-background-task";
export default function HomeScreen() {
    const triggerManualTask = async () => {
        console.log("Manually triggering background worker...");
        // This runs all registered tasks immediately in development mode
        await BackgroundTask.triggerTaskWorkerForTestingAsync();
    };

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <ColumnView className="pb-28 gap-8">
                <Header />
                <WeekDaysProgress />
                <TodayActivities />
            </ColumnView>
        </ScrollView>
    );
}
