import { gql } from "@apollo/client";

export const CREATE_TRACK_MUTATION = gql`
  mutation CreateTrack($input: CreateTrackInput!) {
    createTrack(input: $input) {
      id
      title
      description
      createdAt
    }
  }
`;
