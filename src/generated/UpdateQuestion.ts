/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateQuestion
// ====================================================

export interface UpdateQuestion_updateQuestion {
  __typename: "Question";
  id: string;
  title: string;
  content: string;
}

export interface UpdateQuestion {
  updateQuestion: UpdateQuestion_updateQuestion | null;
}

export interface UpdateQuestionVariables {
  id: string;
  title: string;
  content: string;
}
