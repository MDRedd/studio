
'use client';

import { ResumeSchema } from "@/lib/schema";
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Link as LinkIcon, Lightbulb, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  formData: ResumeSchema;
  template?: string;
}

export function ResumePreview({ formData, template = 'classic' }: ResumePreviewProps) {
  const { personalInfo, summary, experience, education, skills } = formData;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
        return dateString; // fallback for invalid date
    }
  };
  
  const templates: { [key: string]: React.FC<ResumePreviewProps> } = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
  };

  const SelectedTemplate = templates[template] || ClassicTemplate;

  return (
    <div className={cn("p-8 bg-card text-foreground font-body text-sm leading-relaxed", `template-${template}`)}>
        <SelectedTemplate formData={formData} />
    </div>
  );
}

const ClassicTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills } = formData;
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      try {
          return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      } catch {
          return dateString;
      }
    };

    return (
        <>
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold font-headline text-primary">{personalInfo.name || "Your Name"}</h1>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-2 flex-wrap">
                {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
                {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
                {personalInfo.address && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.address}</div>}
                {personalInfo.link && <a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary"><LinkIcon size={12} /> {personalInfo.link}</a>}
                </div>
            </header>

            <section className="mb-6">
                <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-2 text-primary">
                <Lightbulb />
                Summary
                </h2>
                <p className="whitespace-pre-wrap">{summary || "Professional summary goes here."}</p>
            </section>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
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

                {skills && skills.length > 0 && (
                    <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold font-headline border-b-2 border-primary/50 pb-1 mb-3 text-primary">
                        <Star />
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
        </>
    );
};

const ModernTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills } = formData;
    const formatDate = (dateString?: string) => {
      if (!dateString) return '';
      try {
          return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric' });
      } catch {
          return dateString;
      }
    };
  
    return (
      <div className="font-sans">
        <header className="flex flex-col items-center mb-8">
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-800">{personalInfo.name || "Your Name"}</h1>
            <div className="flex items-center gap-x-3 text-sm text-gray-500 mt-3">
                {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">{personalInfo.email}</a>}
                {personalInfo.phone && <><span>&bull;</span><div>{personalInfo.phone}</div></>}
                {personalInfo.link && <><span>&bull;</span><a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a></>}
            </div>
        </header>

        <main className="grid grid-cols-12 gap-12">
            <div className="col-span-4 space-y-8">
                 {summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">About Me</h2>
                        <p className="text-sm text-gray-600 leading-6">{summary}</p>
                    </section>
                )}
                {education && education.length > 0 && (
                    <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                        <div key={edu.id || index}>
                            <h3 className="font-semibold text-gray-800">{edu.institution || "Institution Name"}</h3>
                            <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{formatDate(edu.graduationDate)}</p>
                        </div>
                        ))}
                    </div>
                    </section>
                )}
                {skills && skills.length > 0 && (
                    <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                        skill.name && <Badge key={skill.id || index} variant="outline" className="font-normal">{skill.name}</Badge>
                        ))}
                    </div>
                    </section>
                )}
            </div>
            <div className="col-span-8">
                {experience && experience.length > 0 && (
                    <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                        <div key={exp.id || index} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-gray-800">{exp.title || "Job Title"}</h3>
                                    <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                                </div>
                            </div>
                            <ul className="mt-2 text-sm text-gray-600 leading-6 list-disc list-inside whitespace-pre-wrap">
                                {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                    </section>
                )}
            </div>
        </main>
      </div>
    );
};

const ElegantTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills } = formData;
    const formatDate = (dateString?: string, format: 'short' | 'long' = 'long') => {
      if (!dateString) return '';
      try {
        if (format === 'short') {
          return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        return new Date(dateString).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      } catch {
        return dateString;
      }
    };
  
    return (
      <div className="font-serif bg-white text-gray-700">
        <header className="mb-8 border-b border-gray-200 pb-4">
            <h1 className="text-5xl font-bold text-center text-gray-800 tracking-wider">{personalInfo.name || "Your Name"}</h1>
            <p className="text-center text-lg text-primary mt-2">{experience[0]?.title || 'Professional Title'}</p>
        </header>

        <div className="flex gap-12">
            <div className="w-1/3">
                 <section className="mb-6">
                    <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3 text-gray-600 tracking-widest">CONTACT</h2>
                    <div className="text-sm space-y-2">
                        {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /> {personalInfo.email}</div>}
                        {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personalInfo.phone}</div>}
                        {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} /> {personalInfo.address}</div>}
                        {personalInfo.link && <a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><LinkIcon size={14} /> Portfolio</a>}
                    </div>
                </section>
                 {education && education.length > 0 && (
                    <section className="mb-6">
                    <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3 text-gray-600 tracking-widest">EDUCATION</h2>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                        <div key={edu.id || index}>
                            <h3 className="font-semibold text-gray-800">{edu.degree || "Degree"}</h3>
                            <p className="text-sm">{edu.institution || "Institution Name"}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(edu.graduationDate, 'short')}</p>
                        </div>
                        ))}
                    </div>
                    </section>
                )}
                 {skills && skills.length > 0 && (
                    <section>
                    <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3 text-gray-600 tracking-widest">SKILLS</h2>
                    <ul className="list-none space-y-1">
                        {skills.map((skill, index) => (
                        skill.name && <li key={skill.id || index} className="text-sm">{skill.name}</li>
                        ))}
                    </ul>
                    </section>
                )}
            </div>
            <div className="w-2/3">
                {summary && (
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3 text-gray-600 tracking-widest">PROFILE</h2>
                        <p className="text-sm leading-relaxed">{summary}</p>
                    </section>
                )}
                {experience && experience.length > 0 && (
                    <section>
                    <h2 className="text-lg font-semibold border-b border-gray-200 pb-1 mb-3 text-gray-600 tracking-widest">EXPERIENCE</h2>
                    <div className="space-y-5">
                        {experience.map((exp, index) => (
                        <div key={exp.id || index}>
                            <h3 className="text-md font-bold text-gray-800">{exp.title || "Job Title"}</h3>
                            <div className="flex justify-between items-baseline text-sm text-primary">
                                <span>{exp.company || "Company Name"}</span>
                                <span>{formatDate(exp.startDate, 'short')} - {exp.endDate ? formatDate(exp.endDate, 'short') : 'Present'}</span>
                            </div>
                            <div className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                                {exp.description}
                            </div>
                        </div>
                        ))}
                    </div>
                    </section>
                )}
            </div>
        </div>
      </div>
    );
};
