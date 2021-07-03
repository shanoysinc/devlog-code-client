import React from "react";
import { Timeline, Spin, Empty } from "antd";
import { useQuery } from "@apollo/client";
import { Tracks as TracksData } from "../../../../../graphql/query/tracks/__generated__/Tracks";
import { TRACKS_QUERY } from "../../../../../graphql/query/tracks/tracksQuery";
import { CheckCircleFilled } from "@ant-design/icons";
import { isCheckListComplete } from "./utils/isCheckListComplete";
import { Track, TrackModal } from "./components";
import { EmptyIcon } from "../../../../../assets/svgComponent/EmptyIcon";
interface Props {
  timelineOrder: boolean;
}

const { Item } = Timeline;
export const RoadMapTimeline = ({ timelineOrder }: Props) => {
  const { data, loading } = useQuery<TracksData>(TRACKS_QUERY);

  const tracks = data ? data.tracks : null;

  const TracksElement = tracks ? (
    tracks.map((track, index) => {
      const checkListComplete = isCheckListComplete(track.checkList);

      const hasNote =
        checkListComplete && track.notes.length > 0 && track.ratings === 5
          ? "#34D399"
          : "#D1D5DB";

      const itemColorChoice = index % 3 === 0 ? "#4338ca" : "#1d4ed8";
      return (
        <Item
          dot={<CheckCircleFilled style={{ color: hasNote }} />}
          key={track.id}
        >
          <Track track={track} trackColor={itemColorChoice} />
        </Item>
      );
    })
  ) : (
    <div className="empty-icon__girl-on-computer">
      <EmptyIcon />
      <p>
        You currently have no tracks. <br />
        Create a track by clicking the button below.
      </p>
    </div>
  );

  return (
    <Spin
      spinning={loading}
      tip="loading tracks..."
      size="large"
      style={{ position: "fixed", top: "20%" }}
    >
      <div className="roadmap__timeline-container">
        <Timeline
          mode="alternate"
          className="roadmap__timeline"
          reverse={timelineOrder}
        >
          {TracksElement}
          {tracks && tracks.length < 1 && (
            <Empty description="You have not created a Track as yet" />
          )}
        </Timeline>
        <TrackModal />
      </div>{" "}
    </Spin>
  );
};
