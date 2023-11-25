import "../init.js"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/reduxStore/store";
import "font-awesome/css/font-awesome.min.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  
);
