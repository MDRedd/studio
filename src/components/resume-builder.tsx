
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeSchema, ResumeSchema } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import { ResumeForm } from "@/components/resume-form";
import { ResumePreview } from "@/components/resume-preview";
import { ResumeToolbar } from "./resume-toolbar";
import { useState } from "react";

// The `uuid` library is not available, so we use a simple polyfill.
// This is not cryptographically secure, but sufficient for unique IDs in this context.
const simpleUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

const initialData: ResumeSchema = {
  personalInfo: {
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '123-456-7890',
    address: '123 Tech Lane, Silicon Valley, CA',
    link: 'https://www.linkedin.com/in/janedoe',
    github: 'https://github.com/janedoe',
  },
  summary: `Results-driven software engineer with over 5 years of experience in developing, testing, and maintaining web applications. Proficient in JavaScript, React, and Node.js, with a proven ability to deliver high-quality code and collaborate effectively in fast-paced Agile environments. Seeking to leverage expertise in front-end development to build innovative solutions.`,
  experience: [
    {
      id: simpleUuid(),
      company: 'Innovate Inc.',
      title: 'Senior Software Engineer',
      startDate: '2021-06-01',
      endDate: '',
      description: `- Led the development of a new customer-facing dashboard using React and TypeScript, resulting in a 20% increase in user engagement
- Mentored a team of 3 junior developers, providing code reviews and guidance on best practices, improving team productivity by 15%
- Optimized application performance, reducing page load times by 30% and achieving a 95+ Lighthouse score`
    },
    {
      id: simpleUuid(),
      company: 'Tech Solutions LLC',
      title: 'Software Engineer',
      startDate: '2019-01-15',
      endDate: '2021-05-30',
      description: `- Developed and maintained features for a large-scale e-commerce platform with over 1 million monthly active users using React and Redux
- Collaborated with UX/UI designers to implement responsive interfaces, improving mobile conversion rates by 10%
- Wrote unit and integration tests, increasing code coverage from 70% to over 90% across the main application`
    }
  ],
  education: [
    {
      id: simpleUuid(),
      institution: 'State University',
      degree: 'B.S. in Computer Science',
      major: '',
      graduationDate: '2019-01-10'
    }
  ],
  skills: [
    { id: simpleUuid(), name: 'JavaScript (ES6+)' },
    { id: simpleUuid(), name: 'TypeScript' },
    { id: simpleUuid(), name: 'React' },
    { id: simpleUuid(), name: 'Node.js' },
    { id: simpleUuid(), name: 'Jest & React Testing Library' },
    { id: simpleUuid(), name: 'AWS (S3, Lambda, EC2)' },
    { id: simpleUuid(), name: 'CI/CD (Jenkins, GitHub Actions)' },
    { id: simpleUuid(), name: 'Agile Methodologies' }
  ],
  projects: [
    {
        id: simpleUuid(),
        name: 'Personal Portfolio Website',
        description: `- Developed a personal portfolio website using Next.js and Tailwind CSS
- Deployed the website on Vercel with a custom domain
- Integrated a contact form using serverless functions`
    }
  ]
};

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('classic');
  const form = useForm<ResumeSchema>({
    resolver: zodResolver(resumeSchema),
    defaultValues: initialData,
    mode: "onBlur",
  });

  const watchedData = form.watch();

  return (
    <Form {...form}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4 md:py-8">
        <div className="no-print">
          <ResumeForm />
        </div>
        <div className="relative">
          <div className="lg:sticky top-24">
            <div className="flex flex-col gap-4">
              <ResumeToolbar selectedTemplate={template} onTemplateChange={setTemplate} />
              <div className="overflow-auto max-h-[calc(100vh-12rem)] rounded-lg shadow-2xl bg-card printable-area">
                <ResumePreview formData={watchedData} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
