import { GroceryItem } from './grocery-item';

export interface GroceryList {
  id: string;
  name: string;
  items: GroceryItem[];
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
}
