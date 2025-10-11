
'use server';

/**
 * @fileOverview This file defines a Genkit flow for checking a resume's ATS score.
 *
 * The flow takes resume data as input and returns an ATS-friendliness score,
 * along with strengths and suggestions for improvement.
 *
 * @exports checkResumeAts - The main function to trigger the ATS check flow.
 */

import {ai} from '@/ai/genkit';
import { CheckResumeAtsInput, CheckResumeAtsInputSchema, CheckResumeAtsOutput, CheckResumeAtsOutputSchema } from './types';


export async function checkResumeAts(input: CheckResumeAtsInput): Promise<CheckResumeAtsOutput> {
  return checkResumeAtsFlow(input);
}

const atsCheckPrompt = ai.definePrompt({
  name: 'atsCheckPrompt',
  input: { schema: CheckResumeAtsInputSchema },
  output: { schema: CheckResumeAtsOutputSchema },
  prompt: `You are an expert ATS (Applicant Tracking System) analyzer. Evaluate the provided resume content for ATS-friendliness.
  Provide a score from 0-100 based on clarity, keyword optimization, and standard formatting.
  Also provide a list of strengths and actionable suggestions for improvement.

  Resume Content:
  Summary: {{{summary}}}

  Experience:
  {{#each experience}}
  - {{title}}: {{description}}
  {{/each}}

  Education:
  {{#each education}}
  - {{degree}}{{#if major}} in {{major}}{{/if}}
  {{/each}}

  Skills:
  {{#each skills}}
  - {{name}}
  {{/each}}

  Projects:
  {{#each projects}}
  - {{name}}: {{description}}
  {{/each}}
  `,
});

const checkResumeAtsFlow = ai.defineFlow(
  {
    name: 'checkResumeAtsFlow',
    inputSchema: CheckResumeAtsInputSchema,
    outputSchema: CheckResumeAtsOutputSchema,
  },
  async input => {
    const { output } = await atsCheckPrompt(input);
    return output!;
  }
);
