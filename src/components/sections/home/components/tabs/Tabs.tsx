import React from "react";
import { Affix, Tabs } from "antd";
import { FileTextFilled, ProfileFilled } from "@ant-design/icons";
import { NotePreview } from "./notePreview/notePreview";
import { CheckList } from "./checklist/CheckList";
const { TabPane } = Tabs;

export const TabsMenu = () => {
  return (
    <Affix offsetTop={100}>
      <Tabs defaultActiveKey="1" className="timeline__markdown-preview-tabs">
        <TabPane
          tab={
            <span>
              <FileTextFilled />
              Notes Preview
            </span>
          }
          key="1"
        >
          <div className="markdown__preview-container  markdown__preview-tab">
            <NotePreview />
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <ProfileFilled /> Checklist
            </span>
          }
          key="2"
        >
          <div className="checklist-container">
            <CheckList />
          </div>
        </TabPane>
      </Tabs>
    </Affix>
  );
};
