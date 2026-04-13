import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useRef } from "react";
import { View } from "react-native";
import { useAddActivityContext } from "../../context/add-activity-context";

interface Props {
    children?: React.ReactNode;
}
export default function StartTimeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { newActivity, setNewActivity } = useAddActivityContext();

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4"></View>
        </Drawer>
    );
}
