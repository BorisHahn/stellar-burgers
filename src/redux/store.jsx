import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
const store = configureStore({
  reducer: { ingredients: ingredientsSlice },
});

export default store;
