import React, { useState, useEffect } from "react";
import { Typography, Collapse, Checkbox, Spin } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CHECKLIST } from "../../../../../../graphql/query/checklist/getAllCheckList";
import { GetAllCheckList as GetAllCheckListData } from "../../../../../../graphql/query/checklist/__generated__/GetAllCheckList";
import { Tracks_tracks_checkList } from "../../../../../../graphql/query/tracks/__generated__/Tracks";
import { UPDATE_CHECKLIST } from "../../../../../../graphql/mutation/updateChecklist/UpdateChecklistMutation";
import {
  UpdateCheckListVariables,
  UpdateCheckList as UpdateCheckListData,
} from "../../../../../../graphql/mutation/updateChecklist/__generated__/UpdateCheckList";

const { Title } = Typography;
const { Panel } = Collapse;

export const CheckList = () => {
  const [inProgressList, setInProgressList] = useState<
    Tracks_tracks_checkList[]
  >([]);
  const [completedList, setCompletedList] = useState<Tracks_tracks_checkList[]>(
    []
  );
  const { data, loading } = useQuery<GetAllCheckListData>(GET_ALL_CHECKLIST);
  const [updateCheckList, { loading: updateLoading }] = useMutation<
    UpdateCheckListData,
    UpdateCheckListVariables
  >(UPDATE_CHECKLIST, {});

  const checkList = data?.getAllCheckList ? data.getAllCheckList : null;

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

  const updateCheckListHandler = (checkList: Tracks_tracks_checkList) => {
    const { id, isComplete, name } = checkList;

    updateCheckList({
      variables: { input: { id, isComplete, name } },
      refetchQueries: [{ query: GET_ALL_CHECKLIST }],
    });
  };

  return (
    <Spin spinning={loading} tip="Loading tasks...">
      <Spin spinning={updateLoading} tip="Updating task...">
        <div className="checklist-item__container">
          <Title level={2} style={{ marginLeft: "1.5em" }}>
            Current Tasks
          </Title>
          <Collapse
            defaultActiveKey={["1", "2"]}
            ghost
            className="checklist__container"
          >
            <Panel
              header={`In Progress Item ( ${inProgressList.length} )`}
              key="1"
              style={{ fontSize: "1.4rem", width: "350px" }}
            >
              <div className="track-checklist__items">
                {inProgressList.map((item) => (
                  <div
                    className="track-checklist__items-container"
                    key={item.id}
                  >
                    <Checkbox
                      key={item.id}
                      onChange={() => updateCheckListHandler(item)}
                      style={{ margin: 0 }}
                      defaultChecked={item.isComplete}
                    >
                      {item.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel
              header={`Completed Item ( ${completedList.length} )`}
              style={{ fontSize: "1.4rem", width: "350px" }}
              key="2"
            >
              <div className="track-checklist__items">
                {completedList.map((item) => (
                  <div
                    className="track-checklist__items-container"
                    key={item.id}
                  >
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
        </div>
      </Spin>
    </Spin>
  );
};
