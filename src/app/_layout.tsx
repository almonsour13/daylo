import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "react-native-reanimated";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { expoDb } from "@/db";
import { db } from "@/db";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/db/migrations/migrations";

export const unstable_settings = {
    anchor: "(tabs)",
};

export default function RootLayout() {
    const { setColorScheme } = useColorScheme();
    useDrizzleStudio(expoDb);
    const { success, error } = useMigrations(db, migrations);

    console.log("[migrations] success:", success, "error:", error);

    useEffect(() => {
        setColorScheme("light");
    }, []);

    return (
        <>
            <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
