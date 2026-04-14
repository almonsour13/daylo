import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { ColumnView } from "../../ui/custom-view";
import TimeSelector from "../../ui/time/time";

interface Props {
    children?: React.ReactNode;
}
export default function StartTimeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();

    // useEffect(() => {
    //     drawerRef.current?.open();
    // }, []);
    return (
        <Drawer
            // disableTrigger={activityForm.date === ""}
            ref={drawerRef}
            triggerButton={children}
        >
            <View className="pb-4">
                <ColumnView>
                    <TimeSelector
                        type="start"
                        defaultTime={activityForm.startTime}
                    />
                </ColumnView>
            </View>
        </Drawer>
    );
}
