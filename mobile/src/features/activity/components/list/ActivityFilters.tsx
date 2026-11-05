import Badge from "@/shared/components/ui/Badge";
import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Text from "@/shared/components/ui/Text";
import { CATEGORY, PRIORITY } from "@/shared/constants/constant";
import { cn } from "@/shared/utils/cn";
import Feather from "@expo/vector-icons/Feather";
import { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { ActivityFilters as Filters } from "../../hooks/use-activity-list";

type Option = { label: string; value: string };

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const toOptions = (list: readonly { label: string }[]): Option[] => [
    { label: "All", value: "all" },
    ...list.map((i) => ({ label: capitalize(i.label), value: i.label })),
];

const STATUS_OPTIONS: Option[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
];

const CATEGORY_OPTIONS = toOptions(CATEGORY);
const PRIORITY_OPTIONS = toOptions(PRIORITY);

// Matches the gap-2 (8px) of the parent that holds the panel
const PARENT_GAP = 8;

function ChipRow({
    title,
    options,
    value,
    onChange,
}: {
    title: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <ColView className="gap-1">
            <Text className="text-sm text-muted-foreground">{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ gap: 4 }}
            >
                {options.map((o) => {
                    const selected = o.value === value;
                    return (
                        <TouchableOpacity
                            key={o.value}
                            onPress={() => onChange(o.value)}
                            accessibilityRole="button"
                            accessibilityLabel={`${title}: ${o.label}`}
                            accessibilityState={{ selected }}
                        >
                            <Badge
                                className={cn(
                                    "px-4  h-10 rounded bg-card",
                                    selected && "bg-primary border-primary",
                                )}
                            >
                                <Text
                                    className={cn(
                                        "text-sm",
                                        selected && "text-white font-medium",
                                    )}
                                >
                                    {o.label}
                                </Text>
                            </Badge>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </ColView>
    );
}

/** The button that sits next to the search bar. */
export function ActivityFilterToggle({
    open,
    count,
    onPress,
}: {
    open: boolean;
    count: number;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={
                count > 0 ? `Filters, ${count} applied` : "Filters"
            }
            accessibilityState={{ expanded: open }}
        >
            <Card
                className={cn(
                    "h-14 w-14 items-center justify-center",
                    (open || count > 0) && "",
                )}
            >
                <Feather
                    name="sliders"
                    size={22}
                    className={cn(
                        "text-foreground",
                        (open || count > 0) && "text-primary",
                    )}
                />
                {count > 0 && (
                    <View className="absolute -top-1 -right-1 h-5 min-w-5 px-1 items-center justify-center rounded-full bg-primary">
                        <Text className="text-xs text-white">{count}</Text>
                    </View>
                )}
            </Card>
        </TouchableOpacity>
    );
}

/** Expands and collapses under the search bar. Always mounted. */
export function ActivityFilterPanel({
    open,
    filters,
    onChange,
    onReset,
    activeCount,
}: {
    open: boolean;
    filters: Filters;
    onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
    onReset: () => void;
    activeCount: number;
}) {
    const contentHeight = useSharedValue(0);
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(open ? 1 : 0, {
            duration: 250,
            easing: Easing.out(Easing.cubic),
        });
    }, [open, progress]);

    const style = useAnimatedStyle(() => ({
        height: contentHeight.value * progress.value,
        opacity: progress.value,
        // While closed, cancel ONE parent gap (the one above the panel).
        // The gap below remains, so the neighbors keep their normal 8px spacing.
        marginTop: -PARENT_GAP * (1 - progress.value),
    }));

    return (
        <Animated.View
            style={[{ overflow: "hidden" }, style]}
            pointerEvents={open ? "auto" : "none"}
            accessibilityElementsHidden={!open}
            importantForAccessibility={open ? "auto" : "no-hide-descendants"}
        >
            {/* Absolute, so its real height can be measured while the outer view is 0 */}
            <View
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
                onLayout={(e) => {
                    const h = e.nativeEvent.layout.height;
                    // Animate height changes while open (e.g. "Clear filters" appearing)
                    contentHeight.value = open
                        ? withTiming(h, { duration: 150 })
                        : h;
                }}
            >
                <ColView className="gap-2 px-4">
                    <ChipRow
                        title="Status"
                        options={STATUS_OPTIONS}
                        value={filters.status}
                        onChange={(v) =>
                            onChange("status", v as Filters["status"])
                        }
                    />
                    <ChipRow
                        title="Category"
                        options={CATEGORY_OPTIONS}
                        value={filters.category}
                        onChange={(v) => onChange("category", v)}
                    />
                    <ChipRow
                        title="Priority"
                        options={PRIORITY_OPTIONS}
                        value={filters.priority}
                        onChange={(v) => onChange("priority", v)}
                    />
                    {activeCount > 0 && (
                        <RowView className="justify-end">
                            <TouchableOpacity
                                onPress={onReset}
                                hitSlop={12}
                                accessibilityRole="button"
                                accessibilityLabel="Clear filters"
                            >
                                <Text className="text-sm text-primary">
                                    Clear filters
                                </Text>
                            </TouchableOpacity>
                        </RowView>
                    )}
                </ColView>
            </View>
        </Animated.View>
    );
}
