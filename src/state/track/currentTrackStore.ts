import create from "zustand";
import { Tracks_tracks } from "../../graphql/query/tracks/__generated__/Tracks";

interface State {
  currentTrack: Tracks_tracks | null;
  setCurrentTrack: (track: Tracks_tracks | null) => void;
}

export const useCurrentTrackStore = create<State>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track: Tracks_tracks | null) =>
    set({ currentTrack: track }),
}));
