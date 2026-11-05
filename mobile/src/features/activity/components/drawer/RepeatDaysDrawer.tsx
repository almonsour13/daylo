import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { DAY_LABELS } from "@/shared/constants/constant";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { TouchableOpacity } from "react-native";
import { OptionItemWrapper } from "../OptionList";

interface Props {
    value?: number[] | null;
    onChange: (value: number[]) => void;
}

const RepeatDaysDrawer = forwardRef<DrawerHandle, Props>(
    ({ value, onChange }, ref) => {
        const drawerRef = useRef<DrawerHandle>(null);
        const [selectedRepeatDays, setSelectedRepeatDays] = useState<number[]>(
            [],
        );

        useImperativeHandle(ref, () => ({
            open: () => drawerRef.current?.open(),
            close: () => drawerRef.current?.close(),
        }));

        useEffect(() => {
            if (value) {
                setSelectedRepeatDays(value);
            }
        }, [value]);

        const toggleCustomDay = (dayIndex: number) => {
            setSelectedRepeatDays((prev) =>
                prev.includes(dayIndex)
                    ? prev.filter((d) => d !== dayIndex)
                    : [...prev, dayIndex].sort((a, b) => a - b),
            );
        };

        const confirmCustomDays = () => {
            onChange(selectedRepeatDays);
            drawerRef.current?.close();
        };
        return (
            <Drawer
                ref={drawerRef}
                disableBackdrop={true}
                disableHandle={true}
                disableBackHandler={true}
            >
                <ColView className="gap-2 py-4">
                    <RowView className="px-4 justify-between">
                        <Text className="text-lg font-medium">Select Days</Text>
                    </RowView>
                    <ColView className="gap-0">
                        {DAY_LABELS.map((day, i) => {
                            const isSelected = selectedRepeatDays.includes(i);
                            return (
                                <OptionItemWrapper
                                    key={day}
                                    className={cn(isSelected && "bg-muted")}
                                    onPress={() => toggleCustomDay(i)}
                                >
                                    <RowView className="justify-between">
                                        <Text
                                            className={cn(
                                                "text-lg capitalize",
                                                isSelected && "text-primary",
                                            )}
                                        >
                                            {day}
                                        </Text>
                                        {isSelected && (
                                            <Feather
                                                name="check"
                                                size={20}
                                                className="text-primary"
                                            />
                                        )}
                                    </RowView>
                                </OptionItemWrapper>
                            );
                        })}
                    </ColView>

                    <RowView className="px-4">
                        <TouchableOpacity
                            onPress={() => drawerRef.current?.close()}
                            className="flex-1"
                        >
                            <Card className="h-14 bg-muted justify-center items-center">
                                <Text>Cancel</Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={confirmCustomDays}
                            className={cn(
                                "flex-1",
                                selectedRepeatDays.length === 0 && "opacity-50",
                            )}
                        >
                            <Card className="h-14 bg-primary  justify-center items-center">
                                <Text className="text-white">
                                    Confirm ({selectedRepeatDays.length} days)
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    </RowView>
                </ColView>
            </Drawer>
        );
    },
);

export default RepeatDaysDrawer;
