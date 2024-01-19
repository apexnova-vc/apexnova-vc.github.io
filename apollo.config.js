export default {
  client: {
    service: {
      name: "your-service-name",
      // URL to the GraphQL API
      url: process.env.REACT_APP_GRAPHQL_URI || "http://localhost:3005/graphql",
    },
    // Files processed by the Apollo CLI
    includes: ["src/**/*.tsx", "src/**/*.ts"],
    tagName: "gql",
  },
};
