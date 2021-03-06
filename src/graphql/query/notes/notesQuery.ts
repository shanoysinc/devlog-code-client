import { gql } from "@apollo/client";

export const NOTES_QUERY = gql`
  query Notes {
    notes {
      id
      title
      markdown
      tags {
        value
        color
      }
      createdAt
      updatedAt
      track {
        id
        title
        ratings
      }
    }
  }
`;
