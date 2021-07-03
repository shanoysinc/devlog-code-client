import { Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { FileTextOutlined, FileDoneOutlined } from "@ant-design/icons";
import { CreateNote, MarkDownPreview } from "./components";
import { useCurrentNoteStore } from "../../../../../state/currentNoteStore";
import { Notes_notes_tags } from "../../../../../graphql/query/notes/__generated__/Notes";

const { TabPane } = Tabs;

interface Props {
  createNotesModal: boolean;
  setCreateNotesModal: (createNotesModal: boolean) => void;
}

export const CreateNotesModal = ({
  createNotesModal,
  setCreateNotesModal,
}: Props) => {
  const { currentNote, modifyNote, setModifyNote } = useCurrentNoteStore(
    (state) => ({
      currentNote: state.currentNote,
      modifyNote: state.modifyNote,
      setModifyNote: state.setModifyNote,
    })
  );

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [tags, setTags] = useState<Notes_notes_tags[]>([]);

  useEffect(() => {
    if (modifyNote && currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setTags(currentNote.tags);
    }
  }, [modifyNote, currentNote]);

  const onCancelHandler = () => {
    if (modifyNote) {
      setModifyNote(false);
      setTitle("");
      setDescription("");
      setTags([]);
    }

    setCreateNotesModal(false);
  };

  return (
    <Modal
      visible={createNotesModal}
      onCancel={onCancelHandler}
      footer={null}
      className="modal"
      bodyStyle={{ backgroundColor: "#13141b" }}
      width={900}
    >
      <Tabs defaultActiveKey="1" className="create-notes__modal-tabs">
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              {modifyNote ? "Update Note" : "Create Note"}
            </span>
          }
          key="1"
        >
          <CreateNote
            setCreateNotesModal={setCreateNotesModal}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            tags={tags}
            setTags={setTags}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileDoneOutlined /> Preview Markdown
            </span>
          }
          key="2"
        >
          <MarkDownPreview
            title={title}
            description={description}
            tags={tags}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CreateNotesModal;
