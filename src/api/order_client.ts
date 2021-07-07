import gql from 'graphql-tag';
import { Meal } from '../models/meal/meal';
import { client } from './client';

const CREATE_DRAFT_ORDER_MUTATION = gql`
  mutation createDraftOrder($userId: String!, $mealIds: [ID!]!) {
    createDraftOrder(input: {userId: $userId, meals: $mealIds}) {
      succeeded
      draftOrderId
    }
  }
`

export const createDraftOrder = async (userId: string, meals: Meal[]): Promise<any | null> => {
  try{
    const result = await client.mutate({
        mutation: CREATE_DRAFT_ORDER_MUTATION,
        variables: {
          userId: userId,
          mealIds: meals.map(meal => meal.id)
        }, 
      })
      
    return result.data
  } catch(e) {
    console.log(`Got error: ${e}`)
    return null
  }
}