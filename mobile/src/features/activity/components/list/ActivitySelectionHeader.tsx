import { RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
    count: number;
    allSelected: boolean;
    canEdit: boolean;
    canDelete: boolean;
    onClose: () => void;
    onEdit: () => void;
    onToggleAll: () => void;
    onDelete: () => void;
};

export default function ActivitySelectionHeader({
    count,
    allSelected,
    canEdit,
    canDelete,
    onClose,
    onEdit,
    onToggleAll,
    onDelete,
}: Props) {
    return (
        <RowView className="p-4 pb-0 justify-between items-center">
            <RowView className="gap-2 items-center">
                <TouchableOpacity
                    onPress={onClose}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel selection"
                >
                    <Feather name="x" size={28} className="text-foreground" />
                </TouchableOpacity>
                <Text className="text-xl">{count}</Text>
            </RowView>
            <RowView className="gap-6 items-center">
                <TouchableOpacity
                    onPress={onEdit}
                    disabled={!canEdit}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Edit activity"
                    accessibilityState={{ disabled: !canEdit }}
                >
                    <Feather
                        name="edit"
                        size={24}
                        className={cn(
                            "text-foreground",
                            !canEdit && "opacity-40",
                        )}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onToggleAll}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel={
                        allSelected ? "Unselect all" : "Select all"
                    }
                >
                    <Feather
                        name={allSelected ? "check-square" : "square"}
                        size={24}
                        className="text-foreground"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={onDelete}
                    disabled={!canDelete}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Delete selected activities"
                    accessibilityState={{ disabled: !canDelete }}
                >
                    <Feather
                        name="trash-2"
                        size={24}
                        className={
                            canDelete
                                ? "text-destructive"
                                : "text-foreground opacity-40"
                        }
                    />
                </TouchableOpacity>
            </RowView>
        </RowView>
    );
}
