/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateResourceLinkInput } from "./../../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: CreateResourceLink
// ====================================================

export interface CreateResourceLink_createResourceLink {
  __typename: "ResourceLink";
  id: string;
  title: string;
  url: string;
  review: string | null;
  trackId: string;
  urlType: string;
}

export interface CreateResourceLink {
  createResourceLink: CreateResourceLink_createResourceLink;
}

export interface CreateResourceLinkVariables {
  input: CreateResourceLinkInput;
}
