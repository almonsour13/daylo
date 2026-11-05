import Icon from "@/shared/components/ui/Icon";
import { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Icon>["name"];

export type SettingsItemType = "nav" | "toggle";

export type SettingsItem = {
    id: string;
    label: string;
    description?: string;
    icon: IconName;
    value?: string | boolean;
    onPress?: () => void;
    danger?: boolean;
    type?: SettingsItemType;
    visible?: boolean;
    disabled?: boolean;
    dimWhenDisabled?: boolean;
    readOnly?: boolean;
};

export type SettingsSection = {
    title: string;
    items: SettingsItem[];
};
