import { GroceryItem } from './grocery-item';

export interface SmartSuggestion {
  item: GroceryItem;
  reason: string;
  priority: 'low' | 'medium' | 'high';
}
