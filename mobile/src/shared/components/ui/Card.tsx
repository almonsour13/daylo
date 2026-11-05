import { cn } from "@/shared/utils/cn";
import { TextProps, View, ViewProps } from "react-native";
import Text from "./Text";

function Card({ className, ...props }: ViewProps) {
    return (
        <View
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-4 p-4 rounded-md",
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: ViewProps) {
    return (
        <View
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className,
            )}
            {...props}
        />
    );
}

function CardTitle({ children, className, ...props }: TextProps) {
    return (
        <Text
            data-slot="card-title"
            className={cn("text-lg leading-tight", className)}
            numberOfLines={2}
            {...props}
        >
            {children}
        </Text>
    );
}

function CardDescription({ className, ...props }: TextProps) {
    return (
        <Text
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function CardAction({ className, ...props }: ViewProps) {
    return (
        <View
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className,
            )}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: ViewProps) {
    return (
        <View
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }: ViewProps) {
    return (
        <View
            data-slot="card-footer"
            className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
            {...props}
        />
    );
}

export {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
};

