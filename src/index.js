import React from "react";
import ReactDOM from "react-dom/client";
import GlobalState from "./context";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <BrowserRouter basename="/sneakers-online">
  <HashRouter>
    <React.StrictMode>
      <GlobalState>
        <App />
      </GlobalState>
    </React.StrictMode>
  </HashRouter>
);
