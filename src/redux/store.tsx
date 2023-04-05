import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import regAndAuthSlice from './slices/regAndAuthSlice';
import ordersSlice from './slices/ordersSlice';
const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    accessProcedure: regAndAuthSlice,
    orders: ordersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
