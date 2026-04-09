import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";

interface Props extends ViewProps {
    className?: string;
}
export default function CategoryBadge({ className }: Props) {
    return (
        <Badge className={clsx("", className)}>
            <Feather name="briefcase" size={12} color="white" />
            <Text className="text-sm text-white">Work</Text>
        </Badge>
    );
}
