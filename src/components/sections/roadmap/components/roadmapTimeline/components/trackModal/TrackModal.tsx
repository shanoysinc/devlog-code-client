import React from "react";
import { Modal, Tabs } from "antd";
import { useTrackModalStore } from "../../../../../../../state/track/trackModalStore";
import {
  NotesList,
  EditTrack,
  CheckListItems,
  RateTrack,
  Settings,
} from "./components";
import { useCurrentTrackStore } from "../../../../../../../state/track/currentTrackStore";
import HelpFullLinks from "./components/links/HelpFullLinks";

const { TabPane } = Tabs;

export const TrackModal = () => {
  const { setTrackVisibility, trackVisibility } = useTrackModalStore(
    (state) => ({
      trackVisibility: state.trackVisibility,
      setTrackVisibility: state.setTrackVisibility,
    })
  );

  const { currentTrack, setCurrentTrack } = useCurrentTrackStore((state) => ({
    setCurrentTrack: state.setCurrentTrack,
    currentTrack: state.currentTrack,
  }));

  const onCancelHandler = () => {
    setTrackVisibility(false);
  };

  const notes = currentTrack?.notes ? currentTrack.notes : null;

  return (
    <Modal
      visible={trackVisibility}
      onCancel={onCancelHandler}
      footer={null}
      className="modal"
      bodyStyle={{ backgroundColor: "#13141b" }}
      width={1000}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Ratings" key="1">
          <RateTrack
            currentTrackId={currentTrack?.id}
            ratings={currentTrack?.ratings}
            trackName={currentTrack?.title}
          />
        </TabPane>
        <TabPane tab="Checklist" key="2">
          <CheckListItems
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
          />
        </TabPane>
        <TabPane tab="Notes" key="3">
          <NotesList notes={notes} />
        </TabPane>
        <TabPane tab="Links" key="4">
          <HelpFullLinks currentTrack={currentTrack} />
        </TabPane>
        <TabPane tab="Edit Task" key="5">
          <EditTrack currentTrack={currentTrack} />
        </TabPane>
        <TabPane tab="settings" key="6">
          <Settings
            currentTrack={currentTrack}
            setTrackVisibility={setTrackVisibility}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
