import create from "zustand";

interface Store {
  visibility: boolean;
  setVisibility: (value: boolean) => void;
}

export const createNoteModalStore = create<Store>((set) => ({
  visibility: false,
  setVisibility: (value: boolean) => set({ visibility: value }),
}));
