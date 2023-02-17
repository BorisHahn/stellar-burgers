import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mainURL } from '../../utils/const';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async (thunkAPI) => {
    const response = await fetch(`${mainURL}/ingredients`);
    if (response.ok) {
      const data = await response.json();
      return data;
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
  reducers: {
    addCurrentIngredient: (state, action) => {
      state.ingredientDetails = action.payload;
    },

    addConstructorElements: (state, action) => {
      state.constructorElements.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload.data;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { addCurrentIngredient, addConstructorElements } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
