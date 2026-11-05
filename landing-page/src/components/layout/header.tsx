"use client";
import { useObserveSection } from "@/hooks/use-observe-section";
import { cn } from "@/lib/utils";
import { useTheme } from "@wrksz/themes/client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Row } from "../flex";
import { Button } from "../ui/button";

export const NAV = {
    logo: "/icon.png",
    links: [
        { label: "Home", href: "/" },
        { label: "Features", href: "/#features" },
        { label: "How It Works", href: "/#how-it-works" },
        { label: "FAQ", href: "/#faq" },
    ],
    cta: {
        label: "Get App",
        href: "#download",
    },
};

export default function Header() {
    const pathname = usePathname();
    const { setTheme, resolvedTheme } = useTheme();

    const active = useObserveSection();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);

    return (
        <div className="fixed top-0 z-40 flex h-20 w-full items-center justify-center px-4">
            <motion.div
                aria-hidden
                style={{ opacity: bgOpacity }}
                className="absolute inset-0 bg-background/80 backdrop-blur"
            />
            <div className="relative flex w-full max-w-7xl items-center justify-between">
                <Row className="items-center">
                    <button
                        onClick={() => setOpen(!open)}
                        className="cursor-pointer md:hidden"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        {open ? <X size={32} /> : <Menu size={32} />}
                    </button>
                    <Link href="/">
                        <Row className="items-center md:gap-4">
                            <Image
                                src={NAV.logo}
                                className="cursor-pointer hidden md:block"
                                width={28}
                                height={28}
                                alt="Daylo logo"
                            />
                            <span className="text-2xl font-medium">Daylo</span>
                        </Row>
                    </Link>
                </Row>

                <div className="hidden flex-1 items-center justify-center gap-8 md:flex relative">
                    {NAV.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            aria-current={
                                active === link.href ? "location" : undefined
                            }
                            className={cn(
                                "relative hover:text-primary",
                                active === link.href &&
                                    "font-medium text-primary",
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <Row>
                    <Link href={NAV.cta.href}>
                        <Button size="lg" className="px-4 text-sm text-white">
                            {NAV.cta.label}
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        aria-label="Toggle theme"
                        onClick={() =>
                            setTheme(
                                resolvedTheme === "dark" ? "light" : "dark",
                            )
                        }
                        className="aspect-square p-0"
                    >
                        <Sun size={24} className="hidden dark:block" />
                        <Moon size={24} className="block dark:hidden" />
                    </Button>
                </Row>

                {open && (
                    <div className="absolute left-0 top-16 flex w-56 flex-col gap-1 rounded border bg-background/80 backdrop-blur p-2 shadow-lg md:hidden">
                        {NAV.links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "rounded px-3 py-2 hover:bg-muted",
                                    active === link.href && "text-primary",
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
