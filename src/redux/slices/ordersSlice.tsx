import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/const';
import { IOrderInitialState } from '../../types/ordersTypes';
import checkResponse from '../../utils/helpers/checkResponse';
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
  extraReducers: (builder) => {},
});

export default ordersSlice.reducer;
export const { addCurrentOrder, addCurrentOrderIngredients } =
  ordersSlice.actions;
