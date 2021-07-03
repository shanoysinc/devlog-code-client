import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Input, Button, message } from "antd";
import { Tracks_tracks } from "../../../../../../../../../graphql/query/tracks/__generated__/Tracks";
import { UPDATE_TRACK } from "../../../../../../../../../graphql/mutation/updateTrack/updateTrackMutation";
import {
  UpdateTrack as UpdateTrackData,
  UpdateTrackVariables,
} from "../../../../../../../../../graphql/mutation/updateTrack/__generated__/UpdateTrack";
import { TRACKS_QUERY } from "../../../../../../../../../graphql/query/tracks/tracksQuery";
import { openNotificationWithIcon } from "../../../../../../../../../utils/components";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
  currentTrack: Tracks_tracks | null;
}

const { TextArea } = Input;

export const EditTrack = ({ currentTrack }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [updateTrack, { loading }] = useMutation<
    UpdateTrackData,
    UpdateTrackVariables
  >(UPDATE_TRACK, {
    onCompleted: () => {
      message.success("Track successfully updated!");
    },
  });

  useEffect(() => {
    if (currentTrack) {
      setTitle(currentTrack.title);

      if (currentTrack.description) {
        setDescription(currentTrack.description);
      } else {
        setDescription("");
      }
    }
  }, [currentTrack]);

  const updateTrackHandler = () => {
    if (currentTrack) {
      if (title.length < 10) {
        return openNotificationWithIcon({
          description: "Please enter a Title with a character of 10 or more",
          title: "Title Error",
          type: "error",
        });
      }
      updateTrack({
        variables: {
          input: { id: currentTrack.id, title: title, description },
        },
        refetchQueries: [{ query: TRACKS_QUERY }],
      });
    }
  };

  return (
    <div className="modal__items-container">
      <div className="track-modal__title-container">
        <Input
          placeholder="What's the title for your Track"
          onChange={(e) => setTitle(e.target.value)}
          className="input track-modal__title"
          value={title}
          size="middle"
        />
      </div>

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
            backgroundColor: "#1D4ED8",
            color: "white",
            width: "150px",
            border: 0,
          }}
          onClick={updateTrackHandler}
        >
          {loading ? <LoadingOutlined /> : "Update"}
        </Button>
      </div>
    </div>
  );
};
