import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { getUser } from "../services/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";
import logo from "../assets/logo.webp";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Initialize navigate
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
        const storedUser = getUser();
        if (storedUser) {
            dispatch({ type: "auth/loginSuccess", payload: storedUser });
        }
    }
}, [isAuthenticated, user, dispatch]); // ✅ Depend on 'user' & 'isAuthenticated'

  const handleLogout = () => {
    dispatch(logout()); // ✅ Logout
    navigate("/login"); // ✅ Redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="Finance Tracker Logo" className="logo me-2" />
          Fin Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">Support</Link>
            </li>

            {isAuthenticated ? (
              <>
                {user?.firstName && user?.lastName && (
                  <li className="nav-item">
                    <span className="nav-link username">
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link login-btn" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link register-btn" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
