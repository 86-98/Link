// Recommend AI Experts
'use server';

/**
 * @fileOverview Recommends AI experts based on the viewed expert.
 *
 * - recommendExpert - A function that recommends AI experts.
 * - RecommendExpertInput - The input type for the recommendExpert function.
 * - RecommendExpertOutput - The return type for the recommendExpert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendExpertInputSchema = z.object({
  expertName: z.string().describe('The name of the expert being viewed.'),
  expertBio: z.string().describe('The biography of the expert being viewed.'),
  expertPredictions: z.array(z.string()).describe('The predictions made by the expert being viewed.'),
});
export type RecommendExpertInput = z.infer<typeof RecommendExpertInputSchema>;

const RecommendExpertOutputSchema = z.object({
  recommendedExperts: z.array(
    z.object({
      name: z.string().describe('The name of the recommended expert.'),
      bio: z.string().describe('A brief biography of the recommended expert.'),
      predictions: z.array(z.string()).describe('A list of predictions by the recommended expert.'),
    })
  ).describe('A list of recommended AI experts related to the viewed expert.'),
});
export type RecommendExpertOutput = z.infer<typeof RecommendExpertOutputSchema>;

export async function recommendExpert(input: RecommendExpertInput): Promise<RecommendExpertOutput> {
  return recommendExpertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendExpertPrompt',
  input: {schema: RecommendExpertInputSchema},
  output: {schema: RecommendExpertOutputSchema},
  prompt: `You are an AI expert recommender. Based on the AI expert the user is currently viewing, recommend other AI experts that might interest them.

Here is the AI expert the user is currently viewing:
Name: {{{expertName}}}
Bio: {{{expertBio}}}
Predictions: {{#each expertPredictions}}- {{{this}}}\n{{/each}}

Recommend AI experts who have similar expertise or have made similar predictions. Ensure the recommended experts have diverse backgrounds and perspectives.

Return the recommendations in the following JSON format:
{{outputFormat schema=RecommendExpertOutputSchema}}`,
});

const recommendExpertFlow = ai.defineFlow(
  {
    name: 'recommendExpertFlow',
    inputSchema: RecommendExpertInputSchema,
    outputSchema: RecommendExpertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
