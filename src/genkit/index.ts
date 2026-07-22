import { genkit } from 'genkit';
import * as z from 'zod';
import { vertexAI } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [vertexAI()],
});

const inputSchema = z.object({
  items: z.array(z.string()).describe('Array of grocery items'),
});

const outputSchema = z.object({
  suggestions: z.array(
    z.object({
      name: z.string(),
      category: z.string(),
      reason: z.string(),
      priority: z.enum(['low', 'medium', 'high']),
      quantity: z.number().min(1).optional(),
      unit: z.string().optional(),
    }),
  ),
});

export const simpleSuggestionsFlow = ai.defineFlow(
  {
    name: 'simpleSuggestions',
    inputSchema: inputSchema as any,
    outputSchema: outputSchema as any,
  },
  async (input) => {
    const prompt = `
    You are a grocery shopping assistant. I have these items in my shopping list:
${input.items.join(', ')}

Please suggest 3-5 additional grocery items that would complement this list. For each suggestion, provide:
- name: the item name
- category: one of (produce, dairy, meat, pantry, beverages, snacks, other)
- reason: why this item is suggested (complementary, essential, healthy, etc.)
- priority: low, medium, or high

Focus on practical, commonly purchased items that make sense with the current list.
  `;
    try {
      const { output } = await ai.generate({
        model: 'vertexai/gemini-2.5-flash',
        prompt,
        config: {
          output: {
            schema: outputSchema,
          },
        },
      });

      return output || { suggestions: [] };
    } catch (error) {
      console.error('Error generating suggestions with Genkit: ', error);
      return { suggestions: [] };
    }
  },
);

export function initializeGenkit() {
  console.log('Genkit initialized');
}
