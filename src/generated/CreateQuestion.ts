/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateQuestion
// ====================================================

export interface CreateQuestion_createQuestion_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface CreateQuestion_createQuestion {
  __typename: "Question";
  id: string;
  title: string;
  content: string;
  author: CreateQuestion_createQuestion_author | null;
}

export interface CreateQuestion {
  createQuestion: CreateQuestion_createQuestion | null;
}

export interface CreateQuestionVariables {
  title: string;
  content: string;
  authorId: string;
}
