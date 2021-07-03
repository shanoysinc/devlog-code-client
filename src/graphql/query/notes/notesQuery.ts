import { gql } from "@apollo/client";

export const NOTES_QUERY = gql`
  query Notes {
    notes {
      id
      title
      description
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
