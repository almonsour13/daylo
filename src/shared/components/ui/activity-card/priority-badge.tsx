import { PRIORITY } from "@/shared/constants/constant";
import { Priority } from "@/shared/types/activity";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";
import { capitalize } from "@/shared/utils/string";

interface Props extends ViewProps {
    priority: Priority;
    className?: string;
}
export default function PriorityBadge({ priority, className }: Props) {
    // const priorityLevel = PRIORITY[priority];
    return (
        <Badge className={clsx("", className)}>
            {/* <Feather name={priorityLevel.icon} size={12} color="white" /> */}
            <Text className="text-sm text-white">{capitalize(priority)}</Text>
        </Badge>
    );
}
