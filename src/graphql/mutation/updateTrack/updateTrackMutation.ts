import { gql } from "@apollo/client";

export const UPDATE_TRACK = gql`
  mutation UpdateTrack($input: UpdateTrackInput!) {
    updateTrack(input: $input) {
      id
      title
      description
      ratings
      notes {
        id
        title
        markdown     
        tags {
          value
          color
        }
      }
      checkList {
        id
        name
        isComplete
      }
    }
  }
`;
