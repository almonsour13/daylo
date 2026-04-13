import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import Feather from "@expo/vector-icons/Feather";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RepeatDaysDrawer from "./repeat-days-drawer";
import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
}

export default function RepeatTypeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const repeatDaysDrawerRef = useRef<DrawerHandle>(null);
    const [selected, setSelected] = useState<string>("Once");

    const repeatType = ["Once", "Daily", "Weekly", "Custom"];

    const handleSelect = (item: string) => {
        if (item === "Custom") {
            setTimeout(() => {
                repeatDaysDrawerRef.current?.open(); // slight delay lets first drawer close cleanly
            }, 300);
        } else {
            setSelected(item);
            drawerRef.current?.close();
        }
    };

    return (
        <>
            <Drawer ref={drawerRef} triggerButton={children}>
                <View className="pb-4">
                    {repeatType.map((item) => {
                        const isSelected = selected === item;
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
                                    {item}
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
                    setSelected("Custom");
                }}
                ref={repeatDaysDrawerRef}
            />
        </>
    );
}
