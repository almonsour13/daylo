import { invalidateActivityData } from "@/features/activity/hooks/use-activity-mutation";
import { useOnboardingContext } from "@/shared/context/OnboardingContext";
import { activityService } from "@/shared/services/activity.service";
import { notificationService } from "@/shared/services/notification.service";
import { StorageService } from "@/shared/services/storage.service";
import { NavigationProp } from "@/shared/types/navigation";
import { useNavigation } from "@react-navigation/native";
import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { Alert } from "react-native";
import { SettingsItem } from "../../../type";
import SettingsSectionList from "../SettingsSectionList";

export default function DataSection() {
    const navigation = useNavigation<NavigationProp>();
    const queryClient = useQueryClient();
    const [isBusy, setIsBusy] = useState(false);
    const { setIsOnboarded } = useOnboardingContext();

    const { data: deleted } = useQuery({
        queryKey: ["activities", { status: "deleted" }],
        queryFn: () => activityService.get({ status: "deleted" }),
        placeholderData: keepPreviousData,
    });
    const deletedCount = deleted?.length ?? 0;

    const run = async (failTitle: string, action: () => Promise<void>) => {
        if (isBusy) return;
        setIsBusy(true);
        try {
            await action();
        } catch (e) {
            console.error(`[Data] ${failTitle}`, e);
            Alert.alert(failTitle, "Please try again.");
        } finally {
            setIsBusy(false);
        }
    };

    /** After any seed change: reschedule reminders and refresh every screen. */
    const afterSeedChange = async () => {
        await notificationService.syncAllActivityNotifications();
        await invalidateActivityData(queryClient);
    };

    // Dev tools. Dynamic import keeps the seed code out of the normal path.
    const loadSampleData = () =>
        run("Couldn't load sample data", async () => {
            if (!__DEV__) return;
            const { seedActivities } = await import("@/shared/db/seed");
            await seedActivities(); // replaces earlier seed rows, never touches yours
            await afterSeedChange();
        });

    const removeSampleData = () =>
        run("Couldn't remove sample data", async () => {
            if (!__DEV__) return;
            const { removeSeedActivities } = await import("@/shared/db/seed");
            await removeSeedActivities();
            await afterSeedChange();
        });

    const clearActivityData = () => {
        Alert.alert(
            "Clear activity data?",
            "This permanently deletes all activities, including Recently Deleted, and cancels their reminders. Your profile and settings are kept. This can't be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear",
                    style: "destructive",
                    onPress: () =>
                        run("Couldn't clear data", async () => {
                            await notificationService.cancelAllScheduleActivityNotifications();
                            await activityService.reset();
                            await invalidateActivityData(queryClient);
                        }),
                },
            ],
        );
    };

    const resetAllData = () => {
        Alert.alert(
            "Reset all data?",
            "This permanently deletes all activities, including Recently Deleted, and resets your settings. This can't be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Reset",
                    style: "destructive",
                    onPress: () =>
                        run("Reset failed", async () => {
                            await notificationService.cancelAllScheduleActivityNotifications();
                            await activityService.reset();
                            await StorageService.resetAll();
                            // clear() drops cached data without refetching it
                            queryClient.clear();
                            setIsOnboarded(false);
                        }),
                },
            ],
        );
    };

    const items: SettingsItem[] = [
        {
            id: "recent",
            label: "Recently Deleted",
            description: "Restore or permanently remove activities",
            icon: "trash",
            value: deletedCount > 0 ? String(deletedCount) : undefined,
            onPress: () =>
                navigation.navigate("Settings", {
                    screen: "RecentlyDeletedScreen",
                }),
        },
        {
            id: "seed-sample",
            label: "Load sample data",
            description: "Development only. Adds a fixed set of activities",
            icon: "flask",
            visible: __DEV__,
            disabled: isBusy,
            onPress: loadSampleData,
        },
        {
            id: "seed-remove",
            label: "Remove sample data",
            description: "Development only. Deletes only seeded activities",
            icon: "remove-circle",
            visible: __DEV__,
            disabled: isBusy,
            onPress: removeSampleData,
        },
        {
            id: "clear-activities",
            label: "Clear activity data",
            description: "Permanently delete all activities",
            icon: "close-circle",
            danger: true,
            disabled: isBusy,
            onPress: clearActivityData,
        },
        {
            id: "reset",
            label: "Reset all data",
            description: "Delete all activities and settings",
            icon: "refresh",
            danger: true,
            disabled: isBusy,
            onPress: resetAllData,
        },
    ];

    return <SettingsSectionList sections={[{ title: "Data", items }]} />;
}
