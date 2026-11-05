import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
    icon: ComponentProps<typeof Feather>["name"];
    title: string;
    description: string;
    onAdd?: () => void;
};

export default function ActivityEmptyState({
    icon,
    title,
    description,
    onAdd,
}: Props) {
    return (
        <ColView className="items-center px-6 py-10 gap-6">
            <Card className="aspect-square items-center justify-center rounded-full bg-primary/10 p-6">
                <Feather name={icon} size={40} className="text-primary" />
            </Card>

            <ColView className="items-center gap-2">
                <Text className="text-xl font-semibold text-center">
                    {title}
                </Text>
                <Text className="text-sm text-muted-foreground text-center leading-relaxed">
                    {description}
                </Text>
            </ColView>

            {onAdd && (
                <TouchableOpacity
                    onPress={onAdd}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Add activity"
                >
                    <RowView className="items-center gap-2 rounded-full bg-primary px-6 py-3">
                        <Feather name="plus" size={18} className="text-white" />
                        <Text className="text-base font-medium text-white">
                            Add activity
                        </Text>
                    </RowView>
                </TouchableOpacity>
            )}
        </ColView>
    );
}
