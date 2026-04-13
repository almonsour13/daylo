import { ColumnView, RowView } from "@/shared/components/ui/custom-view";
import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { WEEK_DAYS } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import { Text, View } from "react-native";

interface Props {
    children?: React.ReactNode;
}
export default function WeekDayOptionDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4">
                {WEEK_DAYS.map((item) => {
                    return (
                        <RowView
                            key={item}
                            className="p-4 px-8 bg-red-200 rounded-md justify-between items-center"
                        >
                            <Text className="text-lg font-semibold tracking-wide">
                                {item}
                            </Text>
                            <Feather name="check" size={20} />
                        </RowView>
                    );
                })}
            </View>
        </Drawer>
    );
}
