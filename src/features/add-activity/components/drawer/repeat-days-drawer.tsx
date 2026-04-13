import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { WEEK_DAYS } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    children?: React.ReactNode;
    onSuccess?: () => void;
}

const RepeatDaysDrawer = forwardRef<DrawerHandle, Props>(
    ({ children, onSuccess }, ref) => {
        const [selectedDays, setSelectedDays] = useState<string[]>([]);
        const innerRef = useRef<DrawerHandle>(null);

        const toggleDay = (day: string) => {
            setSelectedDays((prev) =>
                prev.includes(day)
                    ? prev.filter((d) => d !== day)
                    : [...prev, day],
            );
        };

        const handleDone = () => {
            innerRef.current?.close();
            onSuccess?.();
        };

        return (
            <Drawer
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
                        {WEEK_DAYS.map((day) => {
                            const isSelected = selectedDays.includes(day);
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
                                innerRef.current?.close();
                            }}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 h-16 rounded-full justify-center items-center bg-black"
                            onPress={handleDone}
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
