import gql from 'graphql-tag';
import { client } from './client';

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      token
      userId
    }
  }
`

export const login = async (email: String, password: String): Promise<any | null> => {
  try{
    const result = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: email,
          password: password
        }, 
      })
  
    return result.data
  } catch(e) {
    console.log(`Got error: ${e}`)
    return null
  }
}