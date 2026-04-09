import React, { createContext, ReactNode, useContext, useState } from "react";
import { Activity } from "../types/activity";

interface AddContextType {
    activity: Activity;
    setActivity: React.Dispatch<React.SetStateAction<Activity>>;
    updateActivity: (activity: Activity) => void;
}

const AddActivityContext = createContext<AddContextType | undefined>(undefined);

export function AddActivityProvider({ children }: { children: ReactNode }) {
    const [activity, setActivity] = useState<Activity>({
        name: "Morning Walk",
        description: "",
        priority: 0,
        date: new Date(),
        startTime: null,
        endTime: null,
        repeat: [],
        notificationEnabled: 1,
    });

    const updateActivity = (activity: Activity) => {
        setActivity(activity);
    };

    return (
        <AddActivityContext.Provider
            value={{
                activity,
                setActivity,
                updateActivity,
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
