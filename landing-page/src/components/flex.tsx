import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type FlexProps = ComponentProps<"div"> & {
    direction?: "row" | "column";
};

export function Flex({ direction = "row", className, ...props }: FlexProps) {
    return (
        <div
            className={cn(
                "flex gap-2",
                direction === "row" ? "flex-row" : "flex-col",
                className,
            )}
            {...props}
        />
    );
}

export function Row(props: Omit<FlexProps, "direction">) {
    return <Flex direction="row" {...props} />;
}

export function Column(props: Omit<FlexProps, "direction">) {
    return <Flex direction="column" {...props} />;
}
