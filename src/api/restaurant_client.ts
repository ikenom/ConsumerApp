import gql from 'graphql-tag';
import { client } from './client';

const PAGE_COUNT = 10

const GET_RESTAURANTS_QUERY = gql`
  query RestaurantQuery($first: Int!, $after: String) {
    restaurants(first: $first, after: $after) {
      edges {
        node {
          id
          businessName
          description
          imageUrl
          phoneNumber
          location {
            state
            city
            zipCode
            street
          }
          businessHours {
            openTime
            closeTime
          }
          meals {
            id
            imageUrl
            name
            price
            description
            nutrition {
              calories
              carbsInG
              fatsInG
              proteinInG
            }
          }
        }
      },
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const getRestaurantsAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  try {
    const result = await client.query({
      query: GET_RESTAURANTS_QUERY,
      variables: {
        first: pageCount,
        after: after
      }
    })
    return result.data.restaurants
  } catch(e){
    console.log(`Got error ${e.message}`)
    return null
  }
}
