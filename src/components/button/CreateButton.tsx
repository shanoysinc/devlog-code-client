import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { Affix } from "antd";

interface Props {
  isModalVisible: boolean;
  setModal: (value: boolean) => void;
  iconColor: string;
}

export const CreateButton = ({
  iconColor,
  isModalVisible,
  setModal,
}: Props) => {
  return (
    <Affix
      offsetBottom={5}
      style={{ right: "2%", bottom: "3%", position: "fixed" }}
    >
      <div
        onClick={() => setModal(!isModalVisible)}
        className="roadmap__timeline__add-button"
      >
        <PlusCircleFilled
          style={{
            fontSize: "3.6em",
            color: iconColor,
          }}
        />
      </div>
    </Affix>
  );
};
