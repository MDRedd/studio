
'use server';
/**
 * @fileOverview Generates a summary of a resume highlighting key skills and experience.
 *
 * - generateResumeSummary - A function that generates a resume summary.
 */

import {ai} from '@/ai/genkit';
import { ResumeSummaryInput, ResumeSummaryInputSchema, ResumeSummaryOutput, ResumeSummaryOutputSchema } from './types';

export async function generateResumeSummary(
  input: ResumeSummaryInput
): Promise<ResumeSummaryOutput> {
  return resumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeSummaryPrompt',
  input: {schema: ResumeSummaryInputSchema},
  output: {schema: ResumeSummaryOutputSchema},
  prompt: `You are an expert resume writer. Generate a concise and impactful summary of the candidate's resume based on the provided experience, education, skills and projects.

Experience: {{{experience}}}
Education: {{{education}}}
Skills: {{{skills}}}
Projects: {{{projects}}}

Summary:`,
});

const resumeSummaryFlow = ai.defineFlow(
  {
    name: 'resumeSummaryFlow',
    inputSchema: ResumeSummaryInputSchema,
    outputSchema: ResumeSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
