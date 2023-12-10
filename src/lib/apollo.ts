import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql', // Use your localhost GraphQL endpoint URL
  cache: new InMemoryCache(),
});

export default client;
