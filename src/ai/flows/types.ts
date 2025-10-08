
import { z } from 'zod';

// Schema for generate-resume-content.ts
export const GenerateResumeContentInputSchema = z.object({
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

export const GenerateResumeContentOutputSchema = z.object({
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


// Schema for resume-summary.ts
export const ResumeSummaryInputSchema = z.object({
  experience: z
    .string()
    .describe('Description of the professional experience of the candidate'),
  education: z.string().describe('Description of the education of the candidate'),
  skills: z.string().describe('List of skills of the candidate'),
});
export type ResumeSummaryInput = z.infer<typeof ResumeSummaryInputSchema>;

export const ResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the resume.'),
});
export type ResumeSummaryOutput = z.infer<typeof ResumeSummaryOutputSchema>;


// Schema for check-resume-ats.ts
export const CheckResumeAtsInputSchema = z.object({
  summary: z.string().describe('The professional summary.'),
  experience: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .describe('The work experience.'),
  education: z
    .array(
      z.object({
        degree: z.string(),
        major: z.string().optional(),
      })
    )
    .describe('The education history.'),
  skills: z.array(z.object({ name: z.string() })).describe('The list of skills.'),
});

export type CheckResumeAtsInput = z.infer<typeof CheckResumeAtsInputSchema>;

export const CheckResumeAtsOutputSchema = z.object({
    score: z.number().describe('The ATS score out of 100.'),
    strengths: z.array(z.string()).describe('Things the resume does well.'),
    suggestions: z.array(z.string()).describe('Suggestions for improvement.'),
});

export type CheckResumeAtsOutput = z.infer<typeof CheckResumeAtsOutputSchema>;
