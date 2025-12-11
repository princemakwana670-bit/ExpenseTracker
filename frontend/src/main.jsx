import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ExpenseProvider } from "./context/ExpenseContext";

// Bootstrap CSS (utilities) - optional but convenient
import "bootstrap/dist/css/bootstrap.min.css";
// Custom globals
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </React.StrictMode>
);
