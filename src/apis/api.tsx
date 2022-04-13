import { gql } from "@apollo/client";

export const userLogin = gql`
    mutation loginUser($email: String, $password: String){
      loginUser(email: $email, password: $password){
        email
        subscription_status
        id
      }
    }
`

export const signupUser = gql`
mutation signupUser($email: String, $password: String){
    signupUser(email: $email, password: $password){
      email
      subscription_status
      id
    }
  }
`

export const uploadPost = gql`
mutation uploadPictures($pictueURL: String) {
  uploadPictures(pictueURL: $pictueURL){
    url
  }
}
`

export const uploadtoInstagram = gql`
mutation uploadInstagram($accessToken: String, $id: String, $image: String, $caption: String, $userId: String) {
  uploadInstagram(accessToken: $accessToken, id: $id, image: $image, caption: $caption, userId: $userId ){
    instagramPostId
  }
}
`

export const getUsercreatedCampaigns = gql`
mutation getUserCampaigns($userId: String){
  getUserCampaigns(userId: $userId){
    userId
    instagramPostId
    linkedinPostId
    twitterPostId
  }
}
`

export const signedUpUser = gql`
  query{
    getsignedInUser{
      email
      subscription_status
      id
    }
  }
  `
