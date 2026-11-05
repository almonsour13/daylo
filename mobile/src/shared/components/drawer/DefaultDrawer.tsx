import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import {
    ForwardedRef,
    forwardRef,
    ReactElement,
    Ref,
    useImperativeHandle,
    useRef,
} from "react";
import { TouchableOpacity } from "react-native";

interface Props<T extends string> {
    title?: string;
    options: {
        label: string;
        value: T;
    }[];
    value?: T | null;
    onChange: (value: T) => void;
}

function OptionDrawerInner<T extends string>(
    { title = "Select an option", options, value, onChange }: Props<T>,
    ref: ForwardedRef<DrawerHandle>,
) {
    const drawerRef = useRef<DrawerHandle>(null);

    useImperativeHandle(ref, () => ({
        open: () => drawerRef.current?.open(),
        close: () => drawerRef.current?.close(),
    }));

    return (
        <Drawer ref={drawerRef}>
            <ColView className="gap-2 py-4">
                <RowView className="px-4 justify-center">
                    <Text className="text-lg font-medium">{title}</Text>
                </RowView>
                <ColView className="gap-0">
                    {options.map((item) => {
                        const isSelected = value === item.value;
                        return (
                            <TouchableOpacity
                                key={item.value}
                                accessibilityRole="radio"
                                accessibilityLabel={item.label}
                                accessibilityState={{ selected: isSelected }}
                                className={cn(
                                    "p-4 px-4 h-16 justify-center",
                                    isSelected && "bg-muted",
                                )}
                                onPress={() => {
                                    drawerRef.current?.close();
                                    onChange(item.value);
                                }}
                            >
                                <RowView className="justify-between">
                                    <Text
                                        className={cn(
                                            "text-lg",
                                            isSelected && "text-primary",
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
                            </TouchableOpacity>
                        );
                    })}
                </ColView>
            </ColView>
        </Drawer>
    );
}

// forwardRef loses generics, so re-declare the type to keep `T` inferred
const DefaultDrawer = forwardRef(OptionDrawerInner) as <T extends string>(
    props: Props<T> & { ref?: Ref<DrawerHandle> },
) => ReactElement;

export default DefaultDrawer;
