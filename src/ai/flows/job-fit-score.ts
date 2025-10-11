
'use server';

/**
 * @fileOverview This file defines a Genkit flow for calculating a job fit score.
 *
 * The flow takes resume data and a job description as input and returns a score
 * indicating how well the resume matches the job, along with missing keywords.
 *
 * @exports jobFitScore - The main function to trigger the job fit score flow.
 */

import {ai} from '@/ai/genkit';
import { JobFitScoreInput, JobFitScoreInputSchema, JobFitScoreOutput, JobFitScoreOutputSchema } from './types';


export async function jobFitScore(input: JobFitScoreInput): Promise<JobFitScoreOutput> {
  return jobFitScoreFlow(input);
}

const jobFitScorePrompt = ai.definePrompt({
  name: 'jobFitScorePrompt',
  input: { schema: JobFitScoreInputSchema },
  output: { schema: JobFitScoreOutputSchema },
  prompt: `You are an expert resume and job description analyzer.
  Compare the provided resume content with the job description.
  Provide a "job fit score" from 0-100 indicating how well the resume matches the job requirements.
  Also, extract a list of important keywords from the job description that are missing from the resume.

  Resume Content:
  Summary: {{{resume.summary}}}

  Experience:
  {{#each resume.experience}}
  - {{title}}: {{description}}
  {{/each}}

  Education:
  {{#each resume.education}}
  - {{degree}}{{#if major}} in {{major}}{{/if}}
  {{/each}}

  Skills:
  {{#each resume.skills}}
  - {{name}}
  {{/each}}
  
  Projects:
  {{#each resume.projects}}
  - {{name}}: {{description}}
  {{/each}}

  Job Description:
  {{{jobDescription}}}
  `,
});

const jobFitScoreFlow = ai.defineFlow(
  {
    name: 'jobFitScoreFlow',
    inputSchema: JobFitScoreInputSchema,
    outputSchema: JobFitScoreOutputSchema,
  },
  async input => {
    const { output } = await jobFitScorePrompt(input);
    return output!;
  }
);
