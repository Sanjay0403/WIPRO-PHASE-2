import { createSlice } from "@reduxjs/toolkit";
import { login as loginService, logout as logoutService, getUser } from "../services/authService";

// Load user from localStorage if available
const storedUser = getUser();

const initialState = {
    user: storedUser || null,  // Load user from localStorage (if available)
    isAuthenticated: !!storedUser,  // Set authentication state based on user presence
};

// Create auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

// Export actions
export const { loginSuccess, logoutSuccess } = authSlice.actions;
// ✅ Thunk to Load User on App Start
export const loadUser = () => (dispatch) => {
    const user = getUser();
    if (user) {
        dispatch(setUser(user));
    }
};
// Async thunk for login
export const login = (email, password) => async (dispatch) => {
    try {
        const user = await loginService(email, password); // Call login API
        dispatch(loginSuccess(user)); // Update Redux state
        localStorage.setItem("user", JSON.stringify(user)); // Persist user data
    } catch (error) {
        console.error("Login failed:", error);
    }
};

// Async thunk for logout
export const logout = () => (dispatch) => {
    logoutService(); // Call logout API
    localStorage.removeItem("user"); // Remove user from storage
    dispatch(logoutSuccess()); // Update Redux state
};

// Export reducer
export default authSlice.reducer;
