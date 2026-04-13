import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import Switch from "@/shared/components/ui/switch";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { Text, View } from "react-native";

export default function SettingsGroup() {
    const { activityForm, setActivityForm } = useActivityFormContext();
    const isNotificationEnabled = activityForm.notificationEnabled == 1;
    const isEnabled = activityForm.status == "active";

    const onNotificationToggle = () => {
        setActivityForm({
            ...activityForm,
            notificationEnabled: isNotificationEnabled ? 2 : 1,
        });
    };

    const onEnableToggle = () => {
        setActivityForm({
            ...activityForm,
            status: isEnabled ? "inactive" : "active",
        });
    };

    return (
        <ColumnView>
            <Label>Settings</Label>
            <View className=" rounded-xl overflow-hidden bg-gray-100">
                <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                    <Text className="text-base font-medium">Get Notified</Text>
                    <Switch
                        value={isNotificationEnabled}
                        onChange={onNotificationToggle}
                    />
                </RowView>
                <RowView className="p-4 rounded-md justify-between items-center bg-gray-100">
                    <Text className="text-base font-medium">Enable</Text>
                    <Switch value={isEnabled} onChange={onEnableToggle} />
                </RowView>
            </View>
        </ColumnView>
    );
}
