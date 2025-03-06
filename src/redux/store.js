import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers"; // Ensure it's a default import
import authReducer from "./authReducer"; // Ensure it's a default import

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});
