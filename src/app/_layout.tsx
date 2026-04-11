import "@/global.css";
import "@/services/notifications/notification-service";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "react-native-reanimated";
import { notificationService } from "@/services/notifications/notification-service";
("@/services/notifications/notification-service");

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();

    useEffect(() => {
        notificationService.requestPermissions();
        setColorScheme("light");
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
