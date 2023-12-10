/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ContextGetUserById
// ====================================================

export interface ContextGetUserById_user {
  __typename: "User";
  id: string;
  name: string;
}

export interface ContextGetUserById {
  user: ContextGetUserById_user | null;
}

export interface ContextGetUserByIdVariables {
  id: string;
}
