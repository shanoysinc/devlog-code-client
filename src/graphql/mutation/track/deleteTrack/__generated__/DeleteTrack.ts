/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteTrackInput } from "./../../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: DeleteTrack
// ====================================================

export interface DeleteTrack_deleteTrack {
  __typename: "Track";
  id: string;
}

export interface DeleteTrack {
  deleteTrack: DeleteTrack_deleteTrack;
}

export interface DeleteTrackVariables {
  input: DeleteTrackInput;
}
