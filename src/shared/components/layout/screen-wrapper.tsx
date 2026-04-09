import clsx from "clsx";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps extends ViewProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScreenWrapper({
    children,
    className,
    ...props
}: ScreenWrapperProps) {
    const inset = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                paddingTop: inset.top,
            }}
            className={clsx("flex-1", className)}
            {...props}
        >
            {children}
        </View>
    );
}
