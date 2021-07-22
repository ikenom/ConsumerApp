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
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';
import AuthStore from '../store/authStore';


const url = "http://34.123.101.193"


let cable;
if (typeof window !== 'undefined') {
  const ActionCable = require('@rails/actioncable');
  cable = ActionCable.createConsumer(`${url}/cable`)
}

const httpLink = createHttpLink({
  uri: `${url}/graphql`
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

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  }
}


const getToken = async () => {
  const t = await AuthStore.getToken()
  return t
}

const authMiddleware = new ApolloLink((operation, forward) => {  
  getToken().then(token => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
  })

  return forward(operation);
})


export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
  defaultOptions: defaultOptions
});

