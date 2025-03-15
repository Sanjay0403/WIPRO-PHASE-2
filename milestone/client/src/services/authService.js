
import axios from "axios";

const API_URL = "https://localhost:7144/api/auth";

// Login function
export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { withCredentials: true }
        );

        if (response.data.token) {
            localStorage.setItem("token", response.data.token); // Store token
            localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
        }

        return response.data.user; // Return user details (name, email, etc.)
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};

// Logout function
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Remove stored user data
    window.location.href = "/login"; // ✅ Force redirect to login

};

// Get Auth Token (for protected API calls)
export const getAuthToken = () => {
    return localStorage.getItem("token");
};

// Get Logged-in User (for persisting session)
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
