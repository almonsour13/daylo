import "@/global.css";
import { db, expoDb } from "@/db";
import migrations from "@/db/migrations/migrations";
import { Stack } from "expo-router";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { StatusBar } from "expo-status-bar";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "react-native-reanimated";

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

    // ✅ block render until migrations complete
    // if (error) {
    //     return (
    //         <View className="flex-1 justify-center items-center">
    //             <Text className="text-red-500">
    //                 Migration error: {error.message}
    //             </Text>
    //         </View>
    //     );
    // }

    // if (!success) {
    //     return (
    //         <View className="flex-1 justify-center items-center">
    //             <Text>Running migrations...</Text>
    //         </View>
    //     );
    // }

    return (
        <>
            <Stack>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
