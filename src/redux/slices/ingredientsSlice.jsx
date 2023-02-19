import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mainURL } from '../../utils/const';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await fetch(`${mainURL}/ingredients`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  },
);

export const makeAnOrder = createAsyncThunk(
  'ingredients/makeAnOrder',
  async (data) => {
    const response = await fetch(`${mainURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
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
  order: {},
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
      if (
        state.constructorElements.length === 0 &&
        action.payload.type !== 'bun'
      ) {
        alert('Положите сперва булку!');
      } else {
        if (action.payload.type === 'bun') {
          state.constructorElements = [
            action.payload,
            ...state.constructorElements.filter((item) => item.type !== 'bun'),
            action.payload,
          ];
        } else {
          state.constructorElements.splice(1, 0, action.payload);
        }
      }
    },
    removeConstructorElements: (state, action) => {
      state.constructorElements = state.constructorElements.filter(
        (item, index) => index !== action.payload,
      );
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
      })
      .addCase(makeAnOrder.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(makeAnOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.constructorElements = [];
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const {
  addCurrentIngredient,
  addConstructorElements,
  removeConstructorElements,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
