import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
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
