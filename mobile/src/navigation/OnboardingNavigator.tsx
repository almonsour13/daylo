import OnboardingIntroScreen from "@/features/onboarding/screens/OnboardingIntroScreen";
import OnboardingStepsScreen from "@/features/onboarding/screens/OnboardingStepsScreen";
import SafeScreen from "@/shared/components/SafeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function OnboardingNavigator() {
    return (
        <SafeScreen>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: "transparent",
                    },
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen
                    name="OnboardingIntroScreen"
                    component={OnboardingIntroScreen}
                />
                <Stack.Screen
                    name="OnboardingStepsScreen"
                    component={OnboardingStepsScreen}
                />
            </Stack.Navigator>
        </SafeScreen>
    );
}
