// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Axios is used for making API requests. 

// ===============================
// Async Thunk for Updating User Profile
// ===============================

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile", // Action type
  async (updatedData, { rejectWithValue }) => {
    try {
      // Making a PUT request to update user profile
      const response = await axios.put("/api/user/profile", updatedData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data; // Returns updated user data if successful
    } catch (error) {
      // Return an error message if the request fails
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// ===============================
// Initial State
// ===============================

const initialState = {
  user: null,              // Stores user details (null when not authenticated)
  isAuthenticated: false,  // Tracks if the user is logged in
  loading: false,          // Indicates if authentication actions are in progress
  error: null,             // Stores any authentication errors
};

// ===============================
// Auth Slice
// ===============================

const authSlice = createSlice({
  name: "auth",        // Name of the slice
  initialState,        // Setting the initial state
  reducers: {
    // Set user data when logged in
    setUser: (state, action) => {
      
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // True if user exists, false otherwise
      state.loading = false;
      state.error = null;
    },
    // Set loading state for authentication processes
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Handle authentication errors
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Logout action: Clear user data
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  
  // ===============================
  // Handling Async Thunks in Extra Reducers
  // ===============================

  extraReducers: (builder) => {
    builder
      // When `updateUserProfile` is triggered, set loading to true
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When `updateUserProfile` is successful, update the user state
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Update user with new profile data
        state.loading = false;
      })
      // If `updateUserProfile` fails, store the error message
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Exporting actions to be used in components
export const { setUser, setLoading, setError,login, logout } = authSlice.actions;

// Export the reducer to be used in Redux store
export default authSlice.reducer;
