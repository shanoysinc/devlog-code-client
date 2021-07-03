import { gql } from "@apollo/client";

export const UPDATE_CHECKLIST = gql`
  mutation UpdateCheckList($input: UpdateCheckListInput!) {
    updateCheckList(input: $input) {
      id
      name
      isComplete
    }
  }
`;
