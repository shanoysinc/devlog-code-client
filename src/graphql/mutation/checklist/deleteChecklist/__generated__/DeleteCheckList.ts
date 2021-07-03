/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCheckListInput } from "./../../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: DeleteCheckList
// ====================================================

export interface DeleteCheckList_deleteCheckList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface DeleteCheckList {
  deleteCheckList: DeleteCheckList_deleteCheckList;
}

export interface DeleteCheckListVariables {
  input: DeleteCheckListInput;
}
