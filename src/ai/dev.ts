import { config } from 'dotenv';
config();

import '@/ai/flows/generate-resume-content.ts';
import '@/ai/flows/resume-summary.ts';
import '@/ai/flows/check-resume-ats.ts';
import '@/ai/flows/job-fit-score.ts';
