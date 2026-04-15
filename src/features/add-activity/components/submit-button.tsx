import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import { isActivityValid } from "@/shared/lib/activity";

export default function SubmitButton() {
    const insets = useSafeAreaInsets();
    const { activityForm, isLoading, error, handleAdd } =
        useActivityFormContext();

    const isInputValid = isActivityValid(activityForm);

    return (
        <View className="p-4 absolute bottom-0 left-0 right-0">
            <Text>{error}</Text>
            <TouchableOpacity
                disabled={!isInputValid}
                className={clsx(
                    "flex-1 h-16 bg-black rounded-full justify-center items-center",
                    isInputValid ? "" : "opacity-75",
                )}
                onPress={handleAdd}
            >
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <Text className="text-white text-lg font-semibold">
                        Save
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}
