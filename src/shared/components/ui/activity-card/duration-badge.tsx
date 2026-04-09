import { getDurationLabel } from "@/shared/utils/time";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    startTime: string;
    endTime: string;
    className?: string;
}
export default function DurationBadge({
    startTime,
    endTime,
    className,
}: Props) {
    const duration = getDurationLabel(startTime, endTime);
    return (
        <Badge className={clsx("", className)}>
            <Text className="text-sm text-white">{duration}</Text>
        </Badge>
    );
}
