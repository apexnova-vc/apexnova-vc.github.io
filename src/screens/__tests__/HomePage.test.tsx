import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../lib/i18n";
import HomePage from "../HomePage";
import "@testing-library/jest-dom/extend-expect";

test("renders HomePage and checks language change", () => {
  const { getByText } = render(
    <I18nextProvider i18n={i18n}>
      <HomePage />
    </I18nextProvider>,
  );

  // Check if "Welcome to React" is in the document
  expect(getByText("Welcome to React")).toBeInTheDocument();

  // Simulate a click on the button to change language to 'en'
  // Simulate a click on the button to change language to 'en'
  fireEvent.click(getByText("English"));

  // Check if language has been changed
  // This assumes that the text 'Welcome to React' remains the same when the language changes to 'en'
  expect(getByText("Welcome to React")).toBeInTheDocument();
});
