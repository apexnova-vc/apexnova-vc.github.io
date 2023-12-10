import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import client from './lib/apollo'; // Assuming you have a separate Apollo Client setup file
import {AppProvider} from './context/AppContext'; // Import your custom provider
import Routes from './routers/routes';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();
