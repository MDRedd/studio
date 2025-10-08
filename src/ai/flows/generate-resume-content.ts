
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
  prompt: `You are an AI-powered resume builder assistant.
  Your goal is to help a user write a compelling description for one of their past job experiences.
  You will be given the full content of their resume, including all other experiences, education, skills, and their professional summary.
  You will also be given the index of the specific job experience you need to write a description for.

  Use the full resume content to understand the candidate's profile, career progression, and key skills.
  Then, write a professional and impactful description for the target job experience.
  The description should be a few bullet points, each starting with a hyphen.
  Focus on achievements and quantifiable results.

  Full Resume Content:
  Summary: {{{summary}}}

  Education History:
  {{#each education}}
  Institution: {{{institution}}}
  Degree: {{{degree}}}
  {{/each}}

  Work Experience History:
  {{#each experience}}
  Company: {{{company}}}
  Title: {{{title}}}
  Description: {{{description}}}
  ---
  {{/each}}

  Skills:
  {{#each skills}}
  - {{{name}}}
  {{/each}}

  Projects:
  {{#each projects}}
  - {{{name}}}: {{{description}}}
  {{/each}}

  Now, please write a compelling description for the job experience at index {{targetExperienceIndex}}.
  Return the description as a single string in the 'experienceSuggestions' array.
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
