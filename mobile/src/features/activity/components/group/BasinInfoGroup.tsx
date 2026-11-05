import { ColView } from "@/shared/components/ui/CustomView";
import { Activity } from "@/shared/types/type";
import Field from "../../../../shared/components/ui/Field";
import FormField from "../../../../shared/components/ui/FormField";

export default function BasicInfoGroup({
    form,
    update,
}: {
    form: Activity;
    update: (f: Partial<Activity>) => void;
}) {
    return (
        <ColView className="gap-4">
            <FormField label="Title">
                <Field
                    type="input"
                    value={form.name}
                    placeholder="eg: Morning Run"
                    onChangeText={(name) => update({ name })}
                />
            </FormField>
            <FormField label="Description">
                <Field
                    type="input"
                    value={form.description ?? ""}
                    placeholder="eg: 30 min jog at the park"
                    onChangeText={(description) => update({ description })}
                />
            </FormField>
        </ColView>
    );
}
