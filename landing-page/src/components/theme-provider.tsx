"use client";

import { ThemeProvider as NextThemesProvider } from "@wrksz/themes/next";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
