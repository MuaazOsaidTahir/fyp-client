import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from './reducer';

const client = new ApolloClient({
  credentials: "include",
  uri: 'http://localhost:8000/graphql?',
  cache: new InMemoryCache(),
});

const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <Provider store={store} >
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
