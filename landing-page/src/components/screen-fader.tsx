"use client";

import { APP_IMAGES, SHOT } from "@/constants/app-images";
import { cn } from "cn";
import Image from "next/image";
import { useEffect, useState } from "react";

type Screen = keyof typeof APP_IMAGES;
const SCREENS = Object.keys(APP_IMAGES) as Screen[];

const LABELS: Partial<Record<string, string>> = {
    home: "Home",
    calendar: "Calendar",
    activity: "Activities",
    activityForm: "Activities",
};

export default function ScreenFader({
    interval = 3000,
}: {
    interval?: number;
}) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    // A fresh timer starts after every change, so clicking a dot never gets cut short
    useEffect(() => {
        if (paused || SCREENS.length < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const id = window.setTimeout(
            () => setIndex((i) => (i + 1) % SCREENS.length),
            interval,
        );
        return () => window.clearTimeout(id);
    }, [index, paused, interval]);

    return (
        <div
            className="flex flex-col items-center gap-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            {/* Every screen is stacked in the same box; only the active one is visible */}
            <div
                className="relative w-full"
                style={{ aspectRatio: `${SHOT.width} / ${SHOT.height}` }}
            >
                {SCREENS.map((key, i) => {
                    const active = i === index;
                    const { light, dark, alt } = APP_IMAGES[key];
                    return (
                        <div
                            key={key}
                            aria-hidden={!active}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-700 ease-in-out motion-reduce:transition-none",
                                active ? "opacity-100" : "opacity-0",
                            )}
                        >
                            <Image
                                src={light}
                                alt={
                                    active
                                        ? (alt ??
                                          `${LABELS[key] ?? key} screen`)
                                        : ""
                                }
                                fill
                                sizes="260px"
                                className="object-contain dark:hidden"
                            />
                            <Image
                                src={dark}
                                alt=""
                                aria-hidden="true"
                                fill
                                sizes="260px"
                                className="hidden object-contain dark:block"
                            />
                        </div>
                    );
                })}
            </div>

            <div
                role="group"
                aria-label="App screens"
                className="hidden items-center"
            >
                {SCREENS.map((key, i) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Show ${LABELS[key] ?? key} screen`}
                        aria-current={i === index}
                        className="cursor-pointer p-1.5"
                    >
                        <span
                            className={cn(
                                "block h-2 rounded-full transition-all duration-300",
                                i === index
                                    ? "w-6 bg-primary"
                                    : "w-2 bg-border",
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
