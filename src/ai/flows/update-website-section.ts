'use server';

/**
 * @fileOverview This file defines a Genkit flow for updating website sections with AI-suggested content.
 *
 * The flow takes a section description as input and returns suggested content updates, tailored to the section's theme and format.
 *
 * @fileOverview
 * - `updateWebsiteSection`: The main function to update website sections using AI suggestions.
 * - `UpdateWebsiteSectionInput`: The input type for the `updateWebsiteSection` function.
 * - `UpdateWebsiteSectionOutput`: The output type for the `updateWebsiteSection` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpdateWebsiteSectionInputSchema = z.object({
  sectionDescription: z
    .string()
    .describe(
      'A detailed description of the website section that needs updating, including its theme, purpose, and existing content.'
    ),
});
export type UpdateWebsiteSectionInput = z.infer<typeof UpdateWebsiteSectionInputSchema>;

const UpdateWebsiteSectionOutputSchema = z.object({
  suggestedContent: z.string().describe('AI-suggested content updates for the specified website section.'),
});
export type UpdateWebsiteSectionOutput = z.infer<typeof UpdateWebsiteSectionOutputSchema>;

export async function updateWebsiteSection(input: UpdateWebsiteSectionInput): Promise<UpdateWebsiteSectionOutput> {
  return updateWebsiteSectionFlow(input);
}

const updateWebsiteSectionPrompt = ai.definePrompt({
  name: 'updateWebsiteSectionPrompt',
  input: {schema: UpdateWebsiteSectionInputSchema},
  output: {schema: UpdateWebsiteSectionOutputSchema},
  prompt: `You are an AI assistant specialized in providing content suggestions for portfolio websites.

You will receive a description of a specific section of the website, and you will generate content updates that align with the section's theme and purpose.

Description of the section: {{{sectionDescription}}}

Based on the section description, suggest relevant content updates. Ensure the content is professional, engaging, and tailored to the section's theme.  The content should follow the format already present in the section. For example, if the section presents a description followed by a project title, make sure the output follows the same format.

Suggested Content:
`,
});

const updateWebsiteSectionFlow = ai.defineFlow(
  {
    name: 'updateWebsiteSectionFlow',
    inputSchema: UpdateWebsiteSectionInputSchema,
    outputSchema: UpdateWebsiteSectionOutputSchema,
  },
  async input => {
    const {output} = await updateWebsiteSectionPrompt(input);
    return output!;
  }
);
