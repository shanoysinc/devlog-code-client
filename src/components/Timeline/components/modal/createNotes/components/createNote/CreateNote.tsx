import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Input, Button, message, Select, Spin } from "antd";
import {
  CREATE_NOTES_MUTATION,
  EDIT_NOTES_MUTATION,
} from "../../../../../../../graphql/mutation";
import { NOTES_QUERY } from "../../../../../../../graphql/query";
import {
  CreateNotesVariables,
  CreateNotes as CreateNotesData,
} from "../../../../../../../graphql/mutation/createNotes/__generated__/CreateNotes";
import {
  EditNotesVariables,
  EditNotes as EditNotesData,
} from "../../../../../../../graphql/mutation/editNote/__generated__/EditNotes";
import { CreateTags } from "../../components";
import { useCurrentNoteStore } from "../../../../../../../state/currentNoteStore";
import { Notes_notes_tags } from "../../../../../../../graphql/query/notes/__generated__/Notes";
import { removeTypeNameField } from "../../../../../../../utils/removeTypename/removeTypeNameField";
import { TRACKS_QUERY } from "../../../../../../../graphql/query/tracks/tracksQuery";
import {
  Tracks as TracksData,
  Tracks_tracks,
} from "../../../../../../../graphql/query/tracks/__generated__/Tracks";

interface Props {
  setCreateNotesModal: (createNotesModal: boolean) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  markdown: string;
  setMarkdown: React.Dispatch<React.SetStateAction<string>>;
  tags: Notes_notes_tags[];
  setTags: React.Dispatch<React.SetStateAction<Notes_notes_tags[]>>;
}

const { TextArea } = Input;

export const CreateNote = ({
  setCreateNotesModal,
  markdown,
  setMarkdown,
  setTags,
  setTitle,
  tags,
  title,
}: Props) => {
  const { modifyNote, setCurrentNote, currentNote } = useCurrentNoteStore(
    (state) => ({
      modifyNote: state.modifyNote,
      setCurrentNote: state.setCurrentNote,
      currentNote: state.currentNote,
    })
  );

  const { data: tracksData } = useQuery<TracksData>(TRACKS_QUERY);
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [currentSelectedTrack, setCurrentSelectedTrack] =
    useState<Tracks_tracks | null>(null);

  const [createNote, { loading: createLoading }] = useMutation<
    CreateNotesData,
    CreateNotesVariables
  >(CREATE_NOTES_MUTATION, {
    onCompleted: (data) => {
      setCurrentNote(data.createNote);
      setTitle("");
      setMarkdown("");
      setTags([]);
      setCreateNotesModal(false);
      message.success("Note has been successfully created 😊");
    },
  });

  const [editNote, { loading: editLoading }] = useMutation<
    EditNotesData,
    EditNotesVariables
  >(EDIT_NOTES_MUTATION, {
    onCompleted: (data) => {
      const { id, title, createdAt, markdown, tags, updatedAt, track } =
        data.editNote;

      setCurrentNote({
        __typename: "Note",
        title,
        id,
        createdAt,
        markdown,
        tags,
        updatedAt,
        track,
      });
      setCreateNotesModal(false);
      message.success("Note has been successfully updated 😊");
    },
  });

  const createNoteHandler = () => {
    if (title.length < 10) {
      return message.error(
        "Please enter a Title with a character of 10 or more"
      );
    }

    if (markdown.length < 140) {
      return message.error(
        "Please be as detail as possible with your notes it will help you in the future"
      );
    }
    if (tags.length < 1) {
      return message.error("Atleast one tags is require to submit your note");
    }

    const modifyTags = removeTypeNameField(tags);

    if (modifyNote && currentNote) {
      editNote({
        variables: {
          input: {
            markdown,
            tags: modifyTags,
            title,
            id: currentNote.id,
            track: currentNote.track?.id,
          },
        },
        refetchQueries: [{ query: NOTES_QUERY }],
      });
      return;
    }

    createNote({
      variables: {
        input: {
          markdown,
          tags: modifyTags,
          title,
          track: currentSelectedTrack?.id,
        },
      },
      refetchQueries: [{ query: NOTES_QUERY }, { query: TRACKS_QUERY }],
    });
  };

  const tracks = tracksData ? tracksData.tracks : [];
  const filteredOptions = tracks.filter(
    (track) => !selectedItem.includes(track.title)
  );

  const selectItemHandler = (item: string[]) => {
    let trackTitle = item[item.length - 1];
    if (item.length - 1 < 0) {
      setSelectedItem([]);
      return;
    }
    const findTrack = tracks.find((track) => track.title === trackTitle);
    const track = findTrack ? findTrack : null;
    setSelectedItem([trackTitle]);
    setCurrentSelectedTrack(track);
  };

  const loadingNote = createLoading || editLoading ? true : false;
  return (
    <Spin
      spinning={loadingNote}
      tip={createLoading ? "creating note..." : "updating note..."}
    >
      <div className="create-note__container">
        <Input
          placeholder="What's the title for your note"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          value={title}
          size="large"
          style={{ fontSize: "1.25rem", fontWeight: 500 }}
        />
        <div style={{ margin: "10px 0" }} />

        <TextArea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter your note details here..."
          autoSize={{ minRows: 11, maxRows: 4 }}
          className="input"
          style={{ fontSize: "1rem" }}
        />
        <div style={{ margin: "10px 0" }} />

        {!modifyNote && (
          <Select
            className="select"
            mode="multiple"
            placeholder="Connect your Note to a track"
            value={selectedItem}
            onChange={selectItemHandler}
            style={{ width: "300px" }}
            bordered={false}
          >
            {filteredOptions.map((item) => (
              <Select.Option
                className="select"
                key={item.id}
                value={item.title}
              >
                {item.title}
              </Select.Option>
            ))}
          </Select>
        )}

        <div style={{ margin: "10px 0" }} />
        <CreateTags tags={tags} setTags={setTags} />

        <div style={{ margin: "10px 0" }} />

        <div className="create-notes__modal-btn-container">
          <Button
            size="large"
            style={{
              backgroundColor: "#4338ca",
              color: "white",
              width: "150px",
              border: 0,
            }}
            onClick={createNoteHandler}
          >
            {modifyNote ? "Update" : "Create"}
          </Button>
        </div>
      </div>
    </Spin>
  );
};
