import clsx from "clsx";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
    children: React.ReactNode;
    className?: string;
}
export default function InputField({ children, className, ...props }: Props) {
    return (
        <View className={clsx("flex-col gap-1", className)} {...props}>
            {children}
        </View>
    );
}
