import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { format } from "date-fns";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    date: string;
    className?: string;
}
export default function DateBadge({ date, className }: Props) {
    return (
        <Badge className={clsx("", className)}>
            <Feather name="calendar" size={12} color="white" />
            <Text className="text-sm text-white">{format(date, "dd MMM")}</Text>
        </Badge>
    );
}
