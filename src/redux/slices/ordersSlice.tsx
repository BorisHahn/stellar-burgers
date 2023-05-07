import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/const';
import { IOrderInitialState, IOrderItem } from '../../types/ordersTypes';
import checkResponse from '../../utils/helpers/checkResponse';
import { wsOpen, wsClose, wsMessage, wsError } from '../actions/wsActions';
const initialState: IOrderInitialState = {
  orders: null,
  currentOrder: null,
  connectionError: '',
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
    builder
      .addCase(getOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(wsOpen, (state) => state)
      .addCase(wsClose, (state) => {
        state.orders = null;
        state.connectionError = '';
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default ordersSlice.reducer;
