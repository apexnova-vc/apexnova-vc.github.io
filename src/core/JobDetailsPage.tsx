import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { TextField, Button, Paper, Typography } from "@mui/material";

const GET_JOB_DETAILS = gql`
  query GetJobDetails($jobId: ID!) {
    job(id: $jobId) {
      id
      desc
      requirements
      author {
        name
        email
      }
      bids {
        id
      }
    }
  }
`;

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const { loading, error, data } = useQuery(GET_JOB_DETAILS, {
    variables: { jobId },
  });

  const handleBidAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBidAmount(event.target.value);
  };

  const handleSubmitBid = () => {
    // Logic to submit the bid
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const job = data?.job;
  const timeRemaining = new Date().getTime() - new Date().getTime(); // TODO

  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Typography variant="h5">{job?.desc}</Typography>
      <Typography variant="subtitle1">
        Requirements: {job?.requirements}
      </Typography>
      <Typography variant="subtitle1">Posted by: {job?.author.name}</Typography>
      <Typography variant="subtitle1">
        Contact: {job?.author.contactInfo}
      </Typography>
      <Typography variant="subtitle1">Lowest Bid: {"Low"}</Typography>
      <Typography variant="subtitle1">
        Number of Bids: {job?.bidCount}
      </Typography>
      <Typography variant="subtitle1">
        Time Remaining: {timeRemaining > 0 ? `${timeRemaining} ms` : "Expired"}
      </Typography>

      <TextField
        label="Your Bid Amount"
        value={bidAmount}
        onChange={handleBidAmountChange}
        type="number"
        fullWidth
        sx={{ my: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitBid}
        fullWidth
      >
        Place Bid
      </Button>
    </Paper>
  );
};

export default JobDetailsPage;
