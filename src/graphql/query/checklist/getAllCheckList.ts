import { gql } from '@apollo/client';


export const GET_ALL_CHECKLIST = gql`
  query GetAllCheckList {
    getAllCheckList {
      id
      name
      isComplete
      
    }
  }
`