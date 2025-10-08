
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeSchema } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import { ResumeForm } from "@/components/resume-form";
import { ResumePreview } from "@/components/resume-preview";
import { ResumeToolbar } from "./resume-toolbar";
import { useState } from "react";

const initialData: ResumeSchema = {
  personalInfo: {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '123-456-7890',
    address: '123 Tech Lane, Silicon Valley, CA',
    link: 'https://www.linkedin.com/in/janedoe',
  },
  summary: `Results-driven software engineer with over 5 years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js, with a proven ability to deliver high-quality code and collaborate effectively in fast-paced Agile environments. Seeking to leverage expertise in front-end development to build innovative solutions.`,
  experience: [
    {
      id: crypto.randomUUID(),
      company: 'Innovate Inc.',
      title: 'Senior Software Engineer',
      startDate: '2021-06-01',
      endDate: 'Present',
      description: '- Led the development of a new customer-facing dashboard using React and TypeScript, resulting in a 20% increase in user engagement.\n- Mentored junior developers, providing code reviews and guidance on best practices.\n- Optimized application performance, reducing page load times by 30%.'
    },
    {
      id: crypto.randomUUID(),
      company: 'Tech Solutions LLC',
      title: 'Software Engineer',
      startDate: '2019-01-15',
      endDate: '2021-05-30',
      description: '- Developed and maintained features for a large-scale e-commerce platform using React and Redux.\n- Collaborated with UX/UI designers to implement responsive and user-friendly interfaces.\n- Wrote unit and integration tests to ensure code quality and reliability.'
    }
  ],
  education: [
    {
      id: crypto.randomUUID(),
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      major: 'Computer Science',
      graduationDate: '2019-01-10'
    }
  ],
  skills: [
    { id: crypto.randomUUID(), name: 'JavaScript (ES6+)' },
    { id: crypto.randomUUID(), name: 'TypeScript' },
    { id: crypto.randomUUID(), name: 'React' },
    { id: crypto.randomUUID(), name: 'Node.js' },
    { id: crypto.randomUUID(), name: 'Agile Methodologies' },
    { id: crypto.randomUUID(), name: 'UI/UX Design Principles' }
  ]
};


// The `uuid` library is not available, so we use a simple polyfill.
// This is not cryptographically secure, but sufficient for unique IDs in this context.
const simpleUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

const initialDataWithIds: ResumeSchema = {
    ...initialData,
    experience: initialData.experience.map(exp => ({ ...exp, id: exp.id || simpleUuid() })),
    education: initialData.education.map(edu => ({ ...edu, id: edu.id || simpleUuid() })),
    skills: initialData.skills.map(skill => ({ ...skill, id: skill.id || simpleUuid() })),
};


export default function ResumeBuilder() {
  const [template, setTemplate] = useState('classic');
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialDataWithIds,
    mode: "onBlur",
  });

  const watchedData = form.watch();

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 md:py-8">
        <div>
          <ResumeForm />
        </div>
        <div className="relative">
          <div className="lg:sticky top-24">
            <div className="flex flex-col gap-4">
              <ResumeToolbar selectedTemplate={template} onTemplateChange={setTemplate} />
              <div className="overflow-auto max-h-[calc(100vh-12rem)] rounded-lg shadow-2xl printable-area bg-card">
                <ResumePreview formData={watchedData} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
