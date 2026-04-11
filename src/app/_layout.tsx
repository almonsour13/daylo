import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "react-native-reanimated";

import { notificationService } from "@/services/notifications/notification-service";
import {
    registerNotificationHandlers,
    handleInitialNotification,
} from "@/services/notifications/notification-service-handlers";
import * as backgroundService from "@/services/background/task-manager";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme("light");

        const bootstrap = async () => {
            await notificationService.setupAndroidChannel();
            await notificationService.requestPermissions();
            await handleInitialNotification();
            await backgroundService.registerBackgroundTasks();
        };
        bootstrap();

        const cleanup = registerNotificationHandlers();
        return cleanup;
    }, []);

    return (
        <>
            <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
