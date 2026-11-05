import { useMemo, useSyncExternalStore } from "react";

const TICK_MS = 60_000;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let current = Date.now();

function subscribe(listener: () => void) {
    listeners.add(listener);
    if (!timer) {
        current = Date.now(); // never start from a stale value
        timer = setInterval(() => {
            current = Date.now();
            listeners.forEach((l) => l());
        }, TICK_MS);
    }
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && timer) {
            clearInterval(timer);
            timer = null;
        }
    };
}

export function useNow() {
    const ms = useSyncExternalStore(
        subscribe,
        () => current,
        () => current,
    );
    return useMemo(() => new Date(ms), [ms]);
}
