import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import { ColView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import Calendar from "../components/Calendar";
import DayActivityList from "../components/DayActivityList";

export default function CalendarScreen() {
    const { invalidate } = useActivityMutations();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(() => new Date());
    const [selectedDate, setSelectedDate] = useState(() => new Date());

    const refresh = async () => {
        setIsRefreshing(true);
        try {
            await invalidate();
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refresh}
                    />
                }
            >
                <ColView className="flex-1 gap-4 pb-54">
                    <ColView className="p-4 pb-0 gap-0">
                        <Text className="capitalize text-xl text-muted-foreground">
                            Calendar
                        </Text>
                        <Text className="capitalize text-2xl text-foreground">
                            Manage your upcoming activities.
                        </Text>
                    </ColView>
                    <Calendar
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        currentMonth={currentMonth}
                        setCurrentMonth={setCurrentMonth}
                    />
                    <DayActivityList selectedDate={selectedDate} />
                </ColView>
            </ScrollView>
        </>
    );
}
