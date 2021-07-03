import React from "react";
import { TimeLine } from "../../Timeline/TimeLine";
import { TabsMenu } from "./components";

import { CreateButton } from "../../button/CreateButton";
import { createNoteModalStore } from "../../../state/createNoteModal/createNoteModalStore";

export const Home = () => {
  const { createNotesModal, setCreateNotesModal } = createNoteModalStore(
    (state) => ({
      createNotesModal: state.visibility,
      setCreateNotesModal: state.setVisibility,
    })
  );

  return (
    <>
      <div className="dashboard">
        <div className="timeline__container">
          <TimeLine />
        </div>

        <div className="tabs__container">
          <TabsMenu />
        </div>
      </div>
      <div className="create-note__btn-mobile">
        <CreateButton
          isModalVisible={createNotesModal}
          setModal={setCreateNotesModal}
          iconColor="#4338ca"
        />
      </div>
    </>
  );
};
