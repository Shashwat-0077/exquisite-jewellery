import { create } from "zustand";

// NOTE : Look into context and all for next.js
// reference path="https://docs.pmnd.rs/zustand/guides/nextjs"

type NavStore = {
    isVisible: boolean;
    setIsVisible: (param_val: boolean) => void;
};

export const useNavStore = create<NavStore>()((set) => ({
    isVisible: true,
    setIsVisible: (val: boolean) => set(() => ({ isVisible: val })),
}));
