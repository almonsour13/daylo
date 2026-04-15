import { activityService } from "@/db/services/activity-service";
import { activitiesData } from "@/shared/constants/data";
import { Activity } from "@/shared/types/activity";
import { useCallback, useEffect, useState } from "react";

export const useActivities = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);
    const [activitiesError, setActivitiesError] = useState("");
    const [isActivityUpdating, setIsActivityUpdating] = useState({
        id: 0,
        updating: false,
    });

    const fetchActivities = useCallback(async () => {
        try {
            setIsActivitiesLoading(true);
            setActivitiesError("");
            const data = await activityService.getActivities();
            // const data = activitiesData();
            setActivities(data);
        } catch (e) {
            setActivitiesError("Failed to load activities");
        } finally {
            setIsActivitiesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchActivities();
    }, []);

    return {
        activities,
        setActivities,
        isActivitiesLoading,
        activitiesError,
        isActivityUpdating,
        refetch: fetchActivities, // ✅ expose refetch
    };
};
