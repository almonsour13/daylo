import Drawer, { DrawerHandle } from "@/shared/components/ui/drawer";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ColumnView, RowView } from "../../ui/custom-view";
import clsx from "clsx";
import TimeSelector from "../../ui/time/time";
import { toDateTime } from "@/shared/utils/time";
import { format } from "date-fns";

interface Props {
    children?: React.ReactNode;
}

export default function TimeRangeDrawer({ children }: Props) {
    const drawerRef = useRef<DrawerHandle>(null);
    const { activityForm, setActivityForm } = useActivityFormContext();
    const [selectedType, setSelectedType] = useState<"start" | "end">("start");

    useEffect(() => {
        // drawerRef.current?.open();
    }, []);

    const safeDate = (time: string) => {
        if (!time) return null;
        const d = toDateTime(activityForm.date, time);
        return isNaN(d.getTime()) ? null : d;
    };

    const start = safeDate(activityForm.startTime);
    const end = safeDate(activityForm.endTime);

    return (
        <Drawer ref={drawerRef} triggerButton={children}>
            <View className="py-4 pt-8">
                <ColumnView>
                    {/* Prominent time display */}
                    <RowView className="px-4 mb-4">
                        {/* Start */}
                        <TouchableOpacity
                            onPress={() => setSelectedType("start")}
                            className="flex-1 items-center"
                        >
                            <Text className="text-xs text-gray-400 mb-1 tracking-widest uppercase">
                                Start
                            </Text>
                            <View className="flex-row items-end">
                                <Text
                                    className={clsx(
                                        "text-4xl font-semibold tracking-tight",
                                        selectedType === "start"
                                            ? "text-black"
                                            : "text-gray-300",
                                    )}
                                >
                                    {start ? format(start, "hh:mm") : "--:--"}
                                </Text>
                                <Text
                                    className={clsx(
                                        "text-sm font-medium mb-1 ml-1",
                                        selectedType === "start"
                                            ? "text-black"
                                            : "text-gray-300",
                                    )}
                                >
                                    {start ? format(start, "aa") : "--"}
                                </Text>
                            </View>
                            {selectedType === "start" && (
                                <View className="mt-2 h-0.5 w-full bg-black rounded-full" />
                            )}
                        </TouchableOpacity>

                        {/* End */}
                        <TouchableOpacity
                            onPress={() => setSelectedType("end")}
                            className="flex-1 items-center"
                        >
                            <Text className="text-xs text-gray-400 mb-1 tracking-widest uppercase">
                                End
                            </Text>
                            <View className="flex-row items-end">
                                <Text
                                    className={clsx(
                                        "text-4xl font-semibold tracking-tight",
                                        selectedType === "end"
                                            ? "text-black"
                                            : "text-gray-300",
                                    )}
                                >
                                    {end ? format(end, "hh:mm") : "--:--"}
                                </Text>
                                <Text
                                    className={clsx(
                                        "text-sm font-medium mb-1 ml-1",
                                        selectedType === "end"
                                            ? "text-black"
                                            : "text-gray-300",
                                    )}
                                >
                                    {end ? format(end, "aa") : "--"}
                                </Text>
                            </View>
                            {selectedType === "end" && (
                                <View className="mt-2 h-0.5 w-full bg-black rounded-full" />
                            )}
                        </TouchableOpacity>
                    </RowView>

                    {/* Wheel pickers */}
                    <View className="px-4">
                        <View
                            style={{
                                display:
                                    selectedType === "start" ? "flex" : "none",
                            }}
                        >
                            <TimeSelector
                                type="start"
                                defaultTime={activityForm.startTime}
                                onSelect={(v: string) =>
                                    setActivityForm({
                                        ...activityForm,
                                        startTime: v,
                                    })
                                }
                            />
                        </View>
                        <View
                            style={{
                                display:
                                    selectedType === "end" ? "flex" : "none",
                            }}
                        >
                            <TimeSelector
                                type="end"
                                defaultTime={activityForm.endTime}
                                onSelect={(v: string) =>
                                    setActivityForm({
                                        ...activityForm,
                                        endTime: v,
                                    })
                                }
                            />
                        </View>
                    </View>
                </ColumnView>
            </View>
        </Drawer>
    );
}
