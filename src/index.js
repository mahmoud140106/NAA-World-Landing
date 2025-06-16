import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { LanguageProvider } from "translate-easy";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </LanguageProvider>
  </React.StrictMode>
);

reportWebVitals();
