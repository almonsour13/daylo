import { activityService } from "@/db/services/activity-service";
import { Activity } from "../../types/activity";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ColumnView, RowView } from "../ui/custom-view";

interface Props {
    activity: Activity;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function MoveToTrashDrawer({
    activity,
    onClose,
    onSuccess,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleMove = async () => {
        try {
            setIsLoading(true);
            setError("");
            onSuccess?.();
            onClose();
        } catch (e) {
            setError("Failed to move to trash");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ColumnView className="p-4 gap-8 justify-center items-center">
            <Text className="text-xl text-center">
                Do you want to move this item to trash?
            </Text>
            {error && (
                <Text className="text-red-500 text-sm text-center">
                    {error}
                </Text>
            )}
            <RowView>
                <TouchableOpacity
                    disabled={isLoading}
                    onPress={onClose}
                    className="flex-1 h-16 rounded-full bg-black justify-center items-center"
                >
                    <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={isLoading}
                    onPress={handleMove}
                    className="flex-1 h-16 rounded-full bg-red-500 justify-center items-center"
                >
                    <Text className="text-white">
                        {isLoading ? "Moving..." : "Move"}
                    </Text>
                </TouchableOpacity>
            </RowView>
        </ColumnView>
    );
}
