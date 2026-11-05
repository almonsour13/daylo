import { create } from "zustand";

type SelectedActivitiesStore = {
    selectionMode: boolean;
    setSelectionMode: (value: boolean) => void;
    toggleSelectionMode: () => void;
    selectedActivities: string[];
    toggle: (id: string) => void;
    selectAll: (ids: string[]) => void;
    deselectAll: () => void;
    clear: () => void;
    prune: (validIds: string[]) => void;
};

export const useSelectedActivitiesStore = create<SelectedActivitiesStore>(
    (set) => ({
        selectionMode: false,
        selectedActivities: [],
        setSelectionMode: (value) =>
            set(
                value
                    ? { selectionMode: true }
                    : { selectionMode: false, selectedActivities: [] },
            ),

        toggleSelectionMode: () =>
            set((state) =>
                state.selectionMode
                    ? { selectionMode: false, selectedActivities: [] }
                    : { selectionMode: true },
            ),

        toggle: (id) =>
            set((state) => ({
                selectionMode: true,
                selectedActivities: state.selectedActivities.includes(id)
                    ? state.selectedActivities.filter((item) => item !== id)
                    : [...state.selectedActivities, id],
            })),

        selectAll: (ids) =>
            set({ selectionMode: true, selectedActivities: ids }),

        deselectAll: () => set({ selectedActivities: [] }),

        clear: () => set({ selectionMode: false, selectedActivities: [] }),

        prune: (validIds) =>
            set((state) => {
                const valid = new Set(validIds);
                const next = state.selectedActivities.filter((id) =>
                    valid.has(id),
                );
                return next.length === state.selectedActivities.length
                    ? state
                    : { selectedActivities: next };
            }),
    }),
);
