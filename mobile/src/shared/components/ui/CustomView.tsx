import { cn } from "@/shared/utils/cn";
import { View, ViewProps } from "react-native";

interface CustomViewProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
}
export function RowView({ children, className, ...props }: CustomViewProps) {
    return (
        <View className={cn("flex-row gap-2", className)} {...props}>
            {children}
        </View>
    );
}

export function ColView({ children, className, ...props }: CustomViewProps) {
    return (
        <View className={cn("flex-col gap-2", className)} {...props}>
            {children}
        </View>
    );
}
