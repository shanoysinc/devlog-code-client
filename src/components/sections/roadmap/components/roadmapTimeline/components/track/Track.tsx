import React, { useMemo } from "react";
import {
  CheckCircleFilled,
  StarFilled,
  FileTextFilled,
  PushpinFilled,
} from "@ant-design/icons";
import { useTrackModalStore } from "../../../../../../../state/track/trackModalStore";
import { useCurrentTrackStore } from "../../../../../../../state/track/currentTrackStore";
import { Tracks_tracks } from "../../../../../../../graphql/query/tracks/__generated__/Tracks";
import dayjs from "dayjs";
import relativeTIME from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTIME);

interface Props {
  track: Tracks_tracks;
  trackColor: string;
}
export const Track = ({ track, trackColor }: Props) => {
  const { setTrackVisibility, trackVisibility } = useTrackModalStore(
    (state) => ({
      trackVisibility: state.trackVisibility,
      setTrackVisibility: state.setTrackVisibility,
    })
  );
  const setCurrentTrack = useCurrentTrackStore(
    (state) => state.setCurrentTrack
  );

  const trackModalHandler = (track: Tracks_tracks) => {
    setCurrentTrack(track);
    setTrackVisibility(!trackVisibility);
  };

  const isCheckListComplete =
    track.checkList.length > 0
      ? track.checkList.every((item) => item.isComplete === true)
      : false;

  const notesLength = track.notes.length;
  const hasNote = notesLength > 0 ? "#34D399" : "#D1D5DB";

  const timeCreated = useMemo(
    () => dayjs(track.createdAt).fromNow(),
    [track.createdAt]
  );

  return (
    <>
      <div
        className="roadmap__timeline-card"
        style={{ backgroundColor: trackColor }}
        onClick={() => trackModalHandler(track)}
      >
        <div className="roadmap__timeline-card-title-container">
          <p className="roadmap__timeline-card-title">{track.title}</p>
          {track.ratings === 5 && <StarFilled style={{ color: "#ffdc62" }} />}
        </div>
        <div className="roadmap__timeline-card__footer">
          <div className="roadmap__timeline-card__details">
            <div className="roadmap__timeline-card__details-item">
              <div>
                <FileTextFilled style={{ color: hasNote }} />
              </div>
              <p className="roadmap__timeline-card__details-text">
                {notesLength}
              </p>
            </div>

            <div className="roadmap__timeline-card__details-item">
              <div>
                <CheckCircleFilled
                  style={{
                    color: isCheckListComplete ? "#34D399" : "#D1D5DB",
                  }}
                />
              </div>
              <p className="roadmap__timeline-card__details-text">
                {track.checkList.length}
              </p>
            </div>
            <div className="roadmap__timeline-card__details-item">
              <div>
                <PushpinFilled />
              </div>
              <p className="roadmap__timeline-card__details-text">
                {track.resourceLinks.length}
              </p>
            </div>
          </div>
          <div className="roadmap__timeline-card__createdAt">
            <p>{timeCreated}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Track;
