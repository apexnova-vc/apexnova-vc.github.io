import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: (process.env.SERVER_URI || "http://localhost:3005") + "/graphql",
  cache: new InMemoryCache(),
});

export default client;
