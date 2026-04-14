import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ColumnView, RowView } from "../../ui/custom-view";
import clsx from "clsx";
import TimeSelector from "../../ui/time/time";

interface Props {
    children?: React.ReactNode;
}
export default function TimeRangeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();
    const [selectedType, setSelectedType] = useState<"start" | "end">("start");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    useEffect(() => {
        drawerRef.current?.open();
    }, []);

    return (
        <Drawer
            // disableTrigger={activityForm.startTime === ""}
            ref={drawerRef}
            triggerButton={children}
        >
            <View className="pb-4">
                <ColumnView>
                    <RowView className="px-4">
                        <TouchableOpacity
                            className={clsx(
                                "h-12 rounded-xl flex-1 justify-center items-center",
                                selectedType === "start"
                                    ? "bg-black"
                                    : "bg-gray-100",
                            )}
                            onPress={() => setSelectedType("start")}
                        >
                            <Text
                                className={clsx(
                                    selectedType === "start" && "text-white",
                                )}
                            >
                                Start Time
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={clsx(
                                "h-12 rounded-xl flex-1 justify-center items-center",
                                selectedType === "end"
                                    ? "bg-black"
                                    : "bg-gray-100",
                            )}
                            onPress={() => setSelectedType("end")}
                        >
                            <Text
                                className={clsx(
                                    selectedType === "end" && "text-white",
                                )}
                            >
                                End Time
                            </Text>
                        </TouchableOpacity>
                    </RowView>
                    <View className="px-4">
                        {selectedType === "start" && (
                            <View className="bg-gray-100 p-4 rounded-xl">
                                <TimeSelector
                                    type="start"
                                    defaultTime={startTime}
                                />
                            </View>
                        )}
                    </View>
                </ColumnView>
            </View>
        </Drawer>
    );
}
