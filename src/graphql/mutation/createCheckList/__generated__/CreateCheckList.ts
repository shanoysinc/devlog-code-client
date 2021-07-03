/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCheckListInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: CreateCheckList
// ====================================================

export interface CreateCheckList_createCheckList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface CreateCheckList {
  createCheckList: CreateCheckList_createCheckList;
}

export interface CreateCheckListVariables {
  input: CreateCheckListInput;
}
