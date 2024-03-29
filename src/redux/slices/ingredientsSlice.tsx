import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/ingredientsTypes';
import { BASE_URL, bun } from '../../utils/const';
import checkResponse from '../../utils/helpers/checkResponse';
import { IOrderResponse, IOrderPayload } from '../../types/ingredientsTypes';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  () => {
    return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
  },
);

export const makeAnOrder = createAsyncThunk<IOrderPayload, IOrderResponse>(
  'ingredients/makeAnOrder',
  (data: IOrderResponse) => {
    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') || '',
      },
      body: JSON.stringify(data),
    }).then(checkResponse);
  },
);

export const initialState: IInitialState = {
  allIngredients: [],
  constructorElements: [],
  ingredientDetails: null,
  order: null,
  loadingStatus: false,
  error: false,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    setLoadingStatus: (state) => {
      state.loadingStatus = false;
    },

    setError: (state) => {
      state.error = false;
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
      const dragCard = state.constructorElements[dragIndex];
      state.constructorElements.splice(dragIndex, 1);
      state.constructorElements.splice(hoverIndex, 0, dragCard);
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
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload.data;
        state.loadingStatus = false;
        state.error = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = true;
      })
      .addCase(makeAnOrder.pending, (state) => {
        state.loadingStatus = true;
        state.error = false;
      })
      .addCase(makeAnOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.constructorElements = [];
        state.loadingStatus = false;
        state.error = false;
      })
      .addCase(makeAnOrder.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = true;
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
