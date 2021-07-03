import { gql } from "@apollo/client";

export const TRACKS_QUERY = gql`
  query Tracks {
    tracks {
      id
      title
      description
      ratings
      createdAt
      resourceLinks {
        id 
        title 
      }
      notes {
        id
        title        
        markdown
        createdAt
        updatedAt
        track {
            id 
            title
            ratings
        }
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
