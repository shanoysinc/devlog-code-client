/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Notes
// ====================================================

export interface Notes_notes_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface Notes_notes_track {
  __typename: "Track";
  id: string;
  title: string;
  ratings: number;
}

export interface Notes_notes {
  __typename: "Note";
  id: string;
  title: string;
  description: string;
  markdown: string;
  tags: Notes_notes_tags[];
  createdAt: string;
  updatedAt: string;
  track: Notes_notes_track | null;
}

export interface Notes {
  notes: Notes_notes[];
}
