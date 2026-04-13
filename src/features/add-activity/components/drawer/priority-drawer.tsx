import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { PRIORITY } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAddActivityContext } from "../../context/add-activity-context";
import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
}
export default function PriorityDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { newActivity, setNewActivity } = useAddActivityContext();

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4">
                {Object.values(PRIORITY).map((item, index) => {
                    const isSelected = newActivity.priority === index;
                    return (
                        <TouchableOpacity
                            key={item.label}
                            className={clsx(
                                "p-4 px-8 rounded-md flex-row justify-between items-center",
                                isSelected ? "bg-gray-100" : "",
                            )}
                            onPress={() => {
                                setNewActivity({
                                    ...newActivity,
                                    priority: index,
                                });
                                drawerRef.current?.close();
                            }}
                        >
                            <Text className="text-lg font-semibold tracking-wide">
                                {item.label}
                            </Text>
                            {isSelected && <Feather name="check" size={20} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Drawer>
    );
}
