import { ColumnView } from "@/shared/components/ui/custom-view";
import { CATEGORY } from "@/shared/constants/constant";
import { useActivityFormContext } from "@/shared/context/activity-form-context";
import clsx from "clsx";
import { ScrollView, Text, View } from "react-native";
import DetailsGroup from "../../shared/components/activity-form/group/details-group";
import OrganizeGroup from "../../shared/components/activity-form/group/organize-group";
import ScheduleGroup from "../../shared/components/activity-form/group/schedule-group";
import SettingsGroup from "../../shared/components/activity-form/group/settings-group";
import SubmitButton from "./components/submit-button";
import Header from "./components/header";

export default function EditActivityScreen() {
    const { activityForm } = useActivityFormContext();
    const category = CATEGORY[activityForm.category];

    return (
        <>
            <View
                className={clsx(
                    "absolute top-0 bottom-0 left-0 right-0",
                    activityForm.category != "none" && category.bgColor,
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
