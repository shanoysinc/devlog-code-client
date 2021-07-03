import React, { useState } from "react";
import "../../../styles/roadmap.css";
import { Typography } from "antd";
import {
  RoadMapTimeline,
  RoadmapOptions,
  CreateTrackModal,
} from "./components";
import dayjs from "dayjs";
import { CreateButton } from "../../button/CreateButton";

const date = dayjs(new Date()).format("YYYY MMMM DD");
const dateArr = date.split(" ");
const day = dateArr[2];
const month = dateArr[1];

const { Title } = Typography;
export const RoadMap = () => {
  const [createTrackModal, setCreateTrackModal] = useState(false);
  const [timelineOrder, setTimelineOrder] = useState(false);
  return (
    <div className="roadmap__timeline-container">
      <div className="roadmap__timeline-sub-header">
        <div className="roadmap__timeline-title">
          <Title
            className="roadmap__timeline-title"
            level={2}
            style={{ color: "#3ccfcf" }}
          >
            Track's RoadMap
          </Title>
          <h3 className="roadmap__timeline-date">
            {day}. {month}
          </h3>
        </div>
        <RoadmapOptions setTimelineOrder={setTimelineOrder} />
      </div>

      <RoadMapTimeline timelineOrder={timelineOrder} />

      <CreateButton
        iconColor="#ffdc62"
        isModalVisible={createTrackModal}
        setModal={setCreateTrackModal}
      />

      <CreateTrackModal
        createTrackModal={createTrackModal}
        setCreateTrackModal={setCreateTrackModal}
      />
    </div>
  );
};
