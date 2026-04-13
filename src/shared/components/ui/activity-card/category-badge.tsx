import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";
import { Text, ViewProps } from "react-native";
import Badge from "../badge";
import { Category } from "@/shared/types/activity";
import { capitalize } from "@/shared/utils/string";

interface Props extends ViewProps {
    category: Category;
    className?: string;
}
export default function CategoryBadge({ category, className }: Props) {
    return (
        <Badge className={clsx("", className)}>
            {/* <Feather name="briefcase" size={12} color="white" /> */}
            <Text className="text-sm text-white">{capitalize(category)}</Text>
        </Badge>
    );
}
