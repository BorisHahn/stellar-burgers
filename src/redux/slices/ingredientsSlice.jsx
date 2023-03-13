import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, bun } from '../../utils/const';
import checkResponse from '../../utils/helpers/checkResponse';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  () => {
    return fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
      .catch((err) => console.error(err));
  },
);

export const makeAnOrder = createAsyncThunk(
  'ingredients/makeAnOrder',
  (data) => {
    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    })
      .then(checkResponse)
      .catch((err) => console.error(err));
  },
);

const initialState = {
  allIngredients: [],
  constructorElements: [],
  ingredientDetails: null,
  order: null,
  loadingStatus: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = false;
    },

    setError: (state, action) => {
      state.error = null;
    },

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

    cleanCurrent: (state) => {
      state.ingredientDetails = null;
    },
    cleanOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload.data;
        state.loadingStatus = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })
      .addCase(makeAnOrder.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
      })
      .addCase(makeAnOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.constructorElements = [];
        state.loadingStatus = false;
        state.error = null;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});

export const {
  addCurrentIngredient,
  addConstructorElements,
  removeConstructorElements,
  replaceConstructorElements,
  cleanCurrent,
  cleanOrder,
  setLoadingStatus,
  setError,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
