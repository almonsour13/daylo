import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";

export default function OptionList({
    value,
    items,
    onChange,
}: {
    value?: string | null;
    items: string[];
    onChange: (value: string) => void;
}) {
    return (
        <ColView className="gap-0">
            {items.map((item) => {
                const isSelected = value === item;
                return (
                    <OptionItemWrapper
                        key={item}
                        className={cn(isSelected && "bg-muted")}
                        onPress={() => {
                            onChange(item);
                        }}
                    >
                        <RowView className="justify-between">
                            <Text
                                className={cn(
                                    "text-lg capitalize",
                                    isSelected && "text-primary",
                                )}
                            >
                                {item}
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
    );
}
export function OptionItemWrapper({
    onPress,
    children,
    className,
}: {
    onPress: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <TouchableOpacity
            className={cn("p-4 px-4 h-16 justify-center", className)}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}
