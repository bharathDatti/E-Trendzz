// Import the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import individual slice reducers to manage specific parts of the state
import cartReducer from './slices/cartSlice'; // Handles cart-related actions (add, remove, update items)
import authReducer from './slices/authSlice'; // Manages user authentication state (login, logout, registration)
import productReducer from './slices/productSlice'; // Manages product-related actions (fetch, update, delete products)
import categoryReducer from "./slices/categorySlice"; // Manages product categories (fetching, filtering categories)
import wishlistReducer from "./slices/wishlistSlice"
// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,        // Assign the cart reducer to handle cart state
    auth: authReducer,        // Assign the authentication reducer to handle user login/logout
    products: productReducer, // Assign the product reducer to manage product listings
    categories: categoryReducer, // Assign the category reducer to handle product categories
    wishlist: wishlistReducer,
  },
});

// Now, the store is set up and can be used with the React application via the Provider component
