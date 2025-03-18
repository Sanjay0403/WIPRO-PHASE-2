import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);

  return (
    <nav>
      <h2>My App</h2>
      {token ? (
        <button onClick={() => setToken(null)}>Logout</button>
      ) : (
        <button onClick={() => window.location.href = "/login"}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
