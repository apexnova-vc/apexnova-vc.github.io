/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetJobDetails
// ====================================================

export interface GetJobDetails_job_author {
  __typename: "User";
  name: string;
  email: string;
}

export interface GetJobDetails_job_bids {
  __typename: "Bid";
  id: string;
}

export interface GetJobDetails_job {
  __typename: "Job";
  id: string;
  desc: string;
  requirements: string;
  author: GetJobDetails_job_author | null;
  bids: (GetJobDetails_job_bids | null)[] | null;
}

export interface GetJobDetails {
  job: GetJobDetails_job | null;
}

export interface GetJobDetailsVariables {
  jobId: string;
}
