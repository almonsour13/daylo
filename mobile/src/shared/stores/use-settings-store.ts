import { create } from "zustand";
import { PREFERENCE_DEFAULTS } from "../constants/preferences";
import { Preferences, Settings, ThemeMode } from "../types/type";

type SettingsStore = {
    settings: Settings;
    setSettings: (settings: Settings | null) => void;
    updatePreferences: (partial: Partial<Preferences>) => void;
    setTheme: (theme: ThemeMode) => void;
};

const withDefaults = (settings?: Partial<Settings> | null): Settings => ({
    ...settings,
    preferences: {
        ...PREFERENCE_DEFAULTS,
        ...settings?.preferences,
    },
});

export const useSettingsStore = create<SettingsStore>((set, get) => ({
    settings: withDefaults(),

    setSettings: (settings) => set({ settings: withDefaults(settings) }),

    updatePreferences: (partial) =>
        set((state) => ({
            settings: withDefaults({
                ...state.settings,
                preferences: { ...state.settings.preferences, ...partial },
            }),
        })),

    // convenience wrapper, delegates to updatePreferences
    setTheme: (theme) => get().updatePreferences({ theme }),
}));
