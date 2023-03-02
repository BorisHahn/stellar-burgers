import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import regAndAuthSlice from './slices/regAndAuthSlice';
const store = configureStore({
  reducer: { ingredients: ingredientsSlice, accessProcedure: regAndAuthSlice },
});

export default store;
