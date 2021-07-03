/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateCheckListInput {
  trackId: string;
  name: string;
}

export interface CreateResourceLinkInput {
  trackId: string;
  title: string;
  url: string;
  review?: string | null;
  urlType: string;
}

export interface CreateTrackInput {
  title: string;
  description?: string | null;
}

export interface DeleteCheckListInput {
  id: string;
}

export interface DeleteTrackInput {
  id: string;
  hasNotes: boolean;
  deleteNotes: boolean;
}

export interface EditCheckListInput {
  id: string;
  name: string;
}

export interface EditNoteInput {
  id: string;
  title: string;
  markdown: string;
  tags: TagInput[];
  track?: string | null;
}

export interface NoteInput {
  title: string;
  markdown: string;
  tags: TagInput[];
  track?: string | null;
}

export interface TagInput {
  value: string;
  color: string;
}

export interface UpdateCheckListInput {
  id: string;
  name: string;
  isComplete: boolean;
}

export interface UpdateTrackInput {
  id: string;
  title?: string | null;
  ratings?: number | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
