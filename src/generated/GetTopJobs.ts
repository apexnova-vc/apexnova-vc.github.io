/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTopJobs
// ====================================================

export interface GetTopJobs_top_jobs_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetTopJobs_top_jobs_bids {
  __typename: "Bid";
  id: string;
}

export interface GetTopJobs_top_jobs {
  __typename: "Job";
  id: string;
  desc: string;
  requirements: string;
  author: GetTopJobs_top_jobs_author | null;
  bids: (GetTopJobs_top_jobs_bids | null)[] | null;
}

export interface GetTopJobs {
  top_jobs: (GetTopJobs_top_jobs | null)[] | null;
}
