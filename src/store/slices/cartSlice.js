// Importing createSlice from Redux Toolkit to create a slice for the cart
import { createSlice } from '@reduxjs/toolkit';

// ===============================
// Initial State
// ===============================

const initialState = {
  items: [], // Stores cart items
  total: 0,  // Stores the total price of all items in the cart
};

// ===============================
// Cart Slice
// ===============================

const cartSlice = createSlice({
  name: 'cart',        // Slice name
  initialState,        // Initial state for the cart
  reducers: {
    
    // Action to add an item to the cart
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // If the item exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Recalculate the total price after adding the item
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      // Remove the item with the matching ID from the cart
      state.items = state.items.filter(item => item.id !== action.payload);

      // Recalculate the total price after removing the item
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Action to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      
      // Find the item in the cart by its ID
      const item = state.items.find(item => item.id === id);

      if (item) {
        // Update the item's quantity
        item.quantity = quantity;
      }

      // Recalculate the total price after updating the quantity
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
  },
});

// Exporting actions so they can be used in components
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Exporting the reducer to be included in the Redux store
export default cartSlice.reducer;
