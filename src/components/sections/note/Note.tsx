import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCurrentNoteStore } from "../../../state/currentNoteStore";
import { NotePreview } from "../home/components/tabs/notePreview/notePreview";

export const Note = () => {
  const history = useHistory();
  const currentNote = useCurrentNoteStore((state) => state.currentNote);
  useEffect(() => {
    if (!currentNote) {
      history.push("/");
    }
  });
  return (
    <div className="markdown__preview-full-screen">
      <NotePreview />
    </div>
  );
};
