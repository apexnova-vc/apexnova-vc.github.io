import React from "react";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import QuestionForm from "../core/QuestionForm";

// Mock the AppContext
jest.mock("../context/AppContext", () => ({
  useAppContext: () => ({ user: { id: "123" } }), // Example user ID
}));

test("renders the QuestionForm component", () => {
  render(
    <MockedProvider>
      <QuestionForm />
    </MockedProvider>,
  );

  // You can add a simple check to ensure the form is in the document.
  // This depends on what is renderable in your component.
  // For example, you might check for a form element, a title, or a specific text.
  expect(screen.getByText("Submit")).toBeInTheDocument();
});
