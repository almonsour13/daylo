import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { ACTIVITY_REAPEAT_DAYS } from "@/shared/constants/constant";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { Reapet_Days } from "@/shared/types/activity";
import { parseRepeat } from "@/shared/utils/activity";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { forwardRef, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    children?: React.ReactNode;
    onSuccess?: () => void;
}

const RepeatDaysDrawer = forwardRef<DrawerHandle, Props>(
    ({ children, onSuccess }, ref) => {
        const { activityForm, setActivityForm } = useActivityFormContext();
        const innerRef = useRef<DrawerHandle>(null);
        const repeatDays = parseRepeat(activityForm.repeatDays);

        const toggleDay = (day: Reapet_Days) => {
            const updatedRepeatDays = repeatDays.includes(day)
                ? repeatDays.filter((d) => d !== day)
                : [...repeatDays, day];
            setActivityForm({
                ...activityForm,
                repeatDays: JSON.stringify(updatedRepeatDays), // ✅ JSON string not .toString()
            });
        };
        const handleDone = () => {
            innerRef.current?.close();
            onSuccess?.();
        };
        const isValid = repeatDays.length > 0;

        return (
            <Drawer
                disableOpacity={true}
                ref={(node) => {
                    // ✅ sync both refs
                    innerRef.current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) ref.current = node;
                }}
                triggerButton={children}
            >
                <ColumnView>
                    <View className="">
                        {ACTIVITY_REAPEAT_DAYS.map((day) => {
                            const isSelected = repeatDays.includes(day);
                            return (
                                <TouchableOpacity
                                    key={day}
                                    className={clsx(
                                        "p-4 px-8 rounded-md flex-row justify-between items-center",
                                        isSelected ? "bg-gray-100" : "",
                                    )}
                                    onPress={() => toggleDay(day)}
                                >
                                    <Text className="text-lg font-semibold tracking-wide">
                                        {day}
                                    </Text>
                                    <Feather
                                        name={
                                            isSelected
                                                ? "check-circle"
                                                : "circle"
                                        }
                                        size={20}
                                    />
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <RowView className="px-4 pb-4">
                        <TouchableOpacity
                            className="flex-1 h-16 rounded-full justify-center items-center bg-gray-100"
                            onPress={() => {
                                setActivityForm({
                                    ...activityForm,
                                    repeatDays: "",
                                });
                                innerRef.current?.close();
                            }}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={clsx(
                                "flex-1 h-16 rounded-full justify-center items-center bg-black",
                                !isValid && "opacity-50",
                            )}
                            onPress={handleDone}
                            disabled={!isValid}
                        >
                            <Text className="text-white">Done</Text>
                        </TouchableOpacity>
                    </RowView>
                </ColumnView>
            </Drawer>
        );
    },
);

export default RepeatDaysDrawer;
