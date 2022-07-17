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
mutation uploadInstagram($campaignId: String, $campaignName: String, $accessToken: String, $id: String, $image: String, $caption: String, $userId: String) {
  uploadInstagram(campaignId: $campaignId, campaignName: $campaignName, accessToken: $accessToken, id: $id, image: $image, caption: $caption, userId: $userId ){
    instagramPostId
    campaignId
  }
}
`

export const uploadtoFacebook = gql`
mutation uploadFacebook($campaignId: String, $campaignName: String, $accessToken: String, $pageId: String, $image: String, $caption: String, $userId: String) {
  uploadFacebook(campaignId: $campaignId, campaignName: $campaignName, accessToken: $accessToken, pageId: $pageId, image: $image, caption: $caption, userId: $userId ){
    facebookPostId
    campaignId
  }
}
`

export const getUsercreatedCampaigns = gql`
mutation getUserCampaigns($userId: String){
  getUserCampaigns(userId: $userId){
    campaignName
    userId
    instagramPostId
    facebookPostId
    twitterPostId
    date
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

export const automateInsta = gql`
mutation automateInstagram($campaignId: String, $campaignName: String, $accessToken: String, $profileid: String, $image: String, $caption: String, $userId: String, $time: String){
  automateInstagram(campaignId: $campaignId, campaignName: $campaignName, accessToken: $accessToken, profileid: $profileid, image: $image, caption: $caption, userId: $userId, time: $time ){
    id
  }
}
`