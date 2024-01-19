import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface IResources {
  [key: string]: {
    translation: {
      [key: string]: string;
    };
  };
}

const resources: IResources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React",
    },
  },
  de: {
    translation: {
      "Welcome to React": "Willkommen bei React",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
