import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { isActivityValid } from "@/shared/lib/activity";

export default function SubmitButton() {
    const insets = useSafeAreaInsets();
    const { activityForm, isLoading, hasChanges, handleUpdate } =
        useActivityFormContext();

    return (
        <View className="p-4 absolute bottom-0 left-0 right-0">
            <TouchableOpacity
                disabled={!hasChanges}
                className={clsx(
                    "flex-1 h-16 bg-black rounded-full justify-center items-center",
                    hasChanges ? "" : "opacity-75",
                )}
                onPress={handleUpdate}
            >
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Text className="text-white text-lg font-semibold">
                        Update
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
