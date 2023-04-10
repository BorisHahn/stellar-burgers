import { createSlice } from '@reduxjs/toolkit';
import { IOrderInitialState } from '../../types/ordersTypes';
const initialState: IOrderInitialState = {
  orders: [],
  orderDetails: null,
  currentOrderIngredients: [],
};
const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    addCurrentOrder: (state, action) => {
      state.orderDetails = action.payload;
    },
    addCurrentOrderIngredients: (state, action) => {
      state.currentOrderIngredients = action.payload;
    },
  },
});

export default ordersSlice.reducer;
export const { addCurrentOrder, addCurrentOrderIngredients } =
  ordersSlice.actions;
