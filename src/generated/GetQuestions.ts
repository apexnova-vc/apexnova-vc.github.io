/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuestions
// ====================================================

export interface GetQuestions_questions_author {
  __typename: "User";
  id: string;
  name: string;
  email: string;
}

export interface GetQuestions_questions {
  __typename: "Question";
  id: string;
  title: string;
  content: string;
  author: GetQuestions_questions_author | null;
}

export interface GetQuestions {
  questions: (GetQuestions_questions | null)[] | null;
}
