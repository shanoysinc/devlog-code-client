import React from "react";
import {
  Typography,
  List,
  Popconfirm,
  Radio,
  RadioChangeEvent,
  Spin,
  message,
} from "antd";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TRACK } from "../../../../../../../../../../../graphql/mutation";
import {
  DeleteTrack as DeleteTrackData,
  DeleteTrackVariables,
} from "../../../../../../../../../../../graphql/mutation/track/deleteTrack/__generated__/DeleteTrack";
import { TRACKS_QUERY } from "../../../../../../../../../../../graphql/query/tracks/tracksQuery";
import { NOTES_QUERY } from "../../../../../../../../../../../graphql/query";
import { useCurrentNoteStore } from "../../../../../../../../../../../state/currentNoteStore";

interface Props {
  hasNotes: boolean;
  trackId: string | undefined;
  setTrackVisibility: (value: boolean) => void;
}

const { Title } = Typography;
export const Dangerzone = ({
  hasNotes,
  trackId,
  setTrackVisibility,
}: Props) => {
  const [deleteNotesValue, setDeleteNotesValue] = useState(false);
  const setCurrentNote = useCurrentNoteStore((state) => state.setCurrentNote);
  const [deleteTrack, { loading }] = useMutation<
    DeleteTrackData,
    DeleteTrackVariables
  >(DELETE_TRACK, {
    onCompleted: () => {
      setTrackVisibility(false);
      setCurrentNote(null);
      message.success("tracks and all related data specified was deleted!");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const data = [
    {
      title: "Delete this Track",
      description:
        "Once you delete a Track, there is no going back. Please be certain.",
    },
  ];

  const onRadioChange = (event: RadioChangeEvent) => {
    setDeleteNotesValue(event.target.value);
  };

  const deleteTrackHandler = () => {
    if (trackId) {
      deleteTrack({
        variables: {
          input: { id: trackId, deleteNotes: deleteNotesValue, hasNotes },
        },
        refetchQueries: [{ query: TRACKS_QUERY }, { query: NOTES_QUERY }],
      });
    }
  };

  return (
    <Spin spinning={loading} tip="deleting track and track data...">
      <div className="danger-zone__container">
        <Title level={3} style={{ fontWeight: 400 }}>
          Danger Zone
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<p>{item.title}</p>}
                description="Once you delete this track, there is no going back. Please be certain"
              />
              <div>
                <Popconfirm
                  placement="topRight"
                  title={"Are you sure you want to delete this track"}
                  onConfirm={deleteTrackHandler}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="danger-button">Delete Track</button>
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
        {hasNotes && (
          <>
            <p className="danger-zone__radio-title">
              Do you want to delete the notes that are link with this track ?
            </p>
            <Radio.Group onChange={onRadioChange} value={deleteNotesValue}>
              <Radio value={false}>no</Radio>
              <Radio value={true}>yes</Radio>
            </Radio.Group>
          </>
        )}
      </div>
    </Spin>
  );
};
