import { ColumnView } from "@/shared/components/ui/custom-view";
import Input from "@/shared/components/ui/input";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import { useAddActivityContext } from "../context/add-activity-context";
import { Text } from "react-native";

export default function NameDescriptionInput() {
    const { newActivity, setNewActivity, error } = useAddActivityContext();

    return (
        <ColumnView className="gap-4">
            <Text>{error}</Text>
            <InputField>
                <Label>Name:</Label>
                <Input
                    placeholder="eg: Morning Walk"
                    value={newActivity.name}
                    onChangeText={(text) =>
                        setNewActivity({ ...newActivity, name: text })
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
                    value={newActivity.description}
                    onChangeText={(text) =>
                        setNewActivity({ ...newActivity, description: text })
                    }
                />
            </InputField>
        </ColumnView>
    );
}
