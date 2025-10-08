
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating resume content suggestions using AI.
 *
 * The flow takes user-provided details such as education, experience, and skills as input,
 * and generates professional-sounding content suggestions for each section of the resume.
 *
 * @exports generateResumeContent - The main function to trigger the resume content generation flow.
 */

import {ai} from '@/ai/genkit';
import { GenerateResumeContentInput, GenerateResumeContentInputSchema, GenerateResumeContentOutput, GenerateResumeContentOutputSchema } from './types';

export async function generateResumeContent(input: GenerateResumeContentInput): Promise<GenerateResumeContentOutput> {
  return generateResumeContentFlow(input);
}

const resumeContentPrompt = ai.definePrompt({
  name: 'resumeContentPrompt',
  input: { schema: GenerateResumeContentInputSchema },
  output: { schema: GenerateResumeContentOutputSchema },
  prompt: `You are an AI-powered resume builder assistant. Generate professional-sounding content suggestions for each section of the resume based on the user's input.

  Template Style: {{{templateStyle}}}

  Education History:
  {{#each education}}
  Institution: {{{institution}}}
  Degree: {{{degree}}}
  Major: {{{major}}}
  Graduation Date: {{{graduationDate}}}
  Description: {{{description}}}
  {{/each}}

  Work Experience History:
  {{#each experience}}
  Company: {{{company}}}
  Title: {{{title}}}
  Start Date: {{{startDate}}}
  End Date: {{{endDate}}}
  Description: {{{description}}}
  {{/each}}

  Skills:
  {{#each skills}}
  - {{{this}}}
  {{/each}}

  Based on the data above, provide suggestions for education, experience and skills. Return an array of strings for each.  If a field is not provided, return an empty array for its suggestions.
  `,
});

const generateResumeContentFlow = ai.defineFlow(
  {
    name: 'generateResumeContentFlow',
    inputSchema: GenerateResumeContentInputSchema,
    outputSchema: GenerateResumeContentOutputSchema,
  },
  async input => {
    const { output } = await resumeContentPrompt(input);
    return output!;
  }
);
