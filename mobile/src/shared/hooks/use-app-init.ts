import {
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    useFonts,
} from "@expo-google-fonts/dm-sans";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

import { invalidateActivityData } from "@/features/activity/hooks/use-activity-mutation";
import { initDb } from "../db/init-db";
import { activityService } from "../services/activity.service";
import { notificationService } from "../services/notification.service";
import { profileService } from "../services/profile.service";
import { settingsService } from "../services/settings.service";
import { useProfileStore } from "../stores/use-profile.store";
import { useSettingsStore } from "../stores/use-settings-store";

export const useAppInit = () => {
    const queryClient = useQueryClient();
    const setProfile = useProfileStore((s) => s.setProfile);
    const setSettings = useSettingsStore((s) => s.setSettings);

    const [fontsLoaded, fontError] = useFonts({
        DMSans_400Regular,
        DMSans_500Medium,
        DMSans_600SemiBold,
        DMSans_700Bold,
    });

    const [isLoading, setIsLoading] = useState(true);
    const [dbReady, setDbReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let mounted = true;

        async function init() {
            try {
                await initDb();
                if (!mounted) return;
                setDbReady(true);

                const [profile, settings] = await Promise.all([
                    profileService.get(),
                    settingsService.get(),
                ]);

                if (!mounted) return;

                setProfile(profile);
                setSettings(settings);
            } catch (err) {
                if (!mounted) return;

                setError(
                    err instanceof Error
                        ? err
                        : new Error("Failed to initialize app data"),
                );
            } finally {
                if (mounted) setIsLoading(false);
            }
        }

        init();

        return () => {
            mounted = false;
        };
    }, []);
    useEffect(() => {
        if (!dbReady) return;

        const runMaintenance = async () => {
            try {
                await activityService.purgeExpiredDeleted();
                await invalidateActivityData(queryClient);
            } catch {}
            void notificationService.syncAllActivityNotifications();
        };

        void runMaintenance();

        const sub = AppState.addEventListener("change", (state) => {
            if (state === "active") void runMaintenance();
        });
        return () => sub.remove();
    }, [dbReady, queryClient]);

    const isReady = (fontsLoaded || !!fontError) && !isLoading;

    return { isReady, isLoading, error };
};
