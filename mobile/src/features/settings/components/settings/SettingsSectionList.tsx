import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import { Switch, TouchableOpacity, View } from "react-native";
import { SettingsSection } from "../../type";

export default function SettingsSectionList({
    sections,
}: {
    sections: SettingsSection[];
}) {
    return (
        <ColView className="flex-1 px-4 gap-2">
            {sections.map((section) => {
                const items = section.items.filter(
                    (item) => item.visible ?? true,
                );
                if (items.length === 0) return null;

                return (
                    <ColView key={section.title} className="gap-1">
                        <Text className="text-sm text-muted-foreground">
                            {section.title}
                        </Text>
                        {items.map((item) => {
                            const a11yLabel = [
                                item.label,
                                item.description,
                                item.value,
                            ]
                                .filter(Boolean)
                                .join(", ");
                            const type = item.type ?? "nav";
                            const isToggle = type === "toggle";
                            const readOnly = !!item.readOnly;
                            const blocked = readOnly || !!item.disabled;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={item.onPress}
                                    disabled={blocked}
                                    accessibilityRole="button"
                                    accessibilityLabel={a11yLabel}
                                    accessibilityState={{
                                        disabled: !!item.disabled,
                                    }}
                                    className={cn(
                                        item.disabled && "opacity-50",
                                    )}
                                >
                                    <Card className="justify-center h-18">
                                        <RowView className="justify-between items-center">
                                            <RowView className="gap-4 items-center flex-1">
                                                <View className="bg-muted h-10 w-10 items-center justify-center rounded">
                                                    <Icon
                                                        name={item.icon}
                                                        size={20}
                                                        className={cn(
                                                            "text-primary",
                                                            item.danger &&
                                                                "text-destructive",
                                                        )}
                                                    />
                                                </View>
                                                <ColView className="gap-0 flex-1">
                                                    <Text
                                                        className={cn(
                                                            "text-base",
                                                            item.danger &&
                                                                "text-destructive",
                                                        )}
                                                    >
                                                        {item.label}
                                                    </Text>
                                                    {!!item.description && (
                                                        <Text className="text-xs text-muted-foreground">
                                                            {item.description}
                                                        </Text>
                                                    )}
                                                </ColView>
                                            </RowView>

                                            {isToggle ? (
                                                <Switch
                                                    value={
                                                        item.value as boolean
                                                    }
                                                    onValueChange={() =>
                                                        item.onPress &&
                                                        item.onPress()
                                                    }
                                                />
                                            ) : type === "nav" ? (
                                                <RowView className="items-center">
                                                    {!!item.value && (
                                                        <Text className="text-xs text-primary capitalize">
                                                            {String(item.value)}
                                                        </Text>
                                                    )}
                                                    {!item.danger &&
                                                        !readOnly && (
                                                            <Icon
                                                                name="chevron-forward"
                                                                size={16}
                                                                className="text-muted-foreground"
                                                            />
                                                        )}
                                                </RowView>
                                            ) : null}
                                        </RowView>
                                    </Card>
                                </TouchableOpacity>
                            );
                        })}
                    </ColView>
                );
            })}
        </ColView>
    );
}
