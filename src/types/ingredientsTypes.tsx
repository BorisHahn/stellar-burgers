export interface IIngredientCard {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

interface IOrder {
  order: {number: number};
}

export interface IInitialState {
  allIngredients: IIngredientCard[];
  constructorElements: IIngredientCard[];
  ingredientDetails: IIngredientCard | null;
  order: IOrder | null;
  loadingStatus: boolean;
  error: object | null;
}
