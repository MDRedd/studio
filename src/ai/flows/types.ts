
import { z } from 'zod';

const personalInfoSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  link: z.string().optional(),
  github: z.string().optional(),
});

const educationSchema = z.object({
  institution: z.string().describe('The name of the educational institution.'),
  degree: z.string().describe('The degree obtained.'),
  major: z.string().optional().describe('The major field of study.'),
  graduationDate: z.string().describe('The graduation date.'),
  description: z.string().optional().describe('A description of the education experience.'),
});

const experienceSchema = z.object({
  company: z.string().describe('The name of the company.'),
  title: z.string().describe('The job title.'),
  startDate: z.string().describe('The start date of employment.'),
  endDate: z.string().optional().describe('The end date of employment, or null if still employed.'),
  description: z.string().describe('A description of the job responsibilities and achievements.'),
});

const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string(),
});

const fullResumeSchema = z.object({
  personalInfo: personalInfoSchema.optional(),
  summary: z.string().optional(),
  education: z.array(educationSchema).optional().describe('Education history.'),
  experience: z.array(experienceSchema).optional().describe('Work experience history.'),
  skills: z.array(skillSchema).optional().describe('A list of skills.'),
  projects: z.array(projectSchema).optional().describe('A list of projects.'),
  templateStyle: z.string().optional().describe('Style of the resume template.'),
});

// Schema for generate-resume-content.ts
export const GenerateResumeContentInputSchema = fullResumeSchema.extend({
  targetExperienceIndex: z.number().optional().describe('The index of the experience to generate a description for.'),
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
  experience: z.string().describe('Description of the professional experience of the candidate'),
  education: z.string().describe('Description of the education of the candidate'),
  skills: z.string().describe('List of skills of the candidate'),
  projects: z.string().optional().describe('List of projects of the candidate'),
});
export type ResumeSummaryInput = z.infer<typeof ResumeSummaryInputSchema>;

export const ResumeSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the resume.'),
});
export type ResumeSummaryOutput = z.infer<typeof ResumeSummaryOutputSchema>;


// Schema for check-resume-ats.ts and job-fit-score.ts
const resumeSubSchema = z.object({
  summary: z.string().optional().describe('The professional summary.'),
  experience: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ).optional().describe('The work experience.'),
  education: z.array(
    z.object({
      degree: z.string(),
      major: z.string().optional(),
    })
  ).optional().describe('The education history.'),
  skills: z.array(z.object({ name: z.string() })).optional().describe('The list of skills.'),
  projects: z.array(z.object({ name: z.string(), description: z.string() })).optional().describe('The list of projects.'),
});


export const CheckResumeAtsInputSchema = resumeSubSchema;
export type CheckResumeAtsInput = z.infer<typeof CheckResumeAtsInputSchema>;

export const CheckResumeAtsOutputSchema = z.object({
    score: z.number().describe('The ATS score out of 100.'),
    strengths: z.array(z.string()).describe('Things the resume does well.'),
    suggestions: z.array(z.string()).describe('Suggestions for improvement.'),
});
export type CheckResumeAtsOutput = z.infer<typeof CheckResumeAtsOutputSchema>;

// Schema for job-fit-score.ts
export const JobFitScoreInputSchema = z.object({
  resume: resumeSubSchema,
  jobDescription: z.string().describe('The full text of the job description.'),
});
export type JobFitScoreInput = z.infer<typeof JobFitScoreInputSchema>;

export const JobFitScoreOutputSchema = z.object({
  score: z.number().describe('The job fit score out of 100.'),
  missingKeywords: z.array(z.string()).describe('Important keywords from the job description that are missing from the resume.'),
});
export type JobFitScoreOutput = z.infer<typeof JobFitScoreOutputSchema>;
