import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: 1 },
    },
});

import { focusManager } from "@tanstack/react-query";
import { AppState } from "react-native";

AppState.addEventListener("change", (status) => {
    focusManager.setFocused(status === "active");
});
