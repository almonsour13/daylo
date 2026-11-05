import { NativeStackNavigationProp } from "@react-navigation/native-stack";
export type RootStackParamList = {
    Main: {
        screen?: "HomeScreen" | "CalendarScreen" | "ActivityScreen";
    };
    ActivityFormScreen:
        | {
              activityId?: string;
              date?: string;
          }
        | undefined;
    Onboarding: {
        screen?: "OnboardingIntroScreen" | "OnboardingStepsScreen";
    };
    Settings: {
        screen?: "ProfileEditScreen" | "ThemeScreen" | "RecentlyDeletedScreen";
    };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
