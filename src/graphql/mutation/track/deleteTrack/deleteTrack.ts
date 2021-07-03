import { gql } from '@apollo/client';


export const DELETE_TRACK = gql`
  mutation DeleteTrack($input: DeleteTrackInput!){
    deleteTrack(input: $input){
      id
    }
  }
`