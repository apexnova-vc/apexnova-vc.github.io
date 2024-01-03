import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

// In your Apollo Client setup file
const client = new ApolloClient({
  uri: "http://localhost:3005/graphql",
  cache: new InMemoryCache(),
  // link: ,
  typeDefs: gql`
    extend type Mutation {
      updateQuestionsCache(question: QuestionInput!): Question
    }
  `,
  resolvers: {
    Mutation: {
      updateQuestionsCache: (_, { question }) => {
        // Logic to update the cache
        // This might involve reading from the cache, modifying the data, and writing it back
        return question;
      },
    },
  },
});

export default client;
