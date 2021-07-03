import { gql } from '@apollo/client';


export const EDIT_CHECKLIST_MUTATION = gql`
mutation EditCheckList($input: EditCheckListInput!) {
    editCheckList(input: $input) {
      id
      name
      isComplete
    }
  }`