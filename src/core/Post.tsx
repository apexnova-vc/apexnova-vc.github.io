import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import { TextField, Button, Paper, Typography } from "@mui/material";

// Define your GraphQL query for fetching job details including bids
const GET_JOB_DETAILS_QUERY = gql`
  query GetJobDetails($jobId: ID!) {
    job(id: $jobId) {
      id
      desc
      requirements
      author {
        name
        contact // Assuming contact is a field in your author model
      }
      bids {
        amount
      }
      expirationDate // Assuming expiration date is a field in your job model
    }
  }
`;

// Define your GraphQL mutation for placing a bid
// const PLACE_BID_MUTATION = gql`
//   mutation PlaceBid($jobId: ID!, $amount: Float!) {
//     placeBid(jobId: $jobId, amount: $amount) {
//       id
//     }
//   }
// `;

const JobDetailPage: React.FC = () => {
  const { jobId } = useParams();
  const { loading, error, data } = useQuery(GET_JOB_DETAILS_QUERY, {
    variables: { jobId },
  });
  //   const [placeBid] = useMutation(PLACE_BID_MUTATION);
  //   const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    // You might want to handle any additional logic here
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div />;
};

export default JobDetailPage;
