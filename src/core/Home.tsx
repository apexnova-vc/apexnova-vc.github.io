import React from "react";
import { useQuery, gql } from "@apollo/client";
import {
  List,
  ListItemText,
  Paper,
  ListItemButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetTopJobs } from "../generated/GetTopJobs";

// Define your GraphQL queries for jobs
// const GET_RECENT_JOBS_QUERY = gql`
//   query GetRecentJobs {
//     top_jobs {
//       id
//       desc
//       requirements
//       author {
//         id
//         name
//       }
//     }
//   }
// `;

/**
 * css
 * sass
 * tailwind.
 *
 */

const GET_TOP_JOBS_QUERY = gql`
  query GetTopJobs {
    top_jobs {
      id
      desc
      requirements
      author {
        id
        name
      }
      bids {
        id
      }
    }
  }
`;

const JobFeed: React.FC = () => {
  // const navigate = useNavigate();
  //   const {
  //     loading: loadingRecent,
  //     error: errorRecent,
  //     data: dataRecent,
  //   } = useQuery(GET_RECENT_JOBS_QUERY);
  const { loading, error, data } = useQuery<GetTopJobs>(GET_TOP_JOBS_QUERY);

  //   if (loadingRecent || loadingTop) return <p>Loading...</p>;
  //   if (errorRecent || errorTop)
  //     return <p>Error! {errorRecent?.message || errorTop?.message}</p>;

  //   const handleJobClick = (id: string) => {
  //     navigate(`/jobs/${id}`); // Adjust the navigation path as necessary
  //   };

  //   const handleCreateJob = () => {
  //     navigate("/create-job"); // Adjust the navigation path as necessary
  //   };

  return (
    <Paper elevation={3} sx={{ my: 2, p: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // todo
        }}
        sx={{ mb: 2 }}
      >
        Post New Job
      </Button>
      <List>
        <h2>Recent Jobs</h2>
        {/* {dataRecent?.recentJobs?.map((job) => (
          <ListItemButton key={job.id} onClick={() => handleJobClick(job.id)}>
            <ListItemText
              primary={job.desc}
              secondary={`Posted by ${job.author?.name}`}
            />
          </ListItemButton>
        ))} */}
      </List>
      <List>
        <h2>Top Jobs</h2>
        {data?.top_jobs?.map((job) => (
          <ListItemButton
            key={job?.id}
            onClick={() => {
              // todo
            }}
          >
            <ListItemText
              primary={job?.desc}
              secondary={`Bids: ${job?.bids} | Posted by ${job?.author?.name}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default JobFeed;
