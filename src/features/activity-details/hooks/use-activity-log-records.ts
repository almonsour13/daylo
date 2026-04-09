import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export const useActivityLogRecords = () => {
    const { activityId } = useLocalSearchParams();
    const [activityLogRecords, setActivityLogRecords] = useState([]);
    const [isActivityLogRecordsLoading, setIsActivityLogRecordsLoading] =
        useState(true);
    const [activityLogRecordsError, setActivityLogRecordsError] = useState("");

    const fetchActivityLogRecords = async () => {
        try {
            setIsActivityLogRecordsLoading(true);
        } catch (error) {
            setActivityLogRecordsError("Something went wrong.");
        } finally {
            setIsActivityLogRecordsLoading(false);
        }
    };
    useEffect(() => {
        if (!activityId) return;
        fetchActivityLogRecords();
    }, [activityId]);

    return {
        isActivityLogRecordsLoading,
        activityLogRecords,
        activityLogRecordsError,
        fetchActivityLogRecords,
    };
};
