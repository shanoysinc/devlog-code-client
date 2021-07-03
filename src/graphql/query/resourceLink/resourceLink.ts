import { gql } from '@apollo/client';


export const GET_RESOURCE_LINKS = gql`
  query ResourceLinks($trackId: ID){
    resourceLinks(trackId: $trackId) {
      id 
      title
      url 
      review
      trackId
      urlType
    }
  }`