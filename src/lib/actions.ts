
'use server';

import { generateResumeContent } from '@/ai/flows/generate-resume-content';
import { generateResumeSummary } from '@/ai/flows/resume-summary';
import { checkResumeAts } from '@/ai/flows/check-resume-ats';
import { jobFitScore } from '@/ai/flows/job-fit-score';
import { ResumeSchema } from './schema';
import { z } from 'zod';
import { CheckResumeAtsInput, CheckResumeAtsOutput, GenerateResumeContentInput, GenerateResumeContentOutput, ResumeSummaryInput, JobFitScoreInput, JobFitScoreOutput } from '@/ai/flows/types';


const generateSummaryAction = z.object({
  experience: z.string(),
  education: z.string(),
  skills: z.string(),
});

export async function generateSummary(input: z.infer<typeof generateSummaryAction>): Promise<string | null> {
  try {
    const validatedInput: ResumeSummaryInput = generateSummaryAction.parse(input);
    const result = await generateResumeSummary(validatedInput);
    return result.summary;
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}

export async function generateExperienceSuggestion(input: GenerateResumeContentInput): Promise<GenerateResumeContentOutput | null> {
    try {
      const result = await generateResumeContent(input);
      return result;
    } catch (error) {
      console.error("Error generating experience suggestion:", error);
      return null;
    }
  }

export type AtsCheckResult = CheckResumeAtsOutput;

export async function checkAtsScore(resumeData: ResumeSchema): Promise<AtsCheckResult | null> {
    try {
        const input: CheckResumeAtsInput = {
            summary: resumeData.summary,
            experience: resumeData.experience.map(e => ({ title: e.title, description: e.description })),
            education: resumeData.education.map(e => ({ degree: e.degree, major: e.major })),
            skills: resumeData.skills.map(s => ({ name: s.name })),
        };
        const result = await checkResumeAts(input);
        return result;
    } catch (error) {
        console.error("Error checking ATS score:", error);
        return null;
    }
}

export type JobFitResult = JobFitScoreOutput;

export async function checkJobFit(resumeData: ResumeSchema, jobDescription: string): Promise<JobFitResult | null> {
    try {
        const input: JobFitScoreInput = {
            resume: {
                summary: resumeData.summary,
                experience: resumeData.experience.map(e => ({ title: e.title, description: e.description })),
                education: resumeData.education.map(e => ({ degree: e.degree, major: e.major })),
                skills: resumeData.skills.map(s => ({ name: s.name })),
            },
            jobDescription: jobDescription,
        };
        const result = await jobFitScore(input);
        return result;
    } catch (error) {
        console.error("Error checking job fit score:", error);
        return null;
    }
}
