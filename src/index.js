import React, { StrictMode } from "react";  //React
import { createRoot } from "react-dom/client"; //React’s library to talk to web browsers (React DOM)
import "./styles.css";

import App from "./App"; //component created in App.js

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);  //rendering the component App in the root element of the HTML document
// injects the final product into index.html in the public folder