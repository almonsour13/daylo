import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PreloadAppImages from "@/components/preload-app-images";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-dm-sans",
});

// Set NEXT_PUBLIC_SITE_URL in production so social previews use absolute URLs
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE = "Daylo — Offline-First Mobile Planner & Activity Tracker";
const DESCRIPTION =
    "Manage your daily schedule, flexible recurring routines, and offline data privacy with zero cloud bloat. Built with Expo, SQLite, and Drizzle ORM.";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: "%s | Daylo" },
    description: DESCRIPTION,
    keywords: [
        "Daylo",
        "mobile planner",
        "offline planner",
        "activity tracker",
        "Expo",
        "SQLite",
        "React Native",
        "Drizzle ORM",
    ],
    authors: [{ name: "Al-Monsour M. Salida" }],
    openGraph: {
        title: "Daylo — Offline-First Mobile Planner",
        description:
            "Your schedule stays on your phone. Secure, lightweight, and completely private offline activity tracking.",
        type: "website",
        locale: "en_US",
        siteName: "Daylo",
        url: "/",
    },
    twitter: {
        card: "summary_large_image",
        title: "Daylo — Offline-First Mobile Planner",
        description: "Your schedule stays on your phone.",
    },
    icons: { icon: "/icon.png" },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${dmSans.variable} ${dmSans.className} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="relative flex min-h-full flex-col gap-24 bg-background">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <a
                        href="#main"
                        className="sr-only rounded bg-background px-4 py-2 text-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
                    >
                        Skip to content
                    </a>
                    <PreloadAppImages />
                    <Header />
                    <main id="main" className="flex flex-1 flex-col">
                        {children}
                    </main>
                    <Footer />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-linear-to-t from-primary/10 to-transparent to-80%"
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
