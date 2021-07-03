/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditNoteInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: EditNotes
// ====================================================

export interface EditNotes_editNote_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface EditNotes_editNote_track {
  __typename: "Track";
  id: string;
  title: string;
  ratings: number;
}

export interface EditNotes_editNote {
  __typename: "Note";
  id: string;
  title: string;
  description: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
  tags: EditNotes_editNote_tags[];
  track: EditNotes_editNote_track | null;
}

export interface EditNotes {
  editNote: EditNotes_editNote;
}

export interface EditNotesVariables {
  input: EditNoteInput;
}
