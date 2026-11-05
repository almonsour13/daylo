import { Card } from "@/shared/components/ui/Card";
import Text from "@/shared/components/ui/Text";
import { TouchableOpacity } from "react-native";

export default function ActivityListError({
    onRetry,
}: {
    onRetry: () => void;
}) {
    return (
        <Card className="items-center py-8 gap-2">
            <Text className="text-muted-foreground">
                Couldn't load activities.
            </Text>
            <TouchableOpacity onPress={onRetry} accessibilityRole="button">
                <Text className="text-primary">Try again</Text>
            </TouchableOpacity>
        </Card>
    );
}
