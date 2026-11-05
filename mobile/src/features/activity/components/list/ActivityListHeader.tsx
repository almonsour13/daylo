import { RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { TouchableOpacity } from "react-native";

type Props = {
    total: number;
    selectedCount: number;
    onCancel: () => void;
};

export default function ActivityListHeader({
    total,
    selectedCount,
    onCancel,
}: Props) {
    const isSelectionMode = selectedCount > 0;

    return (
        <RowView className="px-4 justify-between items-end">
            <Text className="text-base">
                {isSelectionMode
                    ? `${selectedCount} selected`
                    : `${total} ${total === 1 ? "Activity" : "Activities"}`}
            </Text>

            {isSelectionMode && (
                <TouchableOpacity
                    onPress={onCancel}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel selection"
                >
                    <Text className="text-primary">Cancel</Text>
                </TouchableOpacity>
            )}
        </RowView>
    );
}
