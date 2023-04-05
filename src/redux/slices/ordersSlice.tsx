import { createSlice } from '@reduxjs/toolkit';
import { IOrderInitialState } from '../../types/ordersTypes';
const initialState: IOrderInitialState = {
  orders: [],
  orderDetails: null,
};
const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    addCurrentOrder: (state, action) => {
      state.orderDetails = action.payload;
    },
  },
});

export default ordersSlice.reducer;
export const { addCurrentOrder } = ordersSlice.actions;
