import ingredientsReduser, {
  getIngredients,
  makeAnOrder,
  initialState,
  setLoadingStatus,
  setError,
  addCurrentIngredient,
  addConstructorElements,
  replaceConstructorElements,
  removeConstructorElements,
  cleanCurrent,
  cleanOrder,
} from './ingredientsSlice';
import { TIngredientCard, IOrderPayload } from '../../types/ingredientsTypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
describe('ingredientsSlice', () => {
  const bun: TIngredientCard = {
    _id: '123456',
    name: 'Test',
    type: 'bun',
    proteins: 60,
    fat: 50,
    carbohydrates: 40,
    calories: 3,
    price: 1250,
    image: 'image.png',
    image_mobile: 'image.png',
    image_large: 'image.png',
    __v: 456,
    id: '123456',
    index: 2,
    dragId: 567,
  };
  const souse = { ...bun, type: 'souse' };
  it('should handle setLoadingStatus', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const result = ingredientsReduser(state, setLoadingStatus());
    expect(result).toEqual(initialState);
  });
  it('should handle setError', () => {
    const state = {
      ...initialState,
      error: false,
    };
    const result = ingredientsReduser(state, setError());
    expect(result).toEqual(initialState);
  });
  it('should handle addCurrentIngredient', () => {
    const result = ingredientsReduser(initialState, addCurrentIngredient(bun));
    expect(result).toEqual({
      ...initialState,
      ingredientDetails: bun,
    });
  });
  it('should handle cleanCurrent', () => {
    const result = ingredientsReduser(initialState, cleanCurrent());
    expect(result).toEqual({
      ...initialState,
      ingredientDetails: null,
    });
  });
  it('should handle addConstructorElements', () => {
    const result = ingredientsReduser(
      {
        ...initialState,
        constructorElements: [bun, souse, bun],
      },
      addConstructorElements(bun),
    );

    expect(result).toEqual({
      ...initialState,
      constructorElements: [bun, souse, bun],
    });

    const result2 = ingredientsReduser(
      initialState,
      addConstructorElements(souse),
    );

    expect(result2).toEqual({
      ...initialState,
      constructorElements: [],
    });

    const result3 = ingredientsReduser(
      { ...initialState, constructorElements: [bun] },
      addConstructorElements(souse),
    );

    expect(result3).toEqual({
      ...initialState,
      constructorElements: [bun, souse],
    });
  });
  it('should handle replaceConstructorElements', () => {
    const main = { ...bun, type: 'main' };
    const result = ingredientsReduser(
      {
        ...initialState,
        constructorElements: [bun, souse, main],
      },
      replaceConstructorElements({ dragIndex: 1, hoverIndex: 2 }),
    );
    expect(result).toEqual({
      ...initialState,
      constructorElements: [bun, main, souse],
    });
  });
  it('should handle removeConstructorElements', () => {
    const state = {
      ...initialState,
      constructorElements: [bun],
    };
    const result = ingredientsReduser(state, removeConstructorElements(bun));
    expect(result).toEqual(state);
  });
  it('should handle cleanOrder', () => {
    const result = ingredientsReduser(initialState, cleanOrder());
    expect(result).toEqual({
      ...initialState,
      order: null,
    });
  });
  it('should handle pending getIngredients', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: getIngredients.pending.type };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
      error: false,
    });
  });
  it('should handle success getIngredients', () => {
    const getIngredientsResponse: {
      success: boolean;
      data: TIngredientCard[];
    } = {
      success: true,
      data: [bun],
    };
    const state = {
      ...initialState,
      allIngredients: [],
    };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: getIngredientsResponse,
    };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      allIngredients: [...getIngredientsResponse.data],
    });
  });
  it('should handle failed getIngredients', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
      error: false,
    };
    const action = {
      type: getIngredients.rejected.type,
    };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
  it('should handle pending makeAnOrder', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
    };
    const action = { type: makeAnOrder.pending.type };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: true,
      error: false,
    });
  });
  it('should handle success makeAnOrder', () => {
    const getIngredientsResponse: IOrderPayload = {
      success: true,
      name: 'Space флюоресцентный бургер',
      order: { number: 6308 },
    };
    const state = {
      ...initialState,
      order: null,
      constructorElements: [],
    };
    const action = {
      type: makeAnOrder.fulfilled.type,
      payload: getIngredientsResponse,
    };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      order: getIngredientsResponse,
      constructorElements: [],
    });
  });
  it('should handle failed makeAnOrder', () => {
    const state = {
      ...initialState,
      loadingStatus: false,
      error: false,
    };
    const action = {
      type: makeAnOrder.rejected.type,
    };
    const result = ingredientsReduser(state, action);
    expect(result).toEqual({
      ...initialState,
      loadingStatus: false,
      error: true,
    });
  });
});
