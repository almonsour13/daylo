import { cn } from "@/shared/utils/cn";
import { TextProps } from "react-native";
import Text from "./Text";

export default function Label({ className, ...props }: TextProps) {
    return (
        <Text
            className={cn("text-muted-foreground font-medium", className)}
            {...props}
        />
    );
}
