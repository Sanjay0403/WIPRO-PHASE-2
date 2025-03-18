import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Login />
    </AuthProvider>
  );
}

export default App;
