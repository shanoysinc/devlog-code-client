import { gql } from "@apollo/client";

export const CREATE_CHECKLIST_MUTATION = gql`
  mutation CreateCheckList($input: CreateCheckListInput!) {
    createCheckList(input: $input) {
      id
      name
      isComplete
    }
  }
`;
