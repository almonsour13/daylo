import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import Switch from "@/shared/components/ui/switch";
import { Text, View } from "react-native";
import { useAddActivityContext } from "../context/add-activity-context";

export default function SettingsGroup() {
    const { newActivity, setNewActivity } = useAddActivityContext();
    const isNotificationEnabled = newActivity.notificationEnabled == 1;
    const isEnabled = newActivity.status == 1;

    const onNotificationToggle = () => {
        setNewActivity({
            ...newActivity,
            notificationEnabled: isNotificationEnabled ? 2 : 1,
        });
    };

    const onEnableToggle = () => {
        setNewActivity({
            ...newActivity,
            status: isEnabled ? 2 : 1,
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
