import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  mainURL,
  loadingStatus,
  idleStatus,
  failedStatus,
  bun,
} from '../../utils/const';

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
  ingredientDetails: null,
  order: null,
  loadingStatus: idleStatus,
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
        action.payload.type !== bun
      ) {
        return;
      } else {
        if (action.payload.type === bun) {
          state.constructorElements = [
            action.payload,
            ...state.constructorElements.filter((item) => item.type !== bun),
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

    replaceConstructorElements: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = state.constructorElements;
      const dragCard = ingredients[dragIndex];
      ingredients.splice(dragIndex, 1);
      ingredients.splice(hoverIndex, 0, dragCard);
    },

    cleanOrderAndCurrent: (state) => {
      state.ingredientDetails = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingStatus = loadingStatus;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload.data;
        state.loadingStatus = idleStatus;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingStatus = failedStatus;
        state.error = action.error;
      })
      .addCase(makeAnOrder.pending, (state) => {
        state.loadingStatus = loadingStatus;
        state.error = null;
      })
      .addCase(makeAnOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.constructorElements = [];
        state.loadingStatus = idleStatus;
        state.error = null;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.loadingStatus = failedStatus;
        state.error = action.error;
      });
  },
});

export const {
  addCurrentIngredient,
  addConstructorElements,
  removeConstructorElements,
  replaceConstructorElements,
  cleanOrderAndCurrent,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
