import { ActivityProvider } from "@/features/activity/context/activity-context";
import BottomNavBar from "@/shared/components/layout/bottom-nav-bar";
import { AppProvider } from "@/shared/context/app-context";
import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <AppProvider>
            <ActivityProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: "none",
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="activity" />
                    <Stack.Screen
                        name="activity/[activityId]"
                        options={{
                            presentation: "card",
                            animation: "slide_from_right",
                        }}
                    />
                    <Stack.Screen
                        name="activity/add" // ✅ no leading slash
                        options={{
                            presentation: "modal",
                            animation: "slide_from_bottom",
                            animationDuration: 500,
                        }}
                    />
                    <Stack.Screen
                        name="activity/edit/[activityId]" // ✅ no leading slash
                        options={{
                            presentation: "modal",
                            animation: "slide_from_bottom",
                            animationDuration: 500,
                        }}
                    />
                </Stack>
                <BottomNavBar />
            </ActivityProvider>
        </AppProvider>
    );
}
