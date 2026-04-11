import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";
import { toDateTime } from "@/shared/utils/time";

interface Props extends ViewProps {
    startTime: string;
    endTime: string;
    date: string; // ✅ add date prop
    className?: string;
}

export default function TimeBadge({
    startTime,
    endTime,
    date,
    className,
}: Props) {
    const start = toDateTime(date, startTime);
    const end = toDateTime(date, endTime);

    return (
        <Badge className={clsx("", className)}>
            <Feather name="clock" size={12} color="white" />
            <Text className="text-sm text-white">
                {format(start, "p")} - {format(end, "p")}
            </Text>
        </Badge>
    );
}
