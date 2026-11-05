import { cn } from "@/shared/utils/cn";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
    className?: string;
}
export default function Divider({ className, ...props }: Props) {
    return <View className={cn("h-px bg-border", className)} {...props} />;
}
