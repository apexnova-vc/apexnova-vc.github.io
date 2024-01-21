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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("Welcome to React")}</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => changeLanguage("en")}
      >
        English
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => changeLanguage("de")}
      >
        German
      </button>
    </div>
  );
};

export default HomePage;
