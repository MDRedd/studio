'use server';
/**
 * @fileOverview Generates a summary of a resume highlighting key skills and experience.
 *
 * - generateResumeSummary - A function that generates a resume summary.
 * - ResumeSummaryInput - The input type for the generateResumeSummary function.
 * - ResumeSummaryOutput - The return type for the generateResumeSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeSummaryInputSchema = z.object({
  experience: z
    .string()
    .describe('Description of the professional experience of the candidate'),
  education: z.string().describe('Description of the education of the candidate'),
  skills: z.string().describe('List of skills of the candidate'),
});
export type ResumeSummaryInput = z.infer<typeof ResumeSummaryInputSchema>;

const ResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the resume.'),
});
export type ResumeSummaryOutput = z.infer<typeof ResumeSummaryOutputSchema>;

export async function generateResumeSummary(
  input: ResumeSummaryInput
): Promise<ResumeSummaryOutput> {
  return resumeSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeSummaryPrompt',
  input: {schema: ResumeSummaryInputSchema},
  output: {schema: ResumeSummaryOutputSchema},
  prompt: `You are an expert resume writer. Generate a concise and impactful summary of the candidate's resume based on the provided experience, education, and skills.

Experience: {{{experience}}}
Education: {{{education}}}
Skills: {{{skills}}}

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
