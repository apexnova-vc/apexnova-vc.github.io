/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuestionDetail
// ====================================================

export interface GetQuestionDetail_question_author {
  __typename: "User";
  id: string;
  name: string;
}

export interface GetQuestionDetail_question {
  __typename: "Question";
  id: string;
  title: string;
  content: string;
  author: GetQuestionDetail_question_author | null;
}

export interface GetQuestionDetail {
  question: GetQuestionDetail_question | null;
}

export interface GetQuestionDetailVariables {
  id: string;
}
