import { View, ViewProps } from "react-native";

interface CustomViewProps extends ViewProps {
    children?: React.ReactNode;
    className?: string;
}
export function RowView({ children, className, ...props }: CustomViewProps) {
    return (
        <View className={`flex-row gap-2 ${className}`} {...props}>
            {children}
        </View>
    );
}

export function ColumnView({ children, className, ...props }: CustomViewProps) {
    return (
        <View className={`flex-col gap-2 ${className}`} {...props}>
            {children}
        </View>
    );
}
