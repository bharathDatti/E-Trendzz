// Importing createSlice from Redux Toolkit to create a slice for managing categories
import { createSlice } from "@reduxjs/toolkit";

// ===============================
// Initial State
// ===============================

const initialState = {
  categories: [], // Stores the list of product categories
  loading: false, // Indicates whether category data is being loaded
  error: null,    // Stores any error message related to category fetching
};

// ===============================
// Category Slice
// ===============================

const categorySlice = createSlice({
  name: "categories", // Slice name
  initialState,       // Initial state for the categories
  reducers: {
    
    // Action to set categories when data is fetched successfully
    setCategories: (state, action) => {
      state.categories = action.payload; // Update categories with fetched data
      state.loading = false; // Stop loading after setting categories
      state.error = null; // Clear any previous errors
    },

    // Action to set loading state (used when fetching categories)
    setLoading: (state, action) => {
      state.loading = action.payload; // Update loading status
    },

    // Action to set error message if category fetching fails
    setError: (state, action) => {
      state.error = action.payload; // Store the error message
      state.loading = false; // Stop loading if an error occurs
    },
  },
});

// ===============================
// Export Actions & Reducer
// ===============================

// Exporting actions so they can be dispatched in components
export const { setCategories, setLoading, setError } = categorySlice.actions;

// Exporting the reducer to be included in the Redux store
export default categorySlice.reducer;
