/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCheckListInput } from "./../../../../../lib/graphql/types/global-types";

// ====================================================
// GraphQL mutation operation: EditCheckList
// ====================================================

export interface EditCheckList_editCheckList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface EditCheckList {
  editCheckList: EditCheckList_editCheckList;
}

export interface EditCheckListVariables {
  input: EditCheckListInput;
}
