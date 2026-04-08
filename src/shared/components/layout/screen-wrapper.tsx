import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps extends ViewProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScreenWrapper({ children }: ScreenWrapperProps) {
    const inset = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                paddingTop: inset.top,
                // paddingBottom: inset.bottom,
            }}
            className="flex-1"
        >
            {children}
        </View>
    );
}
