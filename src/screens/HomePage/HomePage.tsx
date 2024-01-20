import { Button } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import { useTranslation } from "react-i18next";

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      title
      author {
        id
        name
      }
    }
  }
`;

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <h1>{t("Welcome to React")}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => changeLanguage("en")}
      >
        English
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => changeLanguage("de")}
      >
        German
      </Button>
    </div>
  );
};

export default HomePage;
