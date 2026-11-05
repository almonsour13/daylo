import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { useProfileStore } from "@/shared/stores/use-profile.store";
import { NavigationProp } from "@/shared/types/navigation";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { ScrollView, TouchableOpacity } from "react-native";
import DataSection from "../components/settings/sections/Data";
import HelpSection from "../components/settings/sections/HelpAndAbout";
import Preferences from "../components/settings/sections/Preferences";
import SettingsSectionList from "../components/settings/SettingsSectionList";
import { SettingsSection } from "../type";

const version = Constants.expoConfig?.version;
export default function SettingsScreen() {
    const navigation = useNavigation<NavigationProp>();
    const profile = useProfileStore((s) => s.profile);

    const sections: SettingsSection[] = [
        {
            title: "Account",
            items: [
                {
                    id: "profile",
                    label: profile?.name || "Profile",
                    icon: "person",
                    value: "Edit",
                    onPress: () =>
                        navigation.navigate("Settings", {
                            screen: "ProfileEditScreen",
                        }),
                },
            ],
        },
    ];

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        >
            <ColView className="flex-1 gap-0">
                <RowView className="p-4 items-center gap-2">
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                    >
                        <Icon
                            name="arrow-back"
                            size={24}
                            className="text-foreground"
                        />
                    </TouchableOpacity>
                    <Text className="text-xl">Settings</Text>
                </RowView>

                <ColView>
                    <SettingsSectionList sections={sections} />
                    <Preferences />
                    <DataSection />
                    <HelpSection />
                </ColView>

                <RowView className="hidden items-center justify-center py-8 pb-4">
                    <Text className="text-xs text-muted-foreground">
                        Version {version}
                    </Text>
                </RowView>
            </ColView>
        </ScrollView>
    );
}
