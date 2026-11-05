"use client";

import { ALL_APP_IMAGES } from "@/constants/app-images";
import { useEffect, useRef } from "react";

export function usePreloadAppImages() {
    const cache = useRef<HTMLImageElement[]>([]);

    useEffect(() => {
        cache.current = ALL_APP_IMAGES.map((src) => {
            const img = new window.Image();
            img.decoding = "async";
            img.src = src;
            return img;
        });
    }, []);
}
