
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "./auth-context/auth.context";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "./redux/store"

let user = localStorage.getItem("user");
user = JSON.parse(user);

ReactDOM.render(
  <BrowserRouter>
    <SoftUIControllerProvider>
      <Provider store={store}>
        <AuthProvider userData={user}>
          <App />
        </AuthProvider>
      </Provider>
    </SoftUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
