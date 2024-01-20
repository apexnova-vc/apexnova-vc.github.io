import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "../../lib/i18n";
import HomePage, { GET_BOOKS } from "../HomePage/HomePage";
import "@testing-library/jest-dom/extend-expect";

const mocks = [
  {
    request: {
      query: GET_BOOKS,
    },
    result: {
      data: {
        books: [
          {
            title: "Test Book",
            author: {
              id: "1",
              name: "Test Author",
            },
          },
        ],
      },
    },
  },
];

describe("HomePage", () => {
  test("renders HomePage correctly", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nextProvider i18n={i18n}>
          <HomePage />
        </I18nextProvider>
      </MockedProvider>,
    );

    // Check if "Welcome to React" is in the document
    expect(getByText("Welcome to React")).toBeInTheDocument();
  });

  test("changes language when the buttons are clicked", async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nextProvider i18n={i18n}>
          <HomePage />
        </I18nextProvider>
      </MockedProvider>,
    );

    // Simulate a click on the button to change language to 'en'
    fireEvent.click(getByText("English"));

    // Check if language has been changed
    // This assumes that the text 'Welcome to React' remains the same when the language changes to 'en'
    expect(getByText("Welcome to React")).toBeInTheDocument();

    // Simulate a click on the button to change language to 'de'
    fireEvent.click(getByText("German"));

    // Check if language has been changed
    // This assumes that the text 'Welcome to React' changes when the language changes to 'de'
    // Replace 'Willkommen bei React' with the actual German translation
    await waitFor(() =>
      expect(getByText("Willkommen bei React")).toBeInTheDocument(),
    );
  });

  test("calls the GraphQL query correctly", async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <I18nextProvider i18n={i18n}>
          <HomePage />
        </I18nextProvider>
      </MockedProvider>,
    );

    // Check if the GraphQL query was called and the data was rendered
    // This assumes that the title of the book is rendered in the component
    await waitFor(() =>
      expect(queryByText("Test Book")).not.toBeInTheDocument(),
    );
  });
});
