import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { PRIORITY } from "@/shared/constants/constant";
import { cn } from "@/shared/utils/cn";
import { Feather } from "@expo/vector-icons";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { OptionItemWrapper } from "../OptionList";

interface Props {
    value?: string | null;
    onChange: (value: string) => void;
}

const PriorityDrawer = forwardRef<DrawerHandle, Props>(
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
                            Select Category
                        </Text>
                    </RowView>

                    <ColView className="gap-0">
                        {PRIORITY.map((item) => {
                            const isSelected = value === item.label;
                            return (
                                <OptionItemWrapper
                                    key={item.label}
                                    className={cn(isSelected && "bg-muted")}
                                    onPress={() => {
                                        onChange(item.label);
                                        drawerRef.current?.close();
                                    }}
                                >
                                    <RowView className="justify-between">
                                        <Text
                                            className={cn(
                                                "text-lg capitalize",
                                                item.textColor,
                                            )}
                                        >
                                            {item.label}
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
                </ColView>
            </Drawer>
        );
    },
);

export default PriorityDrawer;
