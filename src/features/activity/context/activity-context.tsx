import "@/global.css";
import React, { createContext, ReactNode, useContext } from "react";
import "react-native-reanimated";
import { useActivities } from "../hooks/use-activities";
import { Activity } from "@/shared/types/activity";

interface ActivityContextType {
    activities: Activity[];
    setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
    isActivitiesLoading: boolean;
    activitiesError: string;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
    undefined,
);

export function ActivityProvider({ children }: { children: ReactNode }) {
    const { activities, setActivities, isActivitiesLoading, activitiesError } =
        useActivities();

    return (
        <ActivityContext.Provider
            value={{
                activities,
                setActivities,
                isActivitiesLoading,
                activitiesError,
            }}
        >
            {children}
        </ActivityContext.Provider>
    );
}

export function useActivityContext() {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error("useAddContext must be used within an AddProvider");
    }
    return context;
}
