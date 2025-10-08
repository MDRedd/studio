
'use client';

import { ResumeSchema } from "@/lib/schema";
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Link as LinkIcon, Lightbulb } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ResumePreviewProps {
  formData: ResumeSchema;
}

export function ResumePreview({ formData }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills } = formData;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
        return dateString; // fallback for invalid date
    }
  };

  return (
    <div className="p-8 bg-card text-foreground font-body text-sm leading-relaxed">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold font-headline text-primary">{personalInfo.name || "Your Name"}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2 flex-wrap">
          {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
          {personalInfo.address && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.address}</div>}
          {personalInfo.link && <a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary"><LinkIcon size={12} /> {personalInfo.link}</a>}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-2 text-primary">
          <Lightbulb />
          Summary
        </h2>
        <p className="whitespace-pre-wrap">{summary || "Professional summary goes here."}</p>
      </section>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-3 text-primary">
                <Briefcase />
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={exp.id || index}>
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold font-headline">{exp.title || "Job Title"}</h3>
                        <div className="text-xs text-muted-foreground">
                            {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </div>
                    </div>
                    <p className="text-muted-foreground italic">{exp.company || "Company Name"}</p>
                    <ul className="mt-2 list-disc list-inside text-sm space-y-1 whitespace-pre-wrap">
                        {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1">
          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-6">
              <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-3 text-primary">
                <GraduationCap />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <h3 className="font-bold font-headline">{edu.institution || "Institution Name"}</h3>
                    <p className="text-muted-foreground">{edu.degree || "Degree"}</p>
                    {edu.major && <p className="text-muted-foreground text-xs">{edu.major}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{formatDate(edu.graduationDate)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-3 text-primary">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  skill.name && <Badge key={skill.id || index} variant="secondary">{skill.name}</Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
