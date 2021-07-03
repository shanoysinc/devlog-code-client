/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteNote
// ====================================================

export interface DeleteNote_deleteNote_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface DeleteNote_deleteNote {
  __typename: "Note";
  id: string;
  title: string;
  markdown: string;
  tags: DeleteNote_deleteNote_tags[];
  createdAt: string;
  updatedAt: string;
}

export interface DeleteNote {
  deleteNote: DeleteNote_deleteNote;
}

export interface DeleteNoteVariables {
  id: string;
}
