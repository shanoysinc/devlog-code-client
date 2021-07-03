import React from "react";
import { Tracks_tracks } from "../../../../../../../../../graphql/query/tracks/__generated__/Tracks";
import { Dangerzone } from "./components";

interface Props {
  currentTrack: Tracks_tracks | null;
  setTrackVisibility: (value: boolean) => void;
}
export const Settings = ({ currentTrack, setTrackVisibility }: Props) => {
  const hasNotes = currentTrack && currentTrack.notes.length > 0 ? true : false;
  return (
    <div className="modal__items-container">
      <Dangerzone
        trackId={currentTrack?.id}
        hasNotes={hasNotes}
        setTrackVisibility={setTrackVisibility}
      />
    </div>
  );
};
