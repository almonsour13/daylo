import clsx from "clsx";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps extends ViewProps {
    children: React.ReactNode;
    className?: string;
    paddingTop?: boolean;
    paddingBottom?: boolean;
    marginTop?: boolean;
    marginBottom?: boolean;
}

export default function ScreenWrapper({
    children,
    className,
    paddingTop = true,
    paddingBottom,
    marginTop,
    marginBottom,
    ...props
}: ScreenWrapperProps) {
    const inset = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                paddingTop: paddingTop ? inset.top : 0,
                paddingBottom: paddingBottom ? inset.bottom : 0,
                marginTop: marginTop ? inset.top : 0,
                marginBottom: marginBottom ? inset.bottom : 0,
            }}
            className={clsx("flex-1", className)}
            {...props}
        >
            {children}
        </View>
    );
}
