import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import SafeScreen from "@/shared/components/SafeScreen";
import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { activityService } from "@/shared/services/activity.service";
import { NavigationProp } from "@/shared/types/navigation";
import { Activity } from "@/shared/types/type";
import { cn } from "@/shared/utils/cn";
import { generateId } from "@/shared/utils/utils";
import Feather from "@expo/vector-icons/Feather";
import {
    useNavigation,
    usePreventRemove,
    useRoute,
} from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import BasicInfoGroup from "../components/group/BasinInfoGroup";
import DetailsGroup from "../components/group/DetailsGroup";
import ScheduleGroup from "../components/group/ScheduleGroup";
import SettingsGroup from "../components/group/SettingsGroup";

const getToday = () => format(new Date(), "yyyy-MM-dd");

const getMockActivity = (date?: string): Activity => ({
    id: generateId(),
    name: "Morning Run",
    description: "30 minute jog around the park",
    category: "none",
    priority: "none",
    notificationEnabled: true,
    startTime: "06:00",
    endTime: "06:30",
    date: date ?? getToday(),
    repeatType: "daily",
    repeatDays: "[]",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
});
const getEmptyState = (date?: string): Activity => ({
    id: generateId(),
    name: "",
    description: "",
    category: "none",
    priority: "none",
    notificationEnabled: true,
    startTime: "",
    endTime: "",
    date: date ?? getToday(),
    repeatType: "once",
    repeatDays: "[]",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
});

const getInitialState = (date?: string): Activity =>
    __DEV__ ? getMockActivity(date) : getEmptyState(date);

export default function ActivityFormScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();

    const { activityId, date } = (route.params ?? {}) as {
        activityId?: string;
        date?: string;
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activityForm, setActivityForm] = useState<Activity>(() =>
        getInitialState(date),
    );

    const { createActivity, updateActivity } = useActivityMutations();

    const { data } = useQuery({
        queryKey: ["activity", activityId],
        queryFn: async () => await activityService.getById(activityId!),
        enabled: !!activityId,
    });

    useEffect(() => {
        if (activityId) {
            if (data) {
                setActivityForm(data);
            }
            return;
        }

        setActivityForm(getInitialState(date));
    }, [activityId, data, date]);

    const update = (fields: Partial<Activity>) =>
        setActivityForm((prev) => ({ ...prev, ...fields }));

    const isValid = activityId
        ? !!data &&
          (activityForm.name !== data.name ||
              activityForm.description !== data.description ||
              activityForm.date !== data.date ||
              activityForm.startTime !== data.startTime ||
              activityForm.endTime !== data.endTime ||
              activityForm.repeatType !== data.repeatType ||
              activityForm.repeatDays !== data.repeatDays ||
              activityForm.category !== data.category ||
              activityForm.priority !== data.priority ||
              activityForm.status !== data.status ||
              activityForm.notificationEnabled !== data.notificationEnabled)
        : !!(
              activityForm.name &&
              activityForm.date &&
              activityForm.startTime &&
              activityForm.repeatType &&
              activityForm.category &&
              activityForm.priority &&
              activityForm.status
          );

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            if (activityId) {
                await updateActivity({
                    id: activityId,
                    data: activityForm,
                });
            } else {
                await createActivity(activityForm);
            }
            requestAnimationFrame(() => {
                navigation.goBack();
            });
        } catch (error) {
            Alert.alert("Error", "Failed to save activity. Please try again.");
            setIsSubmitting(false);
        }
    };

    usePreventRemove(isValid && !isSubmitting, ({ data }) => {
        Alert.alert(
            "Discard changes?",
            "You have unsaved changes. Are you sure you want to leave?",
            [
                { text: "Keep editing", style: "cancel" },
                {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => navigation.dispatch(data.action),
                },
            ],
        );
    });

    return (
        <SafeScreen>
            <ColView className="flex-1 px-4 gap-4">
                <RowView className="py-4 justify-between items-center">
                    <RowView className="items-center gap-4">
                        <Text className="text-2xl capitalize">
                            {activityId ? "Edit" : "Create"}
                        </Text>
                    </RowView>
                    <RowView>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            hitSlop={12}
                            accessibilityRole="button"
                            accessibilityLabel="Close"
                        >
                            <Feather
                                name="x"
                                size={24}
                                className="text-foreground"
                            />
                        </TouchableOpacity>
                    </RowView>
                </RowView>
                <ColView className="gap-4 flex-1">
                    <BasicInfoGroup form={activityForm} update={update} />
                    <DetailsGroup form={activityForm} update={update} />
                    <ScheduleGroup form={activityForm} update={update} />
                    <SettingsGroup form={activityForm} update={update} />
                </ColView>
                <ColView>
                    {activityId &&
                        data &&
                        new Date(data.updatedAt).getTime() !==
                            new Date(data.createdAt).getTime() && (
                            <Text className="text-muted-foreground text-sm">
                                Last Updated at{" "}
                                {format(
                                    new Date(data.updatedAt),
                                    "MMM dd, yyyy p",
                                )}
                            </Text>
                        )}
                    <TouchableOpacity
                        disabled={!isValid || isSubmitting}
                        className="pb-4"
                        onPress={handleSubmit}
                    >
                        <Card
                            className={cn(
                                "h-14 bg-primary justify-center items-center",
                                (!isValid || isSubmitting) && "opacity-50",
                            )}
                        >
                            <Text className="text-white">
                                {isSubmitting
                                    ? activityId
                                        ? "Updating..."
                                        : "Saving..."
                                    : activityId
                                      ? "Update"
                                      : "Save"}
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </ColView>
            </ColView>
        </SafeScreen>
    );
}
