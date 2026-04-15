import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { ACTIVITY_PRIORITY } from "@/shared/constants/constant";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { capitalize } from "@/shared/utils/string";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    children?: React.ReactNode;
}
export default function PriorityDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="py-4">
                {ACTIVITY_PRIORITY.map((priority, index) => {
                    const isSelected = activityForm.priority === priority;
                    return (
                        <TouchableOpacity
                            key={priority}
                            className={clsx(
                                "p-4 px-8 rounded-md flex-row justify-between items-center",
                                isSelected ? "bg-gray-100" : "",
                            )}
                            onPress={() => {
                                setActivityForm({
                                    ...activityForm,
                                    priority: priority,
                                });
                                drawerRef.current?.close();
                            }}
                        >
                            <Text className="text-lg font-semibold tracking-wide">
                                {capitalize(priority)}
                            </Text>
                            {isSelected && <Feather name="check" size={20} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Drawer>
    );
}
