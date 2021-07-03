/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTrackInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: CreateTrack
// ====================================================

export interface CreateTrack_createTrack {
  __typename: "Track";
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface CreateTrack {
  createTrack: CreateTrack_createTrack;
}

export interface CreateTrackVariables {
  input: CreateTrackInput;
}
