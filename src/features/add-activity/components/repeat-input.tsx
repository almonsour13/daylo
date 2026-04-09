import { RowView } from "@/shared/components/ui/custom-view";
import InputField from "@/shared/components/ui/input-field";
import Label from "@/shared/components/ui/label";
import Switch from "@/shared/components/ui/switch";
import { WEEK_DAYS } from "@/shared/constants/constant";
import clsx from "clsx";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useAddActivityContext } from "../context/add-activity-context";

export default function RepeatInput() {
    const { activity, setActivity } = useAddActivityContext();
    const [isRepeatEnabled, setRepeatEnabled] = useState(false);
    const onSelect = (day: string) => {
        if (activity.repeat.includes(day)) {
            setActivity({
                ...activity,
                repeat: activity.repeat.filter((d) => d !== day),
            });
        } else {
            setActivity({
                ...activity,
                repeat: [...activity.repeat, day],
            });
        }
    };
    return (
        <InputField>
            <RowView className="justify-between items-center">
                <Label>Repeat:</Label>
                <Switch
                    value={isRepeatEnabled}
                    onChange={() => {
                        setRepeatEnabled(!isRepeatEnabled);
                        if (isRepeatEnabled) {
                            setActivity({ ...activity, repeat: [] });
                        }
                    }}
                />
            </RowView>
            <RowView className="justify-between items-center">
                {WEEK_DAYS.map((day) => (
                    <TouchableOpacity
                        key={day}
                        className={clsx(
                            "h-12 aspect-square rounded-full justify-center items-center",
                            !isRepeatEnabled && "opacity-50",
                            activity.repeat.includes(day)
                                ? "bg-black"
                                : "bg-white",
                        )}
                        onPress={() => onSelect(day)}
                        disabled={!isRepeatEnabled}
                    >
                        <Text
                            className={clsx(
                                "text-sm font-semibold",
                                activity.repeat.includes(day)
                                    ? "text-white"
                                    : "text-black",
                            )}
                        >
                            {day.charAt(0)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </RowView>
        </InputField>
    );
}
