import { create } from "zustand";

type ToastState = { id: number; message: string };

export const useToastStore = create<ToastState>(() => ({ id: 0, message: "" }));

const show = (message: string) =>
    useToastStore.setState((s) => ({ id: s.id + 1, message }));

// success / error / info all look the same, like the Android toast
export const toast = { show, success: show, error: show, info: show };
