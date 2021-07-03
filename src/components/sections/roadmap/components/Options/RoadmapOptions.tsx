import React, { useState } from "react";
import { Select } from "antd";

interface Props {
  setTimelineOrder: (value: boolean) => void;
}

const { Option } = Select;
export const RoadmapOptions = ({ setTimelineOrder }: Props) => {
  const [orderBy] = useState(["New Last", "New First"]);
  // const [filter, setFilter] = useState(["All", "In Progress", "Completed"]);

  const orderByHandler = (value: string) => {
    let order = value === "New Last" ? false : true;
    setTimelineOrder(order);
  };
  return (
    <>
      <div className="roadmap__timeline-options">
        <Select
          style={{ width: 120 }}
          defaultValue={orderBy[0]}
          bordered={false}
          className="select-options"
          onChange={orderByHandler}
        >
          {orderBy.map((item) => (
            <Option className="select-options" value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
        {/* <Select
          style={{ width: 120 }}
          defaultValue={filter[0]}
          bordered={false}
          className="select-options"
        >
          {filter.map((item) => (
            <Option className="select-options" value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select> */}
      </div>
    </>
  );
};
