import BottomNavBar from "@/shared/components/layout/bottom-nav-bar";
import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "none",
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="activity" />
            </Stack>
            <BottomNavBar />
        </>
    );
}
