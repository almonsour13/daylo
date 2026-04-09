import clsx from "clsx";
import { Text, TextProps } from "react-native";

interface Props extends TextProps {
    className?: string;
    children: React.ReactNode;
}

export default function Label({ children, className, ...props }: Props) {
    return (
        <Text
            className={clsx("text-base font-semibold text-zinc-500", className)}
            {...props}
        >
            {children}
        </Text>
    );
}
