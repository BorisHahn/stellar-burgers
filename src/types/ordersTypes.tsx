import {TIngredientCard} from '../types/ingredientsTypes';

export interface IOrderItem {
  ingredients: string[];
  _id: string;
  status: string;
  number: number | string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderCardProps {
  item: IOrderItem;
}

export interface IOrderInitialState {
  orders: IOrderItem[];
  orderDetails: IOrderItem | null;
  currentOrderIngredients: TIngredientCard[];
}
