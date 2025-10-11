
'use client';

import { ResumeSchema } from "@/lib/schema";
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Link as LinkIcon, Lightbulb, Star, Github, FolderGit2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  formData: ResumeSchema;
  template?: string;
}

export function ResumePreview({ formData, template = 'classic' }: ResumePreviewProps) {
  const templates: { [key: string]: React.FC<Omit<ResumePreviewProps, 'template'>> } = {
    'ats-friendly': AtsFriendlyTemplate,
    'classic': ClassicTemplate,
    'modern': ModernTemplate,
    'creative': CreativeTemplate,
    'skills-first': SkillsFirstTemplate,
    'sidebar': SidebarTemplate,
  };

  const SelectedTemplate = templates[template] || ClassicTemplate;

  return (
    <div className={cn("p-8 bg-card text-foreground font-body text-sm leading-relaxed", `template-${template}`)}>
        <SelectedTemplate formData={formData} />
    </div>
  );
}

const formatDate = (dateString?: string, format: 'short' | 'long' | 'year' = 'long') => {
    if (!dateString) return 'Present';
    try {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
        if (format === 'long') {
            options.month = 'long';
        } else if (format === 'short') {
            options.month = 'short';
        }
        return new Date(dateString).toLocaleDateString('en-US', options);
    } catch {
        return dateString;
    }
};

