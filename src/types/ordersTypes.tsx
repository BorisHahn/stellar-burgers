import { TIngredientCard } from '../types/ingredientsTypes';

export interface IOrderItem {
  ingredients: string[];
  _id: string;
  status: string;
  number: number | string | undefined;
  createdAt: string;
  updatedAt: string;
  name?: string;
}

export interface IOrderCardProps {
  item: IOrderItem;
}

export interface IOrders {
  orders: IOrderItem[];
  total: number;
  totalToday: number;
}

export interface IOrderInitialState {
  orders: IOrders | null;
  currentOrder: { success: boolean; orders: IOrderItem[] } | null;
  connectionError: string;
}
