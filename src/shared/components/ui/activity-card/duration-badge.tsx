import { getDurationLabel } from "@/shared/utils/time";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    date: string;
    startTime: string;
    endTime: string;
    className?: string;
}
export default function DurationBadge({
    date,
    startTime,
    endTime,
    className,
}: Props) {
    const duration = getDurationLabel(date, startTime, endTime);
    return (
        <Badge className={clsx("", className)}>
            <Text className="text-sm text-white">{duration}</Text>
        </Badge>
    );
}
