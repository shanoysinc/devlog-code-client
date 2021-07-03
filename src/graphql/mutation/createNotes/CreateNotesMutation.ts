import { gql } from "@apollo/client";

export const CREATE_NOTES_MUTATION = gql`
  mutation CreateNotes($input: NoteInput!) {
    createNote(input: $input) {
      id
      title
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
