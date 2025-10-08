
'use server';

import { generateResumeContent, GenerateResumeContentInput, GenerateResumeContentOutput } from '@/ai/flows/generate-resume-content';
import { generateResumeSummary, ResumeSummaryInput } from '@/ai/flows/resume-summary';
import { z } from 'zod';

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
