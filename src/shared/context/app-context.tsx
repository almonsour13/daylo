import "@/global.css";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import "react-native-reanimated";
import * as backgroundService from "@/services/background/task-manager";
import { notificationService } from "@/services/notifications/notification-service";
import {
    handleInitialNotification,
    registerNotificationHandlers,
} from "@/services/notifications/notification-service-handlers";

interface AppContextType {}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const bootstrap = async () => {
            await notificationService.setupAndroidChannel();
            await notificationService.requestPermissions();
            await handleInitialNotification();
            await backgroundService.registerBackgroundTasks();
        };
        bootstrap();

        const cleanup = registerNotificationHandlers();
        return cleanup;
    }, []);

    return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAddContext must be used within an AddProvider");
    }
    return context;
}
