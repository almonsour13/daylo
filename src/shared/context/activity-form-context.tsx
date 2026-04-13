import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { activityService } from "@/db/services/activity-service";
import { router, useLocalSearchParams } from "expo-router";
import { useActivityContext } from "@/features/activity/context/activity-context";
import { Activity } from "@/shared/types/activity";
import { isActivityValid } from "@/shared/lib/activity";

const DEFAULT_FORM: ActivityForm = {
    name: "",
    description: "",
    priority: "none",
    category: "none",
    date: new Date().toISOString().split("T")[0],
    startTime: "08:00",
    endTime: "09:00",
    status: "active",
    repeatType: "once",
    repeatDays: "[]",
    notificationEnabled: 1,
};
export type ActivityForm = Omit<Activity, "id" | "createdAt" | "updatedAt">; // ✅ omit auto-managed fields

interface ActivityFormContextType {
    mode: "add" | "edit";
    activityForm: ActivityForm;
    setActivityForm: React.Dispatch<React.SetStateAction<ActivityForm>>;
    isLoading: boolean;
    error: string;
    hasChanges: boolean;
    handleAdd: () => void;
    handleUpdate: () => void;
}
const ActivityFormContext = createContext<ActivityFormContextType | undefined>(
    undefined,
);

export function ActivityFormProvider({
    children,
    mode = "add",
}: {
    mode: "add" | "edit";
    children: ReactNode;
}) {
    const activityId = useLocalSearchParams().activityId;
    const [activityForm, setActivityForm] =
        useState<ActivityForm>(DEFAULT_FORM);
    const [originalActivityValue, setOriginalActivityValue] =
        useState<ActivityForm>(DEFAULT_FORM);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { activities, setActivities } = useActivityContext();

    useEffect(() => {
        if (mode === "edit" && activityId) {
            const activity = activities.find(
                (activity) => activity.id === Number(activityId),
            );
            if (activity) {
                setActivityForm(activity);
                setOriginalActivityValue(activity);
            }
        }
    }, [mode, activityId]);

    const hasChanges =
        mode === "edit"
            ? JSON.stringify(activityForm) !==
              JSON.stringify(originalActivityValue)
            : true;

    const handleUpdate = async () => {
        if (!hasChanges) return;
        try {
            setIsLoading(true);
            setError("");
            const changedFields = (
                Object.keys(activityForm) as (keyof ActivityForm)[]
            ).reduce((acc, key) => {
                if (activityForm[key] !== originalActivityValue[key]) {
                    acc[key] = activityForm[key] as any;
                }
                return acc;
            }, {} as Partial<ActivityForm>);

            console.log("[ActivityFormContext] changed fields:", changedFields);

            const data = await activityService.updateActivity(
                Number(activityId),
                changedFields,
            );
            if (data) {
                setActivities((prev) =>
                    prev.map((a) => (a.id === data.id ? data : a)),
                );
                setOriginalActivityValue(activityForm); // ✅ update snapshot after save
                router.back();
            }
        } catch (e) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };
    const handleAdd = async () => {
        const isValid = isActivityValid(activityForm);
        if (!isValid) return;
        try {
            setIsLoading(true);
            setError("");
            const data = await activityService.createActivity({
                ...activityForm,
                repeatDays: JSON.stringify(activityForm.repeatDays),
            });
            if (data) {
                setActivities((prev) => [...prev, data]);
                router.back();
            }
        } catch (error) {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ActivityFormContext.Provider
            value={{
                mode,
                activityForm,
                setActivityForm,
                isLoading,
                error,
                hasChanges,
                handleAdd,
                handleUpdate,
            }}
        >
            {children}
        </ActivityFormContext.Provider>
    );
}

export function useActivityFormContext() {
    const context = useContext(ActivityFormContext);
    if (!context) {
        throw new Error("useAddContext must be used within an AddProvider");
    }
    return context;
}
