import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { useRef } from "react";
import { View } from "react-native";

interface Props {
    children?: React.ReactNode;
}
export default function EndTimeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="pb-4"></View>
        </Drawer>
    );
}
