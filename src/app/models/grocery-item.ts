import { GroceryCategory } from './grocery-category';

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity?: number;
  unit?: string;
  createdAt: Date;
  updatedAt: Date;
}
