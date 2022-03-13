import { gql } from "@apollo/client";

export const userLogin = gql`
    mutation loginUser($email: String, $password: String){
      loginUser(email: $email, password: $password){
        email
        subscription_status
      }
    }
`

export const signupUser = gql`
mutation signupUser($email: String, $password: String){
    signupUser(email: $email, password: $password){
      email
      subscription_status
    }
  }
`

export const signedUpUser = gql`
  query{
    getsignedInUser{
      email
      subscription_status
    }
  }
  `
