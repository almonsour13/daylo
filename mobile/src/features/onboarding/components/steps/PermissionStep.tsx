import { Card } from "@/shared/components/ui/Card";
import { ColView, RowView } from "@/shared/components/ui/CustomView";
import Icon from "@/shared/components/ui/Icon";
import Text from "@/shared/components/ui/Text";
import { cn } from "@/shared/utils/cn";
import * as Notifications from "expo-notifications";
import { ComponentProps, Dispatch, SetStateAction, useEffect } from "react";
import { AppState, Linking, TouchableOpacity, View } from "react-native";
import Animated, {
    cancelAnimation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { Permissions } from "../../screens/OnboardingStepsScreen";

type PermissionStatus = "granted" | "denied" | "idle";
type IconName = ComponentProps<typeof Icon>["name"];

// Result of an explicit request: the user has answered, so it's resolved.
const fromRequest = (
    res: Notifications.NotificationPermissionsStatus,
): PermissionStatus => (res.granted ? "granted" : "denied");

// Result of a passive check: undetermined means we haven't asked yet.
const fromCheck = (
    res: Notifications.NotificationPermissionsStatus,
): PermissionStatus =>
    res.granted
        ? "granted"
        : res.status === Notifications.PermissionStatus.UNDETERMINED
          ? "idle"
          : "denied";

function StatusIcon({ status }: { status: PermissionStatus }) {
    if (status === "granted") {
        return (
            <Icon name="checkmark-circle" size={20} className="text-primary" />
        );
    }
    if (status === "denied") {
        return (
            <Icon name="close-circle" size={20} className="text-destructive" />
        );
    }
    return (
        <Icon
            name="ellipse-outline"
            size={20}
            className="text-muted-foreground"
        />
    );
}

type PermissionStepProps = {
    isActive: boolean;
    permissions: Permissions;
    setPermissions: Dispatch<SetStateAction<Permissions>>;
};

export default function PermissionStep({
    isActive,
    permissions,
    setPermissions,
}: PermissionStepProps) {
    const titleProgress = useSharedValue(0);
    const contentProgress = useSharedValue(0);

    useEffect(() => {
        if (!isActive) {
            // Stop and reset so the animation replays next time
            cancelAnimation(titleProgress);
            cancelAnimation(contentProgress);
            titleProgress.value = 0;
            contentProgress.value = 0;
            return;
        }

        titleProgress.value = withTiming(1, { duration: 500 });
        contentProgress.value = withDelay(
            150,
            withTiming(1, { duration: 500 }),
        );
    }, [isActive, titleProgress, contentProgress]);

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleProgress.value,
        transform: [
            { translateY: interpolate(titleProgress.value, [0, 1], [16, 0]) },
        ],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentProgress.value,
        transform: [
            {
                translateY: interpolate(contentProgress.value, [0, 1], [16, 0]),
            },
        ],
    }));

    useEffect(() => {
        if (!isActive || permissions.notifications !== "idle") return;

        let cancelled = false;
        (async () => {
            try {
                const res = await Notifications.requestPermissionsAsync();
                if (cancelled) return;
                setPermissions((prev) => ({
                    ...prev,
                    notifications: fromRequest(res),
                }));
            } catch (e) {
                console.error("[Permissions] Request failed:", e);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [isActive, permissions.notifications, setPermissions]);

    // Re-check when returning from system Settings
    useEffect(() => {
        const sub = AppState.addEventListener("change", async (state) => {
            if (state !== "active") return;
            try {
                const res = await Notifications.getPermissionsAsync();
                setPermissions((prev) => ({
                    ...prev,
                    notifications: fromCheck(res),
                }));
            } catch (e) {
                console.error("[Permissions] Check failed:", e);
            }
        });
        return () => sub.remove();
    }, [setPermissions]);

    const requestNotifications = async () => {
        try {
            const current = await Notifications.getPermissionsAsync();
            if (current.granted) return;
            if (!current.canAskAgain) {
                await Linking.openSettings();
                return;
            }
            const res = await Notifications.requestPermissionsAsync();
            setPermissions((prev) => ({
                ...prev,
                notifications: fromRequest(res),
            }));
        } catch (e) {
            console.error("[Permissions] Request failed:", e);
        }
    };

    const permissionsList: {
        name: string;
        description: string;
        icon: IconName;
        status: PermissionStatus;
        onRequest: () => void;
    }[] = [
        {
            name: "Notifications",
            description: "Get reminders and celebrate when you hit your goal.",
            icon: "notifications" as IconName,
            status: permissions.notifications,
            onRequest: requestNotifications,
        },
    ];

    return (
        <ColView className="flex-1 gap-4">
            <Animated.View style={titleStyle} className="px-4 gap-4">
                <Text
                    accessibilityRole="header"
                    className="text-4xl font-semibold"
                >
                    Allow access{"\n"}to get started
                </Text>
                <Text className="text-base text-muted-foreground leading-relaxed">
                    We need a couple of permissions to keep you on track and
                    motivated.
                </Text>
            </Animated.View>

            <Animated.View style={contentStyle} className="px-4 gap-2">
                {permissionsList.map(
                    ({ name, description, icon, status, onRequest }) => {
                        const isDenied = status === "denied";
                        const isGranted = status === "granted";

                        return (
                            <TouchableOpacity
                                key={name}
                                onPress={onRequest}
                                disabled={isGranted}
                                accessibilityRole="button"
                                accessibilityLabel={`${name} permission`}
                                accessibilityState={{ disabled: isGranted }}
                            >
                                <Card
                                    className={cn(
                                        "justify-center min-h-18",
                                        isDenied && "opacity-70",
                                    )}
                                >
                                    <RowView className="items-center gap-3">
                                        <View className="bg-muted h-10 w-10 items-center justify-center rounded">
                                            <Icon
                                                name={icon}
                                                size={20}
                                                className="text-primary"
                                            />
                                        </View>
                                        <ColView className="flex-1 gap-0.5">
                                            <Text className="font-medium">
                                                {name}
                                            </Text>
                                            <Text className="text-xs text-muted-foreground">
                                                {isDenied
                                                    ? "Permission denied. Tap to open Settings."
                                                    : description}
                                            </Text>
                                        </ColView>
                                        <StatusIcon status={status} />
                                    </RowView>
                                </Card>
                            </TouchableOpacity>
                        );
                    },
                )}
            </Animated.View>
        </ColView>
    );
}
