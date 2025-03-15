// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = "https://localhost:7144/api/expenses";

// // Function to get token from localStorage
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   if (!token) throw new Error("Unauthorized: No token found");
//   return { Authorization: `Bearer ${token}` };
// };

// // Async Thunks for API Calls
// export const fetchExpenses = createAsyncThunk("finance/fetchExpenses", async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(API_URL, {
//       headers: getAuthHeaders(), // Include token
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to fetch expenses.");
//   }
// });

// export const addExpense = createAsyncThunk("finance/addExpense", async (expense, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(API_URL, expense, {
//       headers: getAuthHeaders(), // Include token
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to add expense.");
//   }
// });

// export const deleteExpense = createAsyncThunk("finance/deleteExpense", async (id, { rejectWithValue }) => {
//   try {
//     await axios.delete(`${API_URL}/${id}`, {
//       headers: getAuthHeaders(), // Include token
//       withCredentials: true,
//     });
//     return id;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to delete expense.");
//   }
// });

// export const updateExpense = createAsyncThunk("finance/updateExpense", async ({ id, updatedData }, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, updatedData, {
//       headers: getAuthHeaders(), // Include token
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || "Failed to update expense.");
//   }
// });

// // Redux Slice
// const financeSlice = createSlice({
//   name: "finance",
//   initialState: {
//     expenses: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchExpenses.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(fetchExpenses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.expenses = action.payload;
//       })
//       .addCase(fetchExpenses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       .addCase(addExpense.pending, (state) => { state.loading = true; })
//       .addCase(addExpense.fulfilled, (state, action) => {
//         state.loading = false;
//         state.expenses.push(action.payload);
//       })
//       .addCase(addExpense.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(deleteExpense.pending, (state) => { state.loading = true; })
//       .addCase(deleteExpense.fulfilled, (state, action) => {
//         state.loading = false;
//         state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
//       })
//       .addCase(deleteExpense.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       .addCase(updateExpense.fulfilled, (state, action) => {
//         state.expenses = state.expenses.map(expense =>
//           expense.id === action.payload.id ? action.payload : expense
//         );
//       })
//       .addCase(updateExpense.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetError } = financeSlice.actions;
// export default financeSlice.reducer;import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  // Make sure this line is present
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "https://localhost:7144/api/expenses";

// Utility function to get Authorization headers (for bearer token)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");
  return { Authorization: `Bearer ${token}` };
};

// Thunks for async actions (fetch, add, update, delete expenses)
export const fetchExpenses = createAsyncThunk("finance/fetchExpenses", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Failed to fetch expenses.");
  }
});

export const addExpense = createAsyncThunk("finance/addExpense", async (expense, { rejectWithValue }) => {
  try {
    // Confirm data format before sending
    const formattedExpense = {
      ...expense,
      id: undefined,  // Ensure no ID is sent for new expense
      date: new Date(expense.date).toISOString().split("T")[0], // Ensure the date is in 'YYYY-MM-DD' format
      amount: parseFloat(expense.amount), // Ensure amount is a number
    };

    console.log("Formatted Expense Data:", formattedExpense);

    // Send the expense data to the API
    const response = await axios.post(API_URL, formattedExpense, {
      headers: getAuthHeaders(), // Include Authorization token
    });

    return response.data; // Return the added expense from the backend
  } catch (error) {
    console.error("Error adding expense:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Failed to add expense.");
  }
});


export const updateExpense = createAsyncThunk("finance/updateExpense", async ({ id, updatedData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Failed to update expense.");
  }
});

export const deleteExpense = createAsyncThunk("finance/deleteExpense", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return id;
  } catch (error) {
    console.error("Error deleting expense:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || "Failed to delete expense.");
  }
});

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        );
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
      });
  },
});

export default financeSlice.reducer;
