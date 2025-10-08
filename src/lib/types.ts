export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    link?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major?: string;
  graduationDate: string;
}

export interface Skill {
  id: string;
  name: string;
}
