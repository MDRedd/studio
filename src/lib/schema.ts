import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, "Company name is required"),
  title: z.string().min(1, "Job title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, "Institution name is required"),
  degree: z.string().min(1, "Degree is required"),
  major: z.string().optional(),
  graduationDate: z.string().min(1, "Graduation date is required"),
});

export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Skill cannot be empty"),
});

export const projectSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
});

export const resumeSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    link: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    github: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }),
  summary: z.string().min(1, "Summary is required"),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
});

export type ResumeSchema = z.infer<typeof resumeSchema>;
