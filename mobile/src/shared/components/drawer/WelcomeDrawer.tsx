import { Card } from "@/shared/components/ui/Card";
import { ColView } from "@/shared/components/ui/CustomView";
import Drawer, { DrawerHandle } from "@/shared/components/ui/Drawer";
import Text from "@/shared/components/ui/Text";
import { STORAGE_KEYS } from "@/shared/constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useEffect, useRef } from "react";
import { Image, TouchableOpacity } from "react-native";

const LOGO = require("../../../../assets/images/splash-icon.png");
const APP_NAME = Constants.expoConfig?.name ?? "the app";

export default function WelcomeDrawer() {
    const drawerRef = useRef<DrawerHandle>(null);

    useEffect(() => {
        let cancelled = false;
        let timeout: ReturnType<typeof setTimeout> | undefined;

        (async () => {
            try {
                const seen = await AsyncStorage.getItem(STORAGE_KEYS.welcome);
                if (seen || cancelled) return;
                timeout = setTimeout(() => drawerRef.current?.open(), 500);
            } catch (e) {
                console.error("[Welcome] Failed to read status:", e);
            }
        })();

        return () => {
            cancelled = true;
            if (timeout) clearTimeout(timeout);
        };
    }, []);

    // Runs whenever the drawer closes (button, swipe, backdrop)
    const markSeen = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.welcome, "true");
        } catch (e) {
            console.error("[Welcome] Failed to save status:", e);
        }
    };

    return (
        <Drawer ref={drawerRef} onClose={markSeen}>
            <ColView className="gap-12 p-4">
                <ColView className="justify-center items-center mt-8">
                    <Image
                        source={LOGO}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                        accessibilityIgnoresInvertColors
                        accessible={false}
                    />
                </ColView>
                <ColView className="items-center gap-2">
                    <Text
                        accessibilityRole="header"
                        className="text-4xl font-medium text-center"
                    >
                        Welcome to {APP_NAME}!
                    </Text>
                    <Text className="text-base text-muted-foreground text-center leading-relaxed">
                        You're all set. Add your first activity and start
                        planning your day.
                    </Text>
                </ColView>
                <TouchableOpacity
                    onPress={() => drawerRef.current?.close()}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel="Let's go"
                >
                    <Card className="h-16 justify-center items-center bg-primary">
                        <Text className="text-white text-lg font-medium">
                            Let's Go
                        </Text>
                    </Card>
                </TouchableOpacity>
            </ColView>
        </Drawer>
    );
}
