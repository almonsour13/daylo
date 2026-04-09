import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    startTime: string;
    endTime: string;
    className?: string;
}
export default function TimeBadge({ startTime, endTime, className }: Props) {
    return (
        <Badge className={clsx("", className)}>
            <Feather name="clock" size={12} color="white" />
            <Text className="text-sm text-white">
                {format(startTime, "p")} - {format(endTime, "p")}
            </Text>
        </Badge>
    );
}
