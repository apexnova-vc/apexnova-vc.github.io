import React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import client from './lib/apollo'; // Assuming you have a separate Apollo Client setup file
import {AppProvider} from './context/AppContext'; // Import your custom provider
import Routes from './routers/routes';

// Get the root element from the document
const rootElement = document.getElementById('root');

// Check if rootElement is not null before calling createRoot
if (rootElement !== null) {
  const root = createRoot(rootElement);

  // Use the new createRoot API to render the app
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

// Call the reportWebVitals function, which logs performance-related metrics
reportWebVitals();
