import { gql, useQuery } from "@apollo/client";
import React from "react";

// Define your GraphQL query
const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

function About() {
  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Render the fetched data
  return (
    <div>
      <div>About Page</div>
      <div>
        <h3>Authors:</h3>
        <ul>
          {data.authors.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;
