import React, { FormEvent, useEffect, useState } from "react";
import {
  Tracks_tracks,
  Tracks_tracks_checkList,
} from "../../../../../../../../../graphql/query/tracks/__generated__/Tracks";
import CheckList from "../../../../../../../../checkList/CheckList";
import { Typography, Input } from "antd";
import { useMutation } from "@apollo/client";
import {
  CREATE_CHECKLIST_MUTATION,
  EDIT_CHECKLIST_MUTATION,
} from "../../../../../../../../../graphql/mutation";
import {
  EditCheckList as EditCheckListData,
  EditCheckListVariables,
} from "../../../../../../../../../graphql/mutation/checklist/editChecklist/__generated__/EditCheckList";
import {
  CreateCheckList as CreateCheckListData,
  CreateCheckListVariables,
} from "../../../../../../../../../graphql/mutation/createCheckList/__generated__/CreateCheckList";
import { TRACKS_QUERY } from "../../../../../../../../../graphql/query/tracks/tracksQuery";
import { useClickOutSide } from "../../../../../../../../../hooks/useClickOutSide";

interface Props {
  setCurrentTrack: (track: Tracks_tracks) => void;
  currentTrack: Tracks_tracks | null;
}
const { Title } = Typography;

export const CheckListItems = ({ currentTrack, setCurrentTrack }: Props) => {
  const [editTask, setEditTask] = useState(false);
  const [checkListTask, setCheckListTask] = useState<{
    id: string | null;
    name: string;
  }>({ id: null, name: "" });
  const [inProgressList, setInProgressList] = useState<
    Tracks_tracks_checkList[]
  >([]);
  const [completedList, setCompletedList] = useState<Tracks_tracks_checkList[]>(
    []
  );

  const [createCheckList] = useMutation<
    CreateCheckListData,
    CreateCheckListVariables
  >(CREATE_CHECKLIST_MUTATION, {
    onCompleted: (data) => {
      if (currentTrack) {
        const oldCheckList = currentTrack.checkList;
        setCurrentTrack({
          ...currentTrack,
          checkList: [data.createCheckList, ...oldCheckList],
        });
      }
    },
  });

  const [editCheckList] = useMutation<
    EditCheckListData,
    EditCheckListVariables
  >(EDIT_CHECKLIST_MUTATION, {
    onCompleted: (data) => {
      if (currentTrack) {
        const tasks = currentTrack.checkList.filter(
          (task) => task.id !== data.editCheckList.id
        );

        setCurrentTrack({
          ...currentTrack,
          checkList: [data.editCheckList, ...tasks],
        });
      }
    },
  });

  const checkList = currentTrack?.checkList ? currentTrack.checkList : null;
  useEffect(() => {
    if (checkList) {
      let notComplete: Tracks_tracks_checkList[] = [];
      let complete: Tracks_tracks_checkList[] = [];
      checkList.forEach((item) => {
        if (item.isComplete) {
          complete.push(item);
        } else {
          notComplete.push(item);
        }
      });
      setCompletedList([...complete]);
      setInProgressList([...notComplete]);
    }
  }, [checkList]);

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (currentTrack) {
      if (editTask && checkListTask.id) {
        editCheckList({
          variables: {
            input: { id: checkListTask.id, name: checkListTask.name },
          },
          refetchQueries: [{ query: TRACKS_QUERY }],
        });
        setEditTask(false);
      } else {
        createCheckList({
          variables: {
            input: { name: checkListTask.name, trackId: currentTrack.id },
          },
          refetchQueries: [{ query: TRACKS_QUERY }],
        });
      }

      setCheckListTask({ id: null, name: "" });
    }
  };

  const cancelEditHandlder = () => {
    setEditTask(false);
    setCheckListTask({ ...checkListTask, name: "" });
  };

  const formRef = useClickOutSide(() => setEditTask(false));
  return (
    <div className="modal__items-container" ref={formRef}>
      <Title level={3}>
        {editTask ? "Edit Your task" : "Create Your task"}
      </Title>

      <form onSubmit={formSubmit}>
        <Input
          placeholder="What's the name for your task"
          onChange={(e) =>
            setCheckListTask({ ...checkListTask, name: e.target.value })
          }
          className="input"
          value={checkListTask.name}
          size="large"
        />
      </form>

      <CheckList
        completedList={completedList}
        inProgressList={inProgressList}
        editTask={editTask}
        setEditTask={setEditTask}
        setCheckListTask={setCheckListTask}
      />
      {editTask && (
        <div className="cancel-edit-btn" onClick={cancelEditHandlder}>
          Cancel Edit
        </div>
      )}
    </div>
  );
};
