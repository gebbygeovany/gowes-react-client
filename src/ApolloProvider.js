import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
// import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";
import { split, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

let httpLink = createHttpLink({
  uri: "https://gowes-market-apollo-server.herokuapp.com/",
  // uri: "http://localhost:3000"
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: "ws://gowes-market-apollo-server.herokuapp.com/",
  // uri: "ws://localhost:5000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  uri: "https://gowes-market-apollo-server.herokuapp.com/",
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App></App>
  </ApolloProvider>
);
