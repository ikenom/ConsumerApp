import gql from 'graphql-tag';
import { Alert } from 'react-native';
import { client } from './client';

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      token
    }
  }
`

const GET_ORDER = gql`
query {
  orders(first: 1) {
    edges {
      node {
        id
        orderNumber
        lineItems {
          id
          price
          product {
            name
          }
          quantity
          instructions
          additionalComments
        }
        customer {
          firstName
          lastName
        }
        price
        type
        status
        timeRemaining
        createdAt
      }
    }
  }
}
`

export const login = async (email: String, password: String): Promise<any | null> => {
  try{
    const testClient = client
    console.log("Starting")
    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email: email,
        password: password
      }
    })

    console.log(`Result is: ${result}`)
    return result.data
  } catch(e) {
    console.log(`Got error: ${e}`)
    return null
  }
}

export const test = async (): Promise<string> => {
  setTimeout(() => {console.log('I am appearing...', 'After 3 seconds!');}, 3000);
  return "DOne!"
}