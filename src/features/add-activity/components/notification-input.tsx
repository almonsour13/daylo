import { RowView } from "@/shared/components/ui/custom-view";
import Label from "@/shared/components/ui/label";
import Switch from "@/shared/components/ui/switch";
import { useAddActivityContext } from "../context/add-activity-context";

export default function NotificationInput() {
    const { activity, setActivity } = useAddActivityContext();
    const isNotificationEnabled = activity.notificationEnabled == 1;

    const onNotificationToggle = () => {
        setActivity({
            ...activity,
            notificationEnabled: isNotificationEnabled ? 0 : 1,
        });
    };

    return (
        <RowView className="justify-between items-center">
            <Label>Get Notified:</Label>
            <Switch
                value={isNotificationEnabled}
                onChange={onNotificationToggle}
            />
        </RowView>
    );
}
