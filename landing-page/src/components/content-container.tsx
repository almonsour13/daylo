import { cn } from "@/lib/utils";
import React from "react";

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function ContentContainer({
    children,
    className,
    ...props
}: ContentContainerProps) {
    return (
        <div
            className={cn("w-full max-w-7xl mx-auto bg-gray-30a0", className)}
            {...props}
        >
            {children}
        </div>
    );
}
