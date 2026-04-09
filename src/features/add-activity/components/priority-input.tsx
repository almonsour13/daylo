import { RowView } from "@/shared/components/ui/custom-view";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import { PRIORITY } from "@/shared/constants/constant";
import clsx from "clsx";
import { Text, TouchableOpacity } from "react-native";
import { useAddActivityContext } from "../context/add-activity-context";

export default function PriorityInput() {
    const { activity, setActivity } = useAddActivityContext();

    return (
        <InputField>
            <Label>Priority:</Label>
            <RowView className="gap-1 items-center">
                {Object.values(PRIORITY).map((priority, i) => (
                    <TouchableOpacity
                        key={priority.label}
                        className={clsx(
                            "relative h-12 rounded-md flex-1 justify-center items-center",
                            PRIORITY[i].color,
                            activity.priority == i
                                ? "opacity-100"
                                : "opacity-50",
                        )}
                        onPress={() =>
                            setActivity({ ...activity, priority: i })
                        }
                    >
                        <Text
                            className={clsx(
                                "text-sm font-semibold",
                                // activity.priority == i
                                //     ? "text-white"
                                //     : "text-black",
                            )}
                        >
                            {priority.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </RowView>
        </InputField>
    );
}
