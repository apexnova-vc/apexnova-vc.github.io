import { ApolloClient, InMemoryCache } from "@apollo/client";

// In your Apollo Client setup file
const client = new ApolloClient({
  uri: "http://localhost:3005/graphql",
  cache: new InMemoryCache(),
});

export default client;
