import { cn } from "@/lib/utils";
import React from "react";
import ContentContainer from "./content-container";

interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function SectionWrapper({
    children,
    className,
    ...props
}: ContentContainerProps) {
    return (
        <div className={cn("w-full px-4", className)} {...props}>
            <ContentContainer>{children}</ContentContainer>
        </div>
    );
}
