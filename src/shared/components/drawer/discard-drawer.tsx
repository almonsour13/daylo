import { activityService } from "@/db/services/activity-service";
import { Activity } from "../../types/activity";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ColumnView, RowView } from "../ui/custom-view";

interface Props {
    onClose: () => void;
    onSuccess?: () => void;
}

export default function DiscardDrawer({ onClose, onSuccess }: Props) {
    return (
        <ColumnView className="p-4 gap-8 justify-center items-center">
            <Text className="text-xl text-center">
                Do you want to discard this changes?
            </Text>
            <RowView>
                <TouchableOpacity
                    onPress={onClose}
                    className="flex-1 h-16 rounded-full bg-black justify-center items-center"
                >
                    <Text className="text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onSuccess}
                    className="flex-1 h-16 rounded-full bg-red-500 justify-center items-center"
                >
                    <Text className="text-white">Discard</Text>
                </TouchableOpacity>
            </RowView>
        </ColumnView>
    );
}
