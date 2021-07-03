/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCheckList
// ====================================================

export interface GetAllCheckList_getAllCheckList {
  __typename: "CheckList";
  id: string;
  name: string;
  isComplete: boolean;
}

export interface GetAllCheckList {
  getAllCheckList: GetAllCheckList_getAllCheckList[];
}
