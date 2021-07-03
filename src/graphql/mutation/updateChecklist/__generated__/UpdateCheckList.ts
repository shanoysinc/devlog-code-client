/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCheckListInput } from "./../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: UpdateCheckList
// ====================================================

export interface UpdateCheckList_updateCheckList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface UpdateCheckList {
  updateCheckList: UpdateCheckList_updateCheckList;
}

export interface UpdateCheckListVariables {
  input: UpdateCheckListInput;
}
