import { useSelectedActivitiesStore } from "@/features/activity/store/use-selected-activities.store";
import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import {
    HIDE_ADD_BUTTON_SCREENS,
    SELECTION_SCREEN,
    VISIBLE_TABS,
} from "@/shared/constants/tabs";
import { useSlideVisibility } from "@/shared/hooks/use-slide-visibility";
import { cn } from "@/shared/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { Animated, LayoutChangeEvent, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActiveTabIndicator from "./ActiveTabIndicator";
import AddButton from "./AddButton";
export default function MainTabBar({ state, navigation }: BottomTabBarProps) {
    const currentScreen = state.routes[state.index].name;
    const [tabWidth, setTabWidth] = useState(0);
    const [barHeight, setBarHeight] = useState(100);

    const isSelectionMode = useSelectedActivitiesStore((s) => s.selectionMode);
    const isSelecting = currentScreen === SELECTION_SCREEN && isSelectionMode;

    const showAddButton =
        !HIDE_ADD_BUTTON_SCREENS.includes(currentScreen) && !isSelecting;
    const showTabBar = !isSelecting;

    const { opacity, translateY } = useSlideVisibility(showTabBar, barHeight);

    const onRowLayout = (e: LayoutChangeEvent) =>
        setTabWidth(e.nativeEvent.layout.width / VISIBLE_TABS.length);
    const inset = useSafeAreaInsets();
    return (
        <>
            <Animated.View
                pointerEvents={showTabBar ? "auto" : "none"}
                onLayout={(e) => setBarHeight(e.nativeEvent.layout.height)}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity,
                    transform: [{ translateY }],
                }}
            >
                <Card className="z-10 px-4 py-0 rounded-b-none borader border-b-0 border-border bg-background">
                    <RowView
                        className="w-full justify-evenly items-center h-18 gap-0"
                        onLayout={onRowLayout}
                        style={{
                            marginBottom: inset.bottom,
                        }}
                    >
                        {VISIBLE_TABS.map((tab) => {
                            const isActive = tab.screen === currentScreen;
                            return (
                                <TouchableOpacity
                                    key={tab.label}
                                    onPress={() =>
                                        navigation.navigate(tab.screen)
                                    }
                                    className="relative flex-1 h-full items-center justify-center"
                                    accessibilityRole="button"
                                    accessibilityLabel={tab.label}
                                    accessibilityState={{ selected: isActive }}
                                >
                                    <ColView>
                                        <Ionicons
                                            name={tab.icon}
                                            size={24}
                                            className={cn(
                                                "text-muted-foreground",
                                                isActive && "text-primary",
                                            )}
                                        />
                                    </ColView>
                                </TouchableOpacity>
                            );
                        })}
                        <ActiveTabIndicator
                            tabWidth={tabWidth}
                            currentScreen={currentScreen}
                        />
                    </RowView>
                </Card>
            </Animated.View>
            <AddButton visible={showAddButton} />
        </>
    );
}
