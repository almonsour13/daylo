import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { REPEAT_TYPE } from "@/shared/constants/constant";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
    value?: string | null;
    onChange: (value: string) => void;
}

const RepeatTypeDrawer = forwardRef<DrawerHandle, Props>(
    ({ value, onChange }, ref) => {
        const drawerRef = useRef<DrawerHandle>(null);

        useImperativeHandle(ref, () => ({
            open: () => drawerRef.current?.open(),
            close: () => drawerRef.current?.close(),
        }));

        return (
            <Drawer ref={drawerRef}>
                <ColView className="gap-2 py-4">
                    <RowView className="px-4 justify-center">
                        <Text className="text-lg font-medium">
                            Select Repeat
                        </Text>
                    </RowView>
                    <ColView className="gap-0">
                        {REPEAT_TYPE.map((type) => {
                            const isSelected = value === type.label;
                            return (
                                <TouchableOpacity
                                    key={type.label}
                                    className={cn(
                                        "p-4 px-4 h-16 justify-center",
                                        isSelected && "bg-muted",
                                    )}
                                    onPress={() => {
                                        onChange(type.label);
                                        drawerRef.current?.close();
                                    }}
                                >
                                    <RowView className="justify-between">
                                        <Text
                                            className={cn(
                                                "text-lg capitalize",
                                                isSelected && "text-primary",
                                            )}
                                        >
                                            {type.label}
                                        </Text>
                                        {isSelected && (
                                            <Feather
                                                name="check"
                                                size={20}
                                                className="text-primary"
                                            />
                                        )}
                                    </RowView>
                                </TouchableOpacity>
                            );
                        })}
                    </ColView>
                </ColView>
            </Drawer>
        );
    },
);

export default RepeatTypeDrawer;
