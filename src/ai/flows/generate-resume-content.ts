'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating resume content suggestions using AI.
 *
 * The flow takes user-provided details such as education, experience, and skills as input,
 * and generates professional-sounding content suggestions for each section of the resume.
 *
 * @exports generateResumeContent - The main function to trigger the resume content generation flow.
 * @exports GenerateResumeContentInput - The input type for the generateResumeContent function.
 * @exports GenerateResumeContentOutput - The output type for the generateResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const GenerateResumeContentInputSchema = z.object({
  education: z.array(
    z.object({
      institution: z.string().describe('The name of the educational institution.'),
      degree: z.string().describe('The degree obtained.'),
      major: z.string().describe('The major field of study.'),
      graduationDate: z.string().describe('The graduation date.'),
      description: z.string().optional().describe('A description of the education experience.'),
    })
  ).optional().describe('Education history.'),
  experience: z.array(
    z.object({
      company: z.string().describe('The name of the company.'),
      title: z.string().describe('The job title.'),
      startDate: z.string().describe('The start date of employment.'),
      endDate: z.string().optional().describe('The end date of employment, or null if still employed.'),
      description: z.string().describe('A description of the job responsibilities and achievements.'),
    })
  ).optional().describe('Work experience history.'),
  skills: z.array(z.string()).optional().describe('A list of skills.'),
  templateStyle: z.string().optional().describe('Style of the resume template.'),
}).describe('User provided details for resume generation.');

export type GenerateResumeContentInput = z.infer<typeof GenerateResumeContentInputSchema>;

const GenerateResumeContentOutputSchema = z.object({
  educationSuggestions: z.array(
    z.string().describe('AI-powered suggestions for the education section.')
  ).optional().describe('AI suggestions for education.'),
  experienceSuggestions: z.array(
    z.string().describe('AI-powered suggestions for the experience section.')
  ).optional().describe('AI suggestions for experience.'),
  skillsSuggestions: z.array(
    z.string().describe('AI-powered suggestions for the skills section.')
  ).optional().describe('AI suggestions for skills.'),
}).describe('AI-powered resume content suggestions.');

export type GenerateResumeContentOutput = z.infer<typeof GenerateResumeContentOutputSchema>;

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
