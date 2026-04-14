import { RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { ACTIVITY_CATEGORIES, CATEGORY } from "@/shared/constants/constant";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { capitalize } from "@/shared/utils/string";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
    children?: React.ReactNode;
}
export default function CategoryDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();
    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4">
                {ACTIVITY_CATEGORIES.map((category, index) => {
                    const isSelected = activityForm.category === category;
                    const cat = CATEGORY[category];
                    return (
                        <TouchableOpacity
                            key={category}
                            className={clsx(
                                "p-4 px-8 rounded-md flex-row justify-between items-center",
                                isSelected ? "bg-gray-100" : "",
                            )}
                            onPress={() => {
                                setActivityForm({
                                    ...activityForm,
                                    category: category,
                                });
                                drawerRef.current?.close();
                            }}
                        >
                            <RowView className="gap-4 items-center">
                                <Feather
                                    name={cat.icon}
                                    size={20}
                                    className={clsx(cat.textColor)}
                                />
                                <Text className="text-lg font-semibold tracking-wide">
                                    {capitalize(category)}
                                </Text>
                            </RowView>
                            {isSelected && <Feather name="check" size={20} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Drawer>
    );
}
