import { useActivityMutations } from "@/features/activity/hooks/use-activity-mutation";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { NavigationProp } from "@/shared/types/navigation";
import { cn } from "@/shared/utils/cn";
import { useNavigation } from "@react-navigation/native";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";

export type ActivityActionDrawerHandle = DrawerHandle & {
    openWithActivityId: (id: string) => void;
};

type ActionKey = "edit" | "delete" | "restore" | "permanent-delete";

type Props = {
    /** "default" = active items, "trash" = recently deleted items */
    variant?: "default" | "trash";
    /** Action keys to hide, e.g. ["edit"] */
    hide_action?: string[];
    onClose?: (action?: string) => void;
};

type CardAction = {
    key: ActionKey;
    label: string;
    onPress: () => void;
    danger?: boolean;
    visible: boolean;
};

const ActivityActionDrawer = forwardRef<ActivityActionDrawerHandle, Props>(
    ({ variant = "default", hide_action, onClose }, ref) => {
        const navigation = useNavigation<NavigationProp>();
        const drawerRef = useRef<DrawerHandle>(null);
        const [activityId, setActivityId] = useState("");
        const { deleteActivity, restoreActivities, permanentDeleteActivity } =
            useActivityMutations();

        useImperativeHandle(ref, () => ({
            open: () => drawerRef.current?.open(),
            close: () => {
                drawerRef.current?.close();
                onClose?.();
            },
            openWithActivityId: (id: string) => {
                setActivityId(id);
                drawerRef.current?.open();
            },
        }));

        const finish = (action: ActionKey) => {
            drawerRef.current?.close();
            onClose?.(action);
        };

        // Mutations already show an error toast, so just swallow the rejection
        const run = async (fn: () => Promise<unknown>, action: ActionKey) => {
            try {
                await fn();
                finish(action);
            } catch {}
        };

        const isTrash = variant === "trash";

        const CARD_ACTIONS: CardAction[] = [
            {
                key: "edit",
                label: "Edit",
                visible: !isTrash,
                onPress: () => {
                    navigation.navigate("ActivityFormScreen", { activityId });
                    finish("edit");
                },
            },
            {
                key: "delete",
                label: "Delete",
                danger: true,
                visible: !isTrash,
                onPress: () =>
                    Alert.alert(
                        "Delete activity?",
                        "It will be moved to Recently Deleted.",
                        [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Delete",
                                style: "destructive",
                                onPress: () =>
                                    run(
                                        () => deleteActivity(activityId),
                                        "delete",
                                    ),
                            },
                        ],
                    ),
            },
            {
                key: "restore",
                label: "Restore",
                visible: isTrash,
                onPress: () =>
                    run(() => restoreActivities([activityId]), "restore"),
            },
            {
                key: "permanent-delete",
                label: "Delete forever",
                danger: true,
                visible: isTrash,
                onPress: () =>
                    Alert.alert(
                        "Delete permanently?",
                        "This activity will be gone forever.",
                        [
                            { text: "Cancel", style: "cancel" },
                            {
                                text: "Delete",
                                style: "destructive",
                                onPress: () =>
                                    run(
                                        () =>
                                            permanentDeleteActivity(activityId),
                                        "permanent-delete",
                                    ),
                            },
                        ],
                    ),
            },
        ];

        const actions = CARD_ACTIONS.filter(
            (a) => a.visible && !hide_action?.includes(a.key),
        );

        return (
            <Drawer ref={drawerRef}>
                <ColView className="gap-1 py-4">
                    {actions.map((action) => (
                        <TouchableOpacity
                            key={action.key}
                            onPress={action.onPress}
                            accessibilityRole="button"
                            className="px-8 h-14 justify-center"
                        >
                            <RowView className="justify-between">
                                <Text
                                    className={cn(
                                        "text-lg",
                                        action.danger && "text-destructive",
                                    )}
                                >
                                    {action.label}
                                </Text>
                            </RowView>
                        </TouchableOpacity>
                    ))}
                </ColView>
            </Drawer>
        );
    },
);

export default ActivityActionDrawer;
