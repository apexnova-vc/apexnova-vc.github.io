/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRecentJobs
// ====================================================

export interface GetRecentJobs_top_jobs_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetRecentJobs_top_jobs {
  __typename: "Job";
  id: string;
  desc: string;
  requirements: string;
  author: GetRecentJobs_top_jobs_author | null;
}

export interface GetRecentJobs {
  top_jobs: (GetRecentJobs_top_jobs | null)[] | null;
}
