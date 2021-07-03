import create from "zustand";

interface Store {
  trackVisibility: boolean;
  setTrackVisibility: (value: boolean) => void;
}

export const useTrackModalStore = create<Store>((set) => ({
  trackVisibility: false,
  setTrackVisibility: (value: boolean) => set({ trackVisibility: value }),
}));

interface Store {}
