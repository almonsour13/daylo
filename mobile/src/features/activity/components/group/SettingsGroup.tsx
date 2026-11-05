import { ColView, RowView } from "@/shared/components/ui/CustomView";
import { Activity } from "@/shared/types/type";
import { Switch } from "react-native";
import FormField from "../../../../shared/components/ui/FormField";

export default function SettingsGroup({
    form,
    update,
}: {
    form: Activity;
    update: (f: Partial<Activity>) => void;
}) {
    return (
        <ColView className="gap-2">
            <RowView className="justify-between items-center">
                <FormField label="Get Notified" />
                <Switch
                    value={form.notificationEnabled}
                    onValueChange={(val) =>
                        update({ notificationEnabled: val })
                    }
                />
            </RowView>
            <RowView className="justify-between items-center">
                <FormField label="Active" />
                <Switch
                    value={form.status === "active"}
                    onValueChange={(val) =>
                        update({ status: val ? "active" : "inactive" })
                    }
                />
            </RowView>
        </ColView>
    );
}
