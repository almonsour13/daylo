// App.tsx
import "@/global.css";
import { queryClient } from "@/shared/lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import OnboardingProvider from "./shared/context/OnboardingContext";
import ThemeProvider from "./shared/providers/ThemeProvider";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <OnboardingProvider>
                <SafeAreaProvider>
                    <QueryClientProvider client={queryClient}>
                        <ThemeProvider>
                            <RootNavigator />
                        </ThemeProvider>
                    </QueryClientProvider>
                </SafeAreaProvider>
            </OnboardingProvider>
        </GestureHandlerRootView>
    );
}
