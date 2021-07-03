import React from "react";
import { Tracks_tracks_notes } from "../../../../../../../../../graphql/query/tracks/__generated__/Tracks";
import { List } from "antd";
import { wordsLimiter } from "../../../../../../../../../utils/wordsLimiter/wordsLimiter";
import { useHistory } from "react-router-dom";
import { useCurrentNoteStore } from "../../../../../../../../../state/currentNoteStore";
import { Notes_notes } from "../../../../../../../../../graphql/query/notes/__generated__/Notes";
import { useTrackModalStore } from "../../../../../../../../../state/track/trackModalStore";

interface Props {
  notes: Tracks_tracks_notes[] | null;
}

const { Item } = List;
export const NotesList = ({ notes }: Props) => {
  const history = useHistory();
  const setCurrentNote = useCurrentNoteStore((state) => state.setCurrentNote);
  const { setTrackVisibility, trackVisibility } = useTrackModalStore(
    (state) => ({
      trackVisibility: state.trackVisibility,
      setTrackVisibility: state.setTrackVisibility,
    })
  );
  const changeRoute = (note: Notes_notes) => {
    setCurrentNote(note);

    setTrackVisibility(!trackVisibility);

    history.push(`/note/${note.title}`);
  };
  const NotesElement = notes ? (
    <List
      itemLayout="horizontal"
      dataSource={notes}
      renderItem={(note) => (
        <List.Item
          onClick={() => changeRoute(note)}
          className="notes-list__items"
          style={{ cursor: "pointer" }}
        >
          <Item.Meta
            title={<div>{note.title}</div>}
            description={`${wordsLimiter(note.description, 140)}`}
          />
        </List.Item>
      )}
    />
  ) : null;
  return <div className="modal__items-container">{NotesElement}</div>;
};
