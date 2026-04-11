import React, { createContext, ReactNode, useContext, useState } from "react";
import { Activity } from "../types/activity";
import { isActivityValid } from "../lib/activity";
import { activityService } from "@/db/services/activity-service";
import { router } from "expo-router";
import { useActivityContext } from "@/features/activity/context/activity-context";

interface AddContextType {
    newActivity: Activity;
    setNewActivity: React.Dispatch<React.SetStateAction<Activity>>;
    updateActivity: (activity: Activity) => void;
    addActivity: () => void;
    isloading: boolean;
    error: string;
}

const AddActivityContext = createContext<AddContextType | undefined>(undefined);

export function AddActivityProvider({ children }: { children: ReactNode }) {
    const [newActivity, setNewActivity] = useState<Activity>({
        name: "Morning Walk",
        description: "",
        priority: 0,
        date: new Date().toISOString().split("T")[0],
        startTime: "08:00",
        endTime: "09:00",
        repeat: "",
        notificationEnabled: 1,
    });
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { setActivities } = useActivityContext();

    const updateActivity = (activity: Activity) => {
        setNewActivity(activity);
    };

    const addActivity = async () => {
        const isValid = isActivityValid(newActivity);
        if (!isValid) return;
        try {
            setIsLoading(true);
            setError(""); // ✅ clear previous error before each attempt
            const data = await activityService.createActivity({
                ...newActivity,
                repeat: JSON.stringify(newActivity.repeat),
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
        <AddActivityContext.Provider
            value={{
                newActivity,
                setNewActivity,
                updateActivity,
                addActivity,
                isloading,
                error,
            }}
        >
            {children}
        </AddActivityContext.Provider>
    );
}

export function useAddActivityContext() {
    const context = useContext(AddActivityContext);
    if (!context) {
        throw new Error("useAddContext must be used within an AddProvider");
    }
    return context;
}
