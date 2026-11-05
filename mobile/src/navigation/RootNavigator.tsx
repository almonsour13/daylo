import ActivityFormScreen from "@/features/activity/screens/ActivityFormScreen";
import SplashScreen from "@/screens/SplashScreen";
import ToastHost from "@/shared/components/ToastHost";
import { useOnboardingContext } from "@/shared/context/OnboardingContext";
import { useAppInit } from "@/shared/hooks/use-app-init";
import { useTheme } from "@/shared/hooks/use-theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableFreeze } from "react-native-screens";
import MainNavigator from "./MainNavigator";
import OnboardingNavigator from "./OnboardingNavigator";
import SettingsNavigator from "./SettingsNavigator";

enableFreeze(true);

const Stack = createNativeStackNavigator();

const BACKGROUND = { light: "#ffffff", dark: "#101010" };

export default function RootNavigator() {
    const { isOnboarded } = useOnboardingContext();
    const { isReady } = useAppInit();
    const theme = useTheme();

    if (!isReady) {
        return <SplashScreen />;
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        // Solid background: no transparent screens bleeding through
                        contentStyle: { backgroundColor: BACKGROUND[theme] },
                        animation: "slide_from_right",
                        animationDuration: 280,
                        freezeOnBlur: true,
                    }}
                >
                    {!isOnboarded ? (
                        <Stack.Screen
                            name="Onboarding"
                            component={OnboardingNavigator}
                            options={{
                                animation: "fade",
                                animationDuration: 250,
                            }}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name="Main"
                                component={MainNavigator}
                                options={{
                                    animation: "fade",
                                    animationDuration: 250,
                                }}
                            />
                            <Stack.Screen
                                name="ActivityFormScreen"
                                component={ActivityFormScreen}
                                options={{
                                    animation: "slide_from_bottom",
                                    animationDuration: 300,
                                    gestureEnabled: true,
                                }}
                            />
                            <Stack.Screen
                                name="Settings"
                                component={SettingsNavigator}
                                options={{ animation: "slide_from_right" }}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
            <ToastHost />
        </>
    );
}
