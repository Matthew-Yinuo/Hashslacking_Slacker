import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'semantic-ui-css/semantic.min.css';
import { ApolloProvider } from 'react-apollo';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';


const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:8081/graphql' }),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