// 1. ATS-Friendly Template
const AtsFriendlyTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;

    return (
        <div className="font-sans text-base text-black bg-white">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">{personalInfo.name || "Your Name"}</h1>
                <p className="text-sm mt-2">
                    {personalInfo.phone} | {personalInfo.email} | {personalInfo.address}
                    {personalInfo.link && ` | ${personalInfo.link}`}
                    {personalInfo.github && ` | ${personalInfo.github}`}
                </p>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-1 mb-2">Summary</h2>
                <p className="whitespace-pre-wrap">{summary || "Professional summary goes here."}</p>
            </section>

            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-1 mb-2">Skills</h2>
                    <p>{skills.map(skill => skill.name).join(' | ')}</p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-1 mb-2">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={exp.id || index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{exp.title || "Job Title"}</h3>
                                    <p className="text-sm font-normal">{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</p>
                                </div>
                                <p className="italic">{exp.company || "Company Name"}</p>
                                <ul className="mt-2 list-disc list-inside space-y-1 whitespace-pre-wrap">
                                    {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-1 mb-2">Projects</h2>
                     <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div key={project.id || index}>
                                <h3 className="font-bold">{project.name || "Project Name"}</h3>
                                <ul className="mt-2 list-disc list-inside text-sm space-y-1 whitespace-pre-wrap">
                                    {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            {education && education.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-1 mb-2">Education</h2>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={edu.id || index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                                    <p className="text-sm font-normal">{formatDate(edu.graduationDate, 'short')}</p>
                                </div>
                                <p className="italic">{edu.institution || "Institution Name"}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// 2. Classic / Traditional Template
const ClassicTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;

    return (
        <div className="font-serif text-gray-800 bg-white">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name || "Your Name"}</h1>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2 flex-wrap">
                    {personalInfo.email} &bull; {personalInfo.phone} &bull; {personalInfo.address}
                    {personalInfo.link && <> &bull; <a href={personalInfo.link} className="text-blue-600 hover:underline">LinkedIn</a></>}
                    {personalInfo.github && <> &bull; <a href={personalInfo.github} className="text-blue-600 hover:underline">GitHub</a></>}
                </div>
            </header>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Summary</h2>
                <p className="whitespace-pre-wrap text-gray-700">{summary || "Professional summary goes here."}</p>
            </section>
            
            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                        <div key={exp.id || index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-lg font-bold">{exp.title || "Job Title"}</h3>
                                <p className="text-sm">{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</p>
                            </div>
                            <p className="italic text-gray-600">{exp.company || "Company Name"}</p>
                            <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1 whitespace-pre-wrap">
                                {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                </section>
            )}

            {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                        <div key={project.id || index}>
                            <h3 className="text-lg font-bold">{project.name || "Project Name"}</h3>
                            <ul className="mt-2 list-disc list-inside text-gray-700 text-sm space-y-1 whitespace-pre-wrap">
                                {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                </section>
            )}
            
            <section className="grid grid-cols-2 gap-8">
                 {education && education.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
                        <div className="space-y-3">
                            {education.map((edu, index) => (
                            <div key={edu.id || index}>
                                <h3 className="font-bold">{edu.degree || "Degree"} at {edu.institution || "Institution"}</h3>
                                <p className="text-sm text-gray-600">{formatDate(edu.graduationDate, 'long')}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                )}

                {skills && skills.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
                        <ul className="list-disc list-inside">
                            {skills.map((skill, index) => (
                            skill.name && <li key={skill.id || index}>{skill.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </div>
    );
};


// 3. Modern Minimalist Template
const ModernTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;
  
    return (
      <div className="font-sans bg-white text-gray-800">
        <header className="flex flex-col items-center mb-10 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">{personalInfo.name || "Your Name"}</h1>
            <p className="mt-2 text-lg text-gray-500">{experience[0]?.title || 'Professional Title'}</p>
            <div className="flex items-center gap-x-3 text-sm text-gray-500 mt-4">
                {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">{personalInfo.email}</a>}
                {personalInfo.phone && <><span>&bull;</span><div>{personalInfo.phone}</div></>}
                {personalInfo.link && <><span>&bull;</span><a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a></>}
                {personalInfo.github && <><span>&bull;</span><a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub</a></>}
            </div>
        </header>

        <main className="grid grid-cols-12 gap-10">
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
                            <h3 className="font-semibold">{edu.institution || "Institution Name"}</h3>
                            <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{formatDate(edu.graduationDate, 'year')}</p>
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
                    <section className="mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                        <div key={exp.id || index} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                                <h3 className="font-semibold">{exp.title || "Job Title"} at {exp.company || "Company"}</h3>
                                <p className="text-xs text-gray-500 mb-1">{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</p>
                            <ul className="mt-2 text-sm text-gray-600 leading-6 list-disc list-inside whitespace-pre-wrap">
                                {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                    </section>
                )}
                {projects && projects.length > 0 && (
                     <section>
                     <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Projects</h2>
                     <div className="space-y-6">
                         {projects.map((project, index) => (
                         <div key={project.id || index} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                             <h3 className="font-semibold">{project.name || "Project Name"}</h3>
                             <ul className="mt-2 text-sm text-gray-600 leading-6 list-disc list-inside whitespace-pre-wrap">
                                 {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
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

// 4. Creative / Visual Template
const CreativeTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;
  
    return (
      <div className="font-sans grid grid-cols-12 gap-8 bg-white text-gray-700">
        <div className="col-span-4 bg-gray-100 p-8 rounded-l-lg">
             <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 tracking-wider">{personalInfo.name || "Your Name"}</h1>
                <p className="text-md text-primary mt-1">{experience[0]?.title || 'Professional Title'}</p>
            </header>

             <section className="mb-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                    <Mail size={16} className="text-primary"/> CONTACT
                </h2>
                <div className="text-sm space-y-2">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.address && <div>{personalInfo.address}</div>}
                    {personalInfo.link && <a href={personalInfo.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn Profile</a>}
                    {personalInfo.github && <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">GitHub Profile</a>}
                </div>
            </section>
             {education && education.length > 0 && (
                <section className="mb-6">
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                    <GraduationCap size={16} className="text-primary"/> EDUCATION
                </h2>
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
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                   <Star size={16} className="text-primary"/> SKILLS
                </h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                    skill.name && <Badge key={skill.id || index} variant="secondary">{skill.name}</Badge>
                    ))}
                </div>
                </section>
            )}
        </div>
        <div className="col-span-8 p-8">
            {summary && (
                <section className="mb-6">
                    <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                        <Lightbulb size={16} className="text-primary" /> PROFILE
                    </h2>
                    <p className="text-sm leading-relaxed">{summary}</p>
                </section>
            )}
            {experience && experience.length > 0 && (
                <section className="mb-8">
                <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                   <Briefcase size={16} className="text-primary"/> EXPERIENCE
                </h2>
                <div className="space-y-5">
                    {experience.map((exp, index) => (
                    <div key={exp.id || index}>
                        <h3 className="text-md font-bold text-gray-800">{exp.title || "Job Title"}</h3>
                        <div className="flex justify-between items-baseline text-sm text-primary mb-1">
                            <span>{exp.company || "Company Name"}</span>
                            <span>{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</span>
                        </div>
                        <ul className="mt-2 text-sm leading-relaxed whitespace-pre-wrap list-disc list-inside">
                            {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                    ))}
                </div>
                </section>
            )}
             {projects && projects.length > 0 && (
                <section>
                    <h2 className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-600 tracking-widest">
                       <FolderGit2 size={16} className="text-primary"/> PROJECTS
                    </h2>
                    <div className="space-y-5">
                        {projects.map((project, index) => (
                        <div key={project.id || index}>
                            <h3 className="text-md font-bold text-gray-800">{project.name || "Project Name"}</h3>
                            <ul className="mt-2 text-sm leading-relaxed whitespace-pre-wrap list-disc list-inside">
                                 {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
      </div>
    );
};

// 5. Skills-First / Combination Template
const SkillsFirstTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;
  
    return (
        <div className="font-sans text-gray-800 bg-white">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-bold">{personalInfo.name || "Your Name"}</h1>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2 flex-wrap">
                    {personalInfo.email} &bull; {personalInfo.phone}
                    {personalInfo.link && <> &bull; <a href={personalInfo.link} className="text-blue-600 hover:underline">LinkedIn</a></>}
                    {personalInfo.github && <> &bull; <a href={personalInfo.github} className="text-blue-600 hover:underline">GitHub</a></>}
                </div>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-center uppercase">Summary</h2>
                <p className="whitespace-pre-wrap text-gray-700 text-center">{summary || "Professional summary goes here."}</p>
            </section>
            
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-center uppercase">Technical Skills</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {skills.map((skill, index) => (
                        skill.name && <Badge key={skill.id || index} variant="secondary">{skill.name}</Badge>
                        ))}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-center uppercase">Experience</h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                        <div key={exp.id || index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold">{exp.title || "Job Title"} at {exp.company || "Company Name"}</h3>
                                <p className="text-sm">{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</p>
                            </div>
                            <ul className="mt-1 list-disc list-inside text-gray-700 space-y-1 whitespace-pre-wrap">
                                {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                </section>
            )}

             {projects && projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-center uppercase">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                        <div key={project.id || index}>
                            <h3 className="font-bold">{project.name || "Project Name"}</h3>
                            <ul className="mt-1 list-disc list-inside text-gray-700 text-sm space-y-1 whitespace-pre-wrap">
                                {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                        ))}
                    </div>
                </section>
            )}

            {education && education.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold border-b border-gray-300 pb-1 mb-3 text-center uppercase">Education</h2>
                    <div className="space-y-3 text-center">
                        {education.map((edu, index) => (
                        <div key={edu.id || index}>
                            <p><strong>{edu.degree || "Degree"}</strong> from {edu.institution || "Institution Name"}, {formatDate(edu.graduationDate, 'year')}</p>
                        </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// 6. Sidebar Template
const SidebarTemplate: React.FC<Omit<ResumePreviewProps, 'template'>> = ({ formData }) => {
    const { personalInfo, summary, experience, education, skills, projects } = formData;
  
    return (
      <div className="font-sans grid grid-cols-12 bg-white text-gray-800 min-h-[29.7cm]">
        {/* Sidebar */}
        <div className="col-span-4 bg-gray-800 text-white p-8">
          <header className="text-left mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-white">{personalInfo.name || "Your Name"}</h1>
            <p className="mt-2 text-lg text-gray-300">{experience[0]?.title || 'Professional Title'}</p>
          </header>
  
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Contact</h2>
            <div className="space-y-3 text-sm">
              {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} /><span>{personalInfo.phone}</span></div>}
              {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} /><span>{personalInfo.email}</span></div>}
              {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} /><span>{personalInfo.address}</span></div>}
              {personalInfo.link && <div className="flex items-center gap-2"><LinkIcon size={14} /><a href={personalInfo.link} className="hover:underline">LinkedIn</a></div>}
              {personalInfo.github && <div className="flex items-center gap-2"><Github size={14} /><a href={personalInfo.github} className="hover:underline">GitHub</a></div>}
            </div>
          </section>
  
          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <h3 className="font-semibold text-white">{edu.institution || "Institution Name"}</h3>
                    <p className="text-sm text-gray-300">{edu.degree || "Degree"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(edu.graduationDate, 'year')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
  
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Skills</h2>
              <ul className="space-y-1 text-sm list-disc list-inside">
                {skills.map((skill, index) => (
                  skill.name && <li key={skill.id || index}>{skill.name}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
  
        {/* Main Content */}
        <div className="col-span-8 p-8">
          {summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Professional Summary</h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </section>
          )}
  
          {experience && experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Work Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={exp.id || index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-lg font-semibold text-gray-800">{exp.title || "Job Title"}</h3>
                      <p className="text-sm text-gray-500">{formatDate(exp.startDate, 'short')} - {formatDate(exp.endDate, 'short')}</p>
                    </div>
                    <p className="italic text-md text-gray-600 mb-2">{exp.company || "Company Name"}</p>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 whitespace-pre-wrap">
                      {exp.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
  
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Projects</h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={project.id || index}>
                    <h3 className="text-lg font-semibold text-gray-800">{project.name || "Project Name"}</h3>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 whitespace-pre-wrap mt-2">
                      {project.description?.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
};
