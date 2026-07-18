import { computed, Service, signal } from '@angular/core';
import { GroceryItem } from '../models/grocery-item';
import { httpResource } from '@angular/common/http';
import { SmartSuggestion } from '../models/grocery-smart-suggestion';

@Service()
export class AiGroceryAssistant {
  private apiRequest = signal<{ items: GroceryItem[] } | null>(null);

  private smartSuggestionResource = httpResource<SmartSuggestion[]>(() => {
    const request = this.apiRequest();
    if (!request) return undefined;

    return {
      url: '/api/smart-suggestions',
      method: 'POST',
      body: request,
    };
  });

  readonly suggestions = computed(() => {
    const resourceData = this.smartSuggestionResource.value();
    if (!resourceData) return [] as SmartSuggestion[];

    return resourceData as SmartSuggestion[];
  });

  readonly isLoading = this.smartSuggestionResource.isLoading;
  readonly error = this.smartSuggestionResource.error;

  generateSmartSuggestions(groceryItems: GroceryItem[]) {
    this.apiRequest.set({ items: groceryItems });
  }

  clearSuggestions() {
    this.apiRequest.set(null);
  }
}
