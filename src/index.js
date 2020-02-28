import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import client from "./routes/Apollo";
import { ApolloProvider } from "@apollo/react-hooks";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
