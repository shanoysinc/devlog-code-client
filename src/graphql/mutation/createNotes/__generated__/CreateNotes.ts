/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NoteInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: CreateNotes
// ====================================================

export interface CreateNotes_createNote_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface CreateNotes_createNote_track {
  __typename: "Track";
  id: string;
  title: string;
  ratings: number;
}

export interface CreateNotes_createNote {
  __typename: "Note";
  id: string;
  title: string;
  description: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
  tags: CreateNotes_createNote_tags[];
  track: CreateNotes_createNote_track | null;
}

export interface CreateNotes {
  createNote: CreateNotes_createNote;
}

export interface CreateNotesVariables {
  input: NoteInput;
}
