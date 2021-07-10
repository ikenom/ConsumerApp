import gql from 'graphql-tag';
import { Meal } from '../models/meal/meal';
import { client } from './client';

const CREATE_DRAFT_ORDER_MUTATION = gql`
  mutation createDraftOrder($userId: String!, $mealIds: [ID!]!) {
    createDraftOrder(input: {userId: $userId, meals: $mealIds}) {
      succeeded
      draftOrder {
        id
      }
    }
  }
`
const GET_DRAFT_ORDER_QUERY = gql`
query ($draftOrderId: ID!) {
  node(id: $draftOrderId) {
    ... on DraftOrder {
      id
      order {
        id
        createdAt
        orderNumber
        status
        timeRemaining
        price
        customer {
          firstName
          lastName
        }
      }
    }
  }
}
`

const COMPLETE_DRAFT_ORDER_MUTATION = gql`
mutation completeDraftOrder($draftOrderId: ID!) {
  completeDraftOrder(input: {draftOrderId: $draftOrderId}) {
    succeeded
  }
}
`

const SUBSCRIBE_TO_DRAFT_ORDER_COMPLETION = gql`
  subscription DraftOrderCompleted {
    draftOrderCompleted {
      order {
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

export const getDraftOrder = async (draftOrderId: string): Promise<any | null> => {
  try {
    const result = await client.query({
      query: GET_DRAFT_ORDER_QUERY,
      variables: { draftOrderId}
    })
    return result.data
  } catch(e) {
    console.log(`Got error: ${e}`)
    return null
  }
}

export const completeDraftOrder = async (draftOrderId: string): Promise<any |null> => {
  try{
    const result = await client.mutate({
        mutation: COMPLETE_DRAFT_ORDER_MUTATION,
        variables: {
          draftOrderId
        }, 
      })

    return result.data
  } catch(e) {
    console.log(`Got error: ${e}`)
    return null
  }
}

export const subscribeToDraftOrderCompletion = async (callback: (arg0: any) => void) => {
  client.subscribe({
    query: SUBSCRIBE_TO_DRAFT_ORDER_COMPLETION
  }).subscribe({
    next(result) {
      console.log("Got response!")
      if (result.data.draftOrderCompleted !== undefined) {
        callback(result.data.draftOrderCompleted.order)
      }
    },
    error(err) { console.log('err', err); },
  })
}