import { PRIORITY } from "@/shared/constants/constant";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    priority: number;
    className?: string;
}
export default function PriorityBadge({ priority, className }: Props) {
    const priorityLevel = PRIORITY[priority];
    return (
        <Badge className={clsx("", className)}>
            <Feather name={priorityLevel.icon} size={12} color="white" />
            <Text className="text-sm text-white">{priorityLevel.label}</Text>
        </Badge>
    );
}
