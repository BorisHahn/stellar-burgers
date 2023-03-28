export type TIngredientCard = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id?: string;
  index: number;
  dragId?: number;
}

export interface IOrderResponse {
  ingredients: string[];
}
export interface IOrderPayload {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export interface IInitialState {
  allIngredients: TIngredientCard[];
  constructorElements: TIngredientCard[];
  ingredientDetails: TIngredientCard | null;
  order: IOrderPayload | null;
  loadingStatus: boolean;
  error: object | null;
}
