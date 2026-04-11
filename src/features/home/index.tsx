import { ColumnView } from "@/shared/components/ui/custom-view";
import { Button, ScrollView } from "react-native";
import Header from "./components/header";
import TodayActivities from "./components/today-activities";
import WeekDaysProgress from "./components/week-day-progress";
import { notificationService } from "@/services/notifications/notification-service";

export default function HomeScreen() {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >
            <ColumnView className="pb-40 gap-8">
                {/* <Button
                    title="Send Notification"
                    onPress={() => notificationService.sampleNotification()}
                /> */}
                <Header />
                <WeekDaysProgress />
                <TodayActivities />
            </ColumnView>
        </ScrollView>
    );
}
