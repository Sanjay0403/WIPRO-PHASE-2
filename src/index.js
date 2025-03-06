import React from "react";
import ReactDOM from "react-dom/client"; // Use "client" for React 18
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Import Redux store
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
