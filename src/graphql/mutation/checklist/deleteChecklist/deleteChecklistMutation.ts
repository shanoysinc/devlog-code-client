import { gql } from '@apollo/client';


export const DELETE_CHECKLIST_MUTATION = gql`
mutation DeleteCheckList($input: DeleteCheckListInput!) {
    deleteCheckList(input: $input) {
      id
      name
      isComplete
    }
  }`