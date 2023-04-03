interface IOrderItem {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderCardProps {
  item: IOrderItem;
}
