import { ColumnView } from "@/shared/components/ui/custom-view";
import Input from "@/shared/components/ui/input";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import { useAddActivityContext } from "../context/add-activity-context";

export default function NameDescriptionInput() {
    const { activity, setActivity } = useAddActivityContext();

    return (
        <ColumnView className="gap-4">
            <InputField>
                <Label>Name:</Label>
                <Input
                    placeholder="eg: Morning Walk"
                    value={activity.name}
                    onChangeText={(text) =>
                        setActivity({ ...activity, name: text })
                    }
                />
            </InputField>
            <InputField>
                <Label>Deacription {"(Optional)"}:</Label>
                <Input
                    className="h-32 pt-2"
                    placeholder="eg: A short morning walk to start the day"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={activity.description}
                    onChangeText={(text) =>
                        setActivity({ ...activity, description: text })
                    }
                />
            </InputField>
        </ColumnView>
    );
}
