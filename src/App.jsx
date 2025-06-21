import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;