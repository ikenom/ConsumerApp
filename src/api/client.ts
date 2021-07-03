import { 
  ApolloClient, 
  InMemoryCache, 
  createHttpLink, 
  ApolloLink, 
  concat, 
  DefaultOptions,
  from,
  gql
} from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'cross-fetch/polyfill';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import { Alert } from 'react-native';


const url = "http://127.0.0.1:64973"
const testGraphql = "https://graphql.org/swapi-graphql"

let cable;
if (typeof window !== 'undefined') {
  const ActionCable = require('@rails/actioncable');
  cable = ActionCable.createConsumer(`${url}/cable`)
}

const httpLink = createHttpLink({
  uri: `${url}/graphql`
});

const testHttpLink = createHttpLink({
  uri: testGraphql
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  from([errorLink, httpLink])
);


const authMiddleware = new ApolloLink((operation, forward) => {
  const token = undefined
  
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
})

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
    awaitRefetchQueries: true,
  }
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
  defaultOptions: defaultOptions
});

const TEST = gql`
query {
  allFilms {
    films {
      title
    }
  }
}
`

export const testClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, testHttpLink),
  defaultOptions: defaultOptions
});

export const callTest = async () => {
  console.log("bleh")
  const result = await testClient.query({
    query: TEST
  })
  console.log(`Result: ${result}`)
}

export const getMoviesFromApiAsync = async () => {
  try {
    console.log("bleh")
    let response = await fetch(
      'https://reactnative.dev/movies.json'
    );
    console.log(response)
    let json = await response.json();
    Alert.alert(`Resolved data is: ${json}`)
    return json.movies;
  } catch (error) {
    console.error(error);
  }
};


