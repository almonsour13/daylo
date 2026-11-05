import { Card } from "@/shared/components/ui/Card";
import Feather from "@expo/vector-icons/Feather";
import { TextInput, TouchableOpacity } from "react-native";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function ActivitySearchBar({ value, onChange }: Props) {
    return (
        <Card className="relative h-14 py-0 flex-1 justify-center">
            <TextInput
                placeholder="Search"
                value={value}
                onChangeText={onChange}
                className="text-base text-foreground placeholder:text-muted-foreground"
            />
            {!!value && (
                <TouchableOpacity
                    onPress={() => onChange("")}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Clear search"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                    <Feather
                        name="x"
                        size={20}
                        className="text-muted-foreground"
                    />
                </TouchableOpacity>
            )}
        </Card>
    );
}
