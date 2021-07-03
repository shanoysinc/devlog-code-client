import { gql } from '@apollo/client';


export const CREATE_RESOURCE_LINK = gql`
  mutation CreateResourceLink($input: CreateResourceLinkInput!){
    createResourceLink(input: $input) {
      id 
      title
      url 
      review
      trackId
      urlType
    }
  }`