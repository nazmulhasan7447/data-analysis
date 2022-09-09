import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { appContext } from "./compenents/context/AppContext";
import { AuthContext } from "./compenents/auth/Authentication";
import { AuthProvider } from "./compenents/auth/Authentication";


const RootApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        > 
          <App />
        </SnackbarProvider>
      </AuthProvider>
</BrowserRouter>
  );
};

export default RootApp;
