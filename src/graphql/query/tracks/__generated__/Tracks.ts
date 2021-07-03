/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Tracks
// ====================================================

export interface Tracks_tracks_resourceLinks {
  __typename: "ResourceLink";
  id: string;
  title: string;
}

export interface Tracks_tracks_notes_track {
  __typename: "Track";
  id: string;
  title: string;
  ratings: number;
}

export interface Tracks_tracks_notes_tags {
  __typename: "Tag";
  value: string;
  color: string;
}

export interface Tracks_tracks_notes {
  __typename: "Note";
  id: string;
  title: string;
  description: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
  track: Tracks_tracks_notes_track | null;
  tags: Tracks_tracks_notes_tags[];
}

export interface Tracks_tracks_checkList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface Tracks_tracks {
  __typename: "Track";
  id: string;
  title: string;
  description: string | null;
  ratings: number;
  createdAt: string;
  resourceLinks: Tracks_tracks_resourceLinks[];
  notes: Tracks_tracks_notes[];
  checkList: Tracks_tracks_checkList[];
}

export interface Tracks {
  tracks: Tracks_tracks[];
}
