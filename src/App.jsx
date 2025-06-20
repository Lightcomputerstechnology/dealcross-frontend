import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./AppRoutes"; // 👈 This becomes your ONLY router

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <AppRoutes /> {/* ✅ Use AppRoutes for all routing */}
      </AuthProvider>
    </Router>
  );
}

export default App;