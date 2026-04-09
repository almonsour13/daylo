import { useEffect, useState } from "react";

export const useTodayActivities = () => {
    const [todayActivities, setTodayActivities] = useState([]);
    const [isTodayActivitiesLoading, setIsTodayActivitiesLoading] =
        useState(true);
    const [todayActivitiesError, setTodayActivitiesError] = useState("");

    const fetchTodayActivities = async () => {
        try {
        } catch (error) {
            setTodayActivitiesError("Something went wrong");
        } finally {
            setIsTodayActivitiesLoading(false);
        }
    };
    useEffect(() => {
        fetchTodayActivities();
    }, []);

    return {
        todayActivities,
        isTodayActivitiesLoading,
        todayActivitiesError,
    };
};
