import { Skeleton, Card, Timeline } from "antd";
import { EditFilled } from "@ant-design/icons";

import React from "react";

interface Props {
  loading: boolean;
}
const { Item } = Timeline;

export const CardSkeleton = ({ loading }: Props) => {
  const notes = [1, 2, 3, 4, 5];
  return (
    <Timeline className="timeline">
      {notes.map((note) => (
        <Item
          key={note}
          dot={
            <EditFilled
              style={{
                fontSize: "22px",
                color: "#6B7280",
              }}
            />
          }
        >
          <Card
            style={{
              backgroundColor: "#1A1D28",
            }}
            bordered={false}
            size="small"
            className="timeline__card"
          >
            <Skeleton active loading={loading} paragraph={{ rows: 3 }} />
          </Card>
        </Item>
      ))}
    </Timeline>
  );
};
