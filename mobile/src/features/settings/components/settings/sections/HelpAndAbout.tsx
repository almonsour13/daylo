import { STORAGE_KEYS } from "@/shared/constants/constant";
import { useOnboardingContext } from "@/shared/context/OnboardingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Alert } from "react-native";
import { SettingsItem } from "../../../type";
import SettingsSectionList from "../SettingsSectionList";

export default function HelpSection() {
    const { setIsOnboarded } = useOnboardingContext();

    const replayOnboarding = () =>
        Alert.alert(
            "Replay onboarding?",
            "Your activities and settings are kept.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Replay",
                    onPress: async () => {
                        setIsOnboarded(false);
                        await AsyncStorage.removeItem(STORAGE_KEYS.welcome);
                    },
                },
            ],
        );

    const troubleshooting = () =>
        Alert.alert(
            "Not getting reminders?",
            [
                "1. Reminders must be on in Settings.",
                "2. The activity's own notification switch must be on.",
                "3. Notifications must be allowed in your phone's settings.",
                "4. Some Android phones stop background apps. Disable battery optimization for this app.",
                "5. Tap Rebuild reminders, then Send test notification.",
            ].join("\n\n"),
        );

    const dataInfo = () =>
        Alert.alert(
            "Where is my data?",
            "Your activities and settings are stored on this device only. Uninstalling the app deletes them, so export a copy first.",
        );

    const items: SettingsItem[] = [
        {
            id: "troubleshooting",
            label: "Not getting reminders?",
            description: "Step-by-step checks",
            icon: "help-circle",
            onPress: troubleshooting,
        },
        {
            id: "data-info",
            label: "Where is my data?",
            icon: "phone-portrait",
            onPress: dataInfo,
        },
        {
            id: "onboarding",
            label: "Replay onboarding",
            icon: "play-circle",
            onPress: replayOnboarding,
            visible: __DEV__,
        },
        {
            id: "version",
            label: "Version",
            icon: "information-circle",
            value: Constants.expoConfig?.version ?? "1.0.0",
            readOnly: true,
        },
    ];

    return (
        <SettingsSectionList sections={[{ title: "Help & About", items }]} />
    );
}
