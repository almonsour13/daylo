import { activitiesData } from "@/shared/constants/data";
import { Activity } from "@/shared/types/activity";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useActivityDetails = () => {
    const { activityId } = useLocalSearchParams();
    const [activityDetails, setActivityDetails] = useState<Activity | null>(
        null,
    );
    const [isActivityDetailsLoading, setIsActivityDetailsLoading] =
        useState(false);
    const [activityDetailsError, setActivityDetailsError] = useState("");

    const fetchActivityDetails = async () => {
        setIsActivityDetailsLoading(true);
        try {
            const data = activitiesData();
            const activity = data.find(
                (activity) => activity.id === Number(activityId),
            );
            if (!activity) throw new Error("Activity not found");
            setActivityDetails(activity);
        } catch (e) {
            setActivityDetailsError("Failed to fetch activity details");
        } finally {
            setIsActivityDetailsLoading(false);
        }
    };

    useEffect(() => {
        if (!activityId) return;
        fetchActivityDetails();
    }, [activityId]);

    return {
        isActivityDetailsLoading,
        activityDetails,
        activityDetailsError,
        fetchActivityDetails,
    };
};
