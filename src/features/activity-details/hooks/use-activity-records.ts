import { activitysData } from "@/shared/constants/data";
import { ActivityRecord } from "@/shared/types/activity";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useActivityRecords = () => {
    const { activityId } = useLocalSearchParams();
    const [activityRecords, setActivityRecords] = useState<
        ActivityRecord[] | []
    >([]);
    const [isActivityRecordsLoading, setIsActivityRecordsLoading] =
        useState(true);
    const [activityRecordsError, setActivityRecordsError] = useState("");

    const fetchActivityRecords = async () => {
        try {
            const data = activitysData();
            setActivityRecords(data);
            setIsActivityRecordsLoading(true);
        } catch (error) {
            setActivityRecordsError("Something went wrong.");
        } finally {
            setIsActivityRecordsLoading(false);
        }
    };
    useEffect(() => {
        if (!activityId) return;
        fetchActivityRecords();
    }, [activityId]);

    return {
        isActivityRecordsLoading,
        activityRecords,
        activityRecordsError,
        fetchActivityRecords,
    };
};
