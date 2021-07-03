import { gql } from "@apollo/client";

export const EDIT_NOTES_MUTATION = gql`
  mutation EditNotes($input: EditNoteInput!) {
    editNote(input: $input) {
      id
      title
      description
      markdown
      createdAt
      updatedAt
      tags {
        value
        color
      }
      track {
        id
        title
        ratings
      }
    }
  }
`;
