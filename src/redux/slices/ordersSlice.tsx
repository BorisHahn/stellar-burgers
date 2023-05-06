import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/const';
import { IOrderInitialState, IOrderItem } from '../../types/ordersTypes';
import checkResponse from '../../utils/helpers/checkResponse';
const initialState: IOrderInitialState = {
  orders: [],
  currentOrder: null,
};

export const getOrder = createAsyncThunk<
  { success: boolean; orders: IOrderItem[] },
  string
>('orders/getOrder', (orderNumber) => {
  return fetch(`${BASE_URL}/orders/${orderNumber}`).then(checkResponse);
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.currentOrder = action.payload;
    });
  },
});

export default ordersSlice.reducer;
