/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ResourceLinks
// ====================================================

export interface ResourceLinks_resourceLinks {
  __typename: "ResourceLink";
  id: string;
  title: string;
  url: string;
  review: string | null;
  trackId: string;
  urlType: string;
}

export interface ResourceLinks {
  resourceLinks: ResourceLinks_resourceLinks[];
}

export interface ResourceLinksVariables {
  trackId?: string | null;
}
