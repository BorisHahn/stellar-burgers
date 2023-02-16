import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {mainURL} from '../../utils/const';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await fetch(`${mainURL}/ingredients`);
    if (response.ok) {
      return response.json();
    }
  },
);
const initialState = {
  allIngredients: [],
  constructorElements: [],
  ingredientDetails: {},
  order: { igredients: [] },
  loadingStatus: 'idle',
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = [action.payload.data];
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default ingredientsSlice.reducer;
