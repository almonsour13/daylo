import "@/global.css";
import "@/services/background/tasks/minute-notification-task"; // side effect — must be first

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "react-native-reanimated";

import { notificationService } from "@/services/notifications/notification-service";
import { backgroundService } from "@/services/background/task-manager";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        setColorScheme("light");

        async function bootstrap() {
            try {
                await notificationService.requestPermissions();
                await backgroundService.start();
            } catch (e) {
                console.error("[RootLayout] Bootstrap failed:", e);
            }
        }
        bootstrap();
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
