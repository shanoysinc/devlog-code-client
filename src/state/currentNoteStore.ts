import create from "zustand";
import { Notes_notes } from "../graphql/query/notes/__generated__/Notes";

interface State {
  currentNote: Notes_notes | null;
  modifyNote: boolean;
  setCurrentNote: (note: Notes_notes | null) => void;
  setModifyNote: (value: boolean) => void;
}

export const useCurrentNoteStore = create<State>((set) => ({
  currentNote: null,
  modifyNote: false,
  setCurrentNote: (note: Notes_notes | null) => set({ currentNote: note }),
  setModifyNote: (value: boolean) => set({ modifyNote: value }),
}));
