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
                <Stack.Screen
                    name="[activityId]"
                    options={{
                        presentation: "card",
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen name="addActivity" />
            </Stack>
            <BottomNavBar />
        </>
    );
}
