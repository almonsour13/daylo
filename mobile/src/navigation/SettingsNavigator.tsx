import ProfileEditScreen from "@/features/settings/screens/ProfleEditScreen";
import RecentlyDeletedScreen from "@/features/settings/screens/RecentlyDeleteScreen";
import SettingsScreen from "@/features/settings/screens/SettingsScreen";
import ThemeScreen from "@/features/settings/screens/ThemeScreen";
import SafeScreen from "@/shared/components/SafeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
export default function SettingsNavigator() {
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
                    name="SettingsScreen"
                    component={SettingsScreen}
                />

                <Stack.Screen name="ThemeScreen" component={ThemeScreen} />
                <Stack.Screen
                    name="ProfileEditScreen"
                    component={ProfileEditScreen}
                />
                <Stack.Screen
                    name="RecentlyDeletedScreen"
                    component={RecentlyDeletedScreen}
                />
            </Stack.Navigator>
        </SafeScreen>
    );
}
