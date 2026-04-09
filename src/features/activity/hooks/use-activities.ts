import { activitiesData } from "@/shared/constants/data";
import { Activity } from "@/shared/types/activity";
import { useEffect, useRef, useState } from "react";

export interface UseTodayActivitiesProps {
    activities: Activity[];
    isActivitiesLoading: boolean;
    activitiesError: string;
}

export const useActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);
    const [activitiesError, setActivitiesError] = useState("");
    const [isActivityUpdating, setIsActivityUpdating] = useState({
        id: 0,
        updating: false,
    });
    const hasFetched = useRef(false);

    const fetchActivities = async () => {
        if (hasFetched.current) return;

        try {
            const data = activitiesData();
            setActivities([data]);
            hasFetched.current = true;
        } catch (e) {
            setActivitiesError("Failed to load today's activities");
        } finally {
            setIsActivitiesLoading(false);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return {
        activities,
        isActivitiesLoading,
        activitiesError,
        isActivityUpdating,
    };
};
