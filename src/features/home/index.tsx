import { ColumnView } from "@/shared/components/ui/custom-view";
import * as BackgroundTask from "expo-background-task";
import { ScrollView } from "react-native";
import Header from "./components/header";
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
                {/* <Calendar /> */}
                {/* <WeekDaysProgress />
                <TodayActivities /> */}
            </ColumnView>
        </ScrollView>
    );
}
