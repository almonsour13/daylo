import ActivityScreen from "@/features/activity/screens/ActivityScreen";
import CalendarScreen from "@/features/calendar/screens/CalendarScreen";
import HomeScreen from "@/features/home/screens/HomeScreen";
import WelcomeDrawer from "@/shared/components/drawer/WelcomeDrawer";
import SafeScreen from "@/shared/components/SafeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MainTabBar from "./tabs/MainTabBar";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    sceneStyle: { backgroundColor: "transparent" },
                    animation: "shift",
                    tabBarStyle: { position: "absolute" },
                }}
                screenLayout={({ children }) => (
                    <SafeScreen bottom={false} className="relative">
                        {children}
                    </SafeScreen>
                )}
                tabBar={(props) => <MainTabBar {...props} />}
            >
                <Tab.Screen name="HomeScreen" component={HomeScreen} />
                <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
                <Tab.Screen name="ActivityScreen" component={ActivityScreen} />
            </Tab.Navigator>
            <WelcomeDrawer />
        </>
    );
}
