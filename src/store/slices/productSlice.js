// Importing createSlice from Redux Toolkit to manage product-related state
import { createSlice } from '@reduxjs/toolkit';

// ===============================
// Initial State
// ===============================

const initialState = {
  products: [],         // Stores the list of fetched products
  loading: false,       // Indicates whether product data is being loaded
  error: null,          // Stores any error message related to product fetching
  selectedProduct: null // Stores details of a specific product when selected
};

// ===============================
// Product Slice
// ===============================

const productSlice = createSlice({
  name: 'products',  // Slice name
  initialState,      // Initial state for product management
  reducers: {

    // Action to set the products list when fetched successfully
    setProducts: (state, action) => {
      state.products = action.payload; // Update the state with fetched products
      state.loading = false;  // Stop loading
      state.error = null;      // Clear any previous errors
    },

    // Action to update the loading state while fetching products
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state (true/false)
    },

    // Action to handle errors in case product fetching fails
    setError: (state, action) => {
      state.error = action.payload; // Store the error message
      state.loading = false;  // Stop loading if an error occurs
    },

    // Action to set a selected product for detailed view
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload; // Store the selected product details
    },
  },
});

// ===============================
// Export Actions & Reducer
// ===============================

// Exporting actions for use in components or thunks
export const { setProducts, setLoading, setError, setSelectedProduct } = productSlice.actions;

// Exporting the reducer to be included in the Redux store
export default productSlice.reducer;
