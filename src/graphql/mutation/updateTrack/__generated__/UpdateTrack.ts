/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTrackInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: UpdateTrack
// ====================================================

export interface UpdateTrack_updateTrack_notes_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface UpdateTrack_updateTrack_notes {
  __typename: "Note";
  id: string;
  title: string;
  markdown: string;
  tags: UpdateTrack_updateTrack_notes_tags[];
}

export interface UpdateTrack_updateTrack_checkList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface UpdateTrack_updateTrack {
  __typename: "Track";
  id: string;
  title: string;
  description: string | null;
  ratings: number;
  notes: UpdateTrack_updateTrack_notes[];
  checkList: UpdateTrack_updateTrack_checkList[];
}

export interface UpdateTrack {
  updateTrack: UpdateTrack_updateTrack;
}

export interface UpdateTrackVariables {
  input: UpdateTrackInput;
}
