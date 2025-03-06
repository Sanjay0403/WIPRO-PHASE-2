const initialAuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  };
  
  const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("isAuthenticated", "true");
        return { ...state, isAuthenticated: true };
      case "LOGOUT":
        localStorage.removeItem("isAuthenticated");
        return { ...state, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer; // Ensure default export
  