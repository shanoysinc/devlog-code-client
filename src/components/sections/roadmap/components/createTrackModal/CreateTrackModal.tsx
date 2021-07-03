import React, { useState } from "react";
import { Modal, Typography, Input, Button, message } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_TRACK_MUTATION } from "../../../../../graphql/mutation";
import {
  CreateTrack as CreateTrackData,
  CreateTrackVariables,
} from "../../../../../graphql/mutation/createTrack/__generated__/CreateTrack";
import { TRACKS_QUERY } from "../../../../../graphql/query/tracks/tracksQuery";
import { openNotificationWithIcon } from "../../../../../utils/components";

interface Props {
  createTrackModal: boolean;
  setCreateTrackModal: (value: boolean) => void;
}

const { Title } = Typography;
const { TextArea } = Input;

export const CreateTrackModal = ({
  createTrackModal,
  setCreateTrackModal,
}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTrack, { loading }] = useMutation<
    CreateTrackData,
    CreateTrackVariables
  >(CREATE_TRACK_MUTATION, {
    onCompleted: () => {
      message.success("Track succesfully created!");
      setTitle("");
    },
  });

  const createTrackHandler = () => {
    if (title.length < 10) {
      return openNotificationWithIcon({
        description: "Please enter a Title with a character of 10 or more",
        title: "Title Error",
        type: "error",
      });
    }
    createTrack({
      variables: { input: { title, description } },
      refetchQueries: [{ query: TRACKS_QUERY }],
    });
    onCancelHandler();
  };
  const onCancelHandler = () => {
    setCreateTrackModal(false);
  };
  return (
    <Modal
      visible={createTrackModal}
      onCancel={onCancelHandler}
      className="modal"
      footer={null}
      bodyStyle={{ backgroundColor: "#13141b" }}
      width={400}
    >
      <div>
        <Title level={3}>Create Your Track</Title>
        <Input
          placeholder="What's the title for your Track"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          value={title}
          size="large"
        />
        <div style={{ margin: "10px 0" }} />
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a more detail description"
          autoSize={{ minRows: 3, maxRows: 5 }}
          className="input"
        />

        <div className="create-btn">
          <Button
            size="large"
            style={{
              backgroundColor: "#4338ca",
              color: "white",
              width: "150px",
              border: 0,
            }}
            disabled={loading}
            onClick={createTrackHandler}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
