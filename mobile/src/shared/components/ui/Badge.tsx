import { cn } from "@/shared/utils/cn";
import { View, ViewProps } from "react-native";
import Text from "./Text";

interface BadgeProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
    textClassName?: string; // New prop for the inner text
}

export default function Badge({
    children,
    className,
    textClassName,
    ...props
}: BadgeProps) {
    return (
        <View
            className={cn(
                "px-3 h-7 rounded justify-center items-center bg-muted",
                className,
            )}
            {...props}
        >
            <Text
                className={cn("capitalize text-sm font-medium", textClassName)}
            >
                {children}
            </Text>
        </View>
    );
}
