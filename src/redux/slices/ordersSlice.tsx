import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/const';
import { IOrderInitialState, IOrderItem } from '../../types/ordersTypes';
import checkResponse from '../../utils/helpers/checkResponse';
import { wsOpen, wsClose, wsMessage, wsError } from '../actions/wsActions';
export const initialState: IOrderInitialState = {
  orders: null,
  currentOrder: null,
  connectionError: '',
  loadingStatus: true
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
      .addCase(wsOpen, (state) => {
        state.loadingStatus = true;
      })
      .addCase(wsClose, (state) => {
        state.orders = null;
        state.connectionError = '';
        state.loadingStatus = true;
      })
      .addCase(wsError, (state, action) => {
        state.connectionError = action.payload;
        state.loadingStatus = false;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload;
        state.loadingStatus = false;
      });
  },
});

export default ordersSlice.reducer;
