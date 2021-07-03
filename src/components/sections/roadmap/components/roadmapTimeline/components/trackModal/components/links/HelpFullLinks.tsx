import React from "react";
import { Tracks_tracks } from "../../../../../../../../../graphql/query/tracks/__generated__/Tracks";
import { LinkList, ResourceLinkForm } from "./components";

interface Props {
  currentTrack: Tracks_tracks | null;
}

const HelpFullLinks = ({ currentTrack }: Props) => {
  return (
    <div className="modal__items-container resourceLink__container">
      <ResourceLinkForm currentTrackId={currentTrack?.id} />
      <LinkList currentTrackId={currentTrack?.id} />
    </div>
  );
};

export default HelpFullLinks;
