import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { CATEGORY, PRIORITY } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAddActivityContext } from "../../context/add-activity-context";
import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
}
export default function CategoryDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4">
                {Object.values(CATEGORY).map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={item.label}
                            className={clsx(
                                "p-4 px-8 rounded-md flex-row justify-between items-center",
                                // item.color,
                            )}
                        >
                            <RowView className="gap-4 items-center">
                                <Feather
                                    name={item.icon}
                                    size={20}
                                    className={clsx(
                                        item.color.replace("bg", "text"),
                                    )}
                                />
                                <Text className="text-lg font-semibold tracking-wide">
                                    {item.label}
                                </Text>
                            </RowView>
                            <Feather name="check" size={20} />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Drawer>
    );
}
