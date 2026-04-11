import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAddActivityContext } from "../context/add-activity-context";
import { isActivityValid } from "../lib/activity";

export default function SubmitButton() {
    const insets = useSafeAreaInsets();
    const { newActivity, isloading, addActivity } = useAddActivityContext();

    const isInputValid = isActivityValid(newActivity);

    return (
        <View
            className="px-4 absolute pb-4 left-0 right-0"
            style={{
                bottom: insets.bottom,
            }}
        >
            <TouchableOpacity
                disabled={!isInputValid}
                className={clsx(
                    "flex-1 h-16 bg-black rounded-full justify-center items-center",
                    isInputValid ? "" : "opacity-75",
                )}
                onPress={addActivity}
            >
                {isloading ? (
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
