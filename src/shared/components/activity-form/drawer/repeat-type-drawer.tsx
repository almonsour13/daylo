import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { ACTIVITY_REPEAT_TYPE } from "@/shared/constants/constant";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { Repeat_Type } from "@/shared/types/activity";
import { capitalize } from "@/shared/utils/string";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RepeatDaysDrawer from "./repeat-days-drawer";

interface Props {
    children?: React.ReactNode;
}

export default function RepeatTypeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const repeatDaysDrawerRef = useRef<DrawerHandle>(null);

    const { activityForm, setActivityForm } = useActivityFormContext();
    const handleSelect = (item: Repeat_Type) => {
        if (item === "custom") {
            setTimeout(() => {
                repeatDaysDrawerRef.current?.open(); // slight delay lets first drawer close cleanly
            }, 300);
        } else {
            setActivityForm({
                ...activityForm,
                repeatType: item,
                repeatDays: "",
            });
            drawerRef.current?.close();
        }
    };

    return (
        <>
            <Drawer ref={drawerRef} triggerButton={children}>
                <View className="py-4">
                    {ACTIVITY_REPEAT_TYPE.map((item) => {
                        const isSelected = activityForm.repeatType === item;
                        return (
                            <TouchableOpacity
                                key={item}
                                className={clsx(
                                    "p-4 px-8 rounded-md flex-row justify-between items-center",
                                    isSelected ? "bg-gray-100" : "",
                                )}
                                onPress={() => handleSelect(item)}
                            >
                                <Text className="text-lg font-semibold tracking-wide">
                                    {capitalize(item)}
                                </Text>
                                {isSelected && (
                                    <Feather name="check" size={20} />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Drawer>
            <RepeatDaysDrawer
                onSuccess={() => {
                    drawerRef.current?.close();
                    setActivityForm({
                        ...activityForm,
                        repeatType: "custom",
                    });
                }}
                ref={repeatDaysDrawerRef}
            />
        </>
    );
}
