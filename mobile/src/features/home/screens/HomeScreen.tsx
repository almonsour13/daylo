import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import { ColView } from "@/shared/components/ui/CustomView";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import ActivityList from "../components/ActivityList";
import Header from "../components/Header";
import WeekDays from "../components/WeekDays";

export default function HomeScreen() {
    const { invalidate } = useActivityMutations();
    const [isRefreshing, setIsRefreshing] = useState(false);

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
                    <Header />
                    <WeekDays />
                    <ActivityList />
                </ColView>
            </ScrollView>
        </>
    );
}
