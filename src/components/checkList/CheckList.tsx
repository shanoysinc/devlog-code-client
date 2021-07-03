import React from "react";
import { Collapse, Checkbox } from "antd";
import { EditFilled, CloseCircleFilled } from "@ant-design/icons";
import { Tracks_tracks_checkList } from "../../graphql/query/tracks/__generated__/Tracks";
import { useMutation } from "@apollo/client";
import { UPDATE_CHECKLIST } from "../../graphql/mutation/updateChecklist/UpdateChecklistMutation";
import {
  UpdateCheckList as UpdateCheckListData,
  UpdateCheckListVariables,
} from "../../graphql/mutation/updateChecklist/__generated__/UpdateCheckList";
import { TRACKS_QUERY } from "../../graphql/query/tracks/tracksQuery";
import { useCurrentTrackStore } from "../../state/track/currentTrackStore";
import { DELETE_CHECKLIST_MUTATION } from "../../graphql/mutation";
import {
  DeleteCheckList as DeleteCheckListData,
  DeleteCheckListVariables,
} from "../../graphql/mutation/checklist/deleteChecklist/__generated__/DeleteCheckList";

interface Props {
  inProgressList: Tracks_tracks_checkList[];
  completedList: Tracks_tracks_checkList[];
  setEditTask: (value: boolean) => void;
  editTask: boolean;
  setCheckListTask: (task: { id: string | null; name: string }) => void;
}
const { Panel } = Collapse;

const CheckList = ({
  completedList,
  inProgressList,
  editTask,
  setEditTask,
  setCheckListTask,
}: Props) => {
  const { setCurrentTrack, currentTrack } = useCurrentTrackStore((state) => ({
    setCurrentTrack: state.setCurrentTrack,
    currentTrack: state.currentTrack,
  }));
  const [updateCheckList] = useMutation<
    UpdateCheckListData,
    UpdateCheckListVariables
  >(UPDATE_CHECKLIST, {
    onCompleted: (data) => {
      if (currentTrack) {
        const newCheckList = currentTrack.checkList.filter(
          (task) => task.id !== data.updateCheckList.id
        );
        newCheckList.unshift(data.updateCheckList);
        setCurrentTrack({ ...currentTrack, checkList: newCheckList });
      }
    },
  });

  const [deleteCheckListItem] = useMutation<
    DeleteCheckListData,
    DeleteCheckListVariables
  >(DELETE_CHECKLIST_MUTATION, {
    onCompleted: (data) => {
      if (currentTrack) {
        const newCheckList = currentTrack.checkList.filter(
          (task) => task.id !== data.deleteCheckList.id
        );
        setCurrentTrack({ ...currentTrack, checkList: newCheckList });
      }
    },
  });

  const updateCheckListHandler = (checkList: Tracks_tracks_checkList) => {
    const { id, isComplete, name } = checkList;

    updateCheckList({
      variables: { input: { id, isComplete, name } },
      refetchQueries: [{ query: TRACKS_QUERY }],
    });
  };
  const editCheckListHandler = (task: Tracks_tracks_checkList) => {
    setEditTask(true);
    setCheckListTask({ id: task.id, name: task.name });
  };
  const deleteCheckListHandler = (id: string) => {
    deleteCheckListItem({
      variables: { input: { id } },
      refetchQueries: [{ query: TRACKS_QUERY }],
    });
  };
  return (
    <Collapse defaultActiveKey={["1"]} ghost>
      <Panel
        header={`In Progress Item ( ${inProgressList.length} )`}
        key="1"
        style={{ fontSize: "1.2rem" }}
      >
        <div className="track-checklist__items">
          {inProgressList.map((item) => (
            <div className="track-checklist__items-container" key={item.id}>
              <Checkbox
                onChange={() => updateCheckListHandler(item)}
                style={{ margin: 0 }}
                defaultChecked={item.isComplete}
              >
                {item.name}
              </Checkbox>
              <div className="track-checklist__items-options">
                <EditFilled
                  onClick={() => editCheckListHandler(item)}
                  style={{ cursor: "pointer" }}
                />
                <CloseCircleFilled
                  onClick={() => deleteCheckListHandler(item.id)}
                  style={{ color: "#DC2626", cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel
        header={`Completed Item ( ${completedList.length} )`}
        style={{ fontSize: "1.2rem" }}
        key="2"
      >
        <div className="track-checklist__items">
          {completedList.map((item) => (
            <div className="track-checklist__items-container" key={item.id}>
              <Checkbox
                defaultChecked={item.isComplete}
                onChange={() => updateCheckListHandler(item)}
                style={{ margin: 0 }}
              >
                {item.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};

export default CheckList;
