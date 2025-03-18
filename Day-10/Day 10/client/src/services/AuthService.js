import axios from "axios";

const API_URL = "https://localhost:7153/api/Authentication"; // Backend Auth API

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials); // ✅ Corrected API endpoint
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
      }

      return token;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to home after logout
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default AuthService;
