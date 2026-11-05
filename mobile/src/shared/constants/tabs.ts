import { Ionicons } from "@expo/vector-icons";

export type TabConfig = {
    label: string;
    screen: string;
    icon: keyof typeof Ionicons.glyphMap;
};

export const VISIBLE_TABS: TabConfig[] = [
    { label: "Home", screen: "HomeScreen", icon: "home" },
    { label: "Calendar", screen: "CalendarScreen", icon: "calendar" },
    { label: "Activity", screen: "ActivityScreen", icon: "newspaper" },
    { label: "Settings", screen: "Settings", icon: "settings" },
];

export const HIDE_ADD_BUTTON_SCREENS = ["CalendarScreen"];
export const SELECTION_SCREEN = "ActivityScreen";
