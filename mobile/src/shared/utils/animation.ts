import {
    FadeIn,
    FadeInDown,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

const ENTER_MS = 250;
const EXIT_MS = 150;
const STAGGER_MS = 40;
const MAX_STAGGER_ITEMS = 8; // cap so long lists don't take forever to appear

/** Staggered fade + slide-up for list items. */
export const itemEntering = (index: number) =>
    FadeInDown.duration(ENTER_MS).delay(
        Math.min(index, MAX_STAGGER_ITEMS) * STAGGER_MS,
    );

export const itemExiting = FadeOut.duration(EXIT_MS);

/** Smoothly moves siblings when an item is added or removed. */
export const itemLayout = LinearTransition.duration(200);

/** For state swaps (error, empty state, etc). */
export const stateEntering = FadeIn.duration(ENTER_MS);
export const stateExiting = FadeOut.duration(EXIT_MS);
