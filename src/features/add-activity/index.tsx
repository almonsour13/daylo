import { ColumnView } from "@/shared/components/ui/custom-view";
import { PRIORITY } from "@/shared/constants/constant";
import clsx from "clsx";
import { ScrollView, Text, View } from "react-native";
import Header from "./components/header";
import DetailsGroup from "./components/details-group";
import OrganizeGroup from "./components/organize-group";
import ScheduleGroup from "./components/schedule-group";
import SettingsGroup from "./components/settings-group";
import SubmitButton from "./components/submit-button";
import { useAddActivityContext } from "./context/add-activity-context";

export default function AddActivityScreen() {
    const { newActivity } = useAddActivityContext();

    const priority = PRIORITY[newActivity.priority];

    return (
        <>
            <View
                className={clsx(
                    "hidden absolute top-0 bottom-0 left-0 right-0",
                    priority.label !== "None" && priority.color,
                )}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ColumnView className={clsx("relative gap-4")}>
                    <Header />
                    <ColumnView>
                        <View className="hidden px-4">
                            <Text className="text-2xl">
                                Create New Activity
                            </Text>
                        </View>
                        <ColumnView
                            className={clsx(
                                "p-4 pt-6 pb-28 gap-4 bg-white rounded-t-4xl",
                            )}
                        >
                            <DetailsGroup />
                            <OrganizeGroup />
                            <ScheduleGroup />
                            <SettingsGroup />
                        </ColumnView>
                    </ColumnView>
                </ColumnView>
            </ScrollView>
            <SubmitButton />
        </>
    );
}
