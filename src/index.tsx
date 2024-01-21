import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css"; // Ensure this imports the CSS file where you added Tailwind directives
import "./lib/i18n";
import { AppProvider } from "./context/AppContext";
import client from "./lib/apollo";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routers/routes";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ApolloProvider>
    </React.StrictMode>,
  );
}

reportWebVitals();
