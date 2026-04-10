import clsx from "clsx";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
    className?: string;
    children: React.ReactNode;
}
export default function Card({ className, children, ...props }: Props) {
    return (
        <View
            className={clsx("overflow-hidden rounded-4xl", className)}
            {...props}
        >
            {children}
        </View>
    );
}
