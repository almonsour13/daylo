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
export default function DateDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { newActivity, setNewActivity } = useAddActivityContext();

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4"></View>
        </Drawer>
    );
}
