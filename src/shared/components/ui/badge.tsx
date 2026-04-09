import clsx from "clsx";
import { ViewProps } from "react-native";
import { RowView } from "./custom-view";

interface BadgeProps extends ViewProps {
    children: React.ReactNode;
    className?: string;
}
export default function Badge({ children, className, ...props }: BadgeProps) {
    return (
        <RowView
            className={clsx(
                "h-8 px-3 rounded-full items-center bg-black",
                className,
            )}
            {...props}
        >
            {children}
        </RowView>
    );
}
