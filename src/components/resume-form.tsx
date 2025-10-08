
'use client';

import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";
import { ResumeSchema } from "@/lib/schema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Lightbulb, Plus, Sparkles, Trash2, User } from "lucide-react";
import { generateSummary, generateExperienceSuggestion } from "@/lib/actions";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ResumeForm() {
  const form = useFormContext<ResumeSchema>();
  const { toast } = useToast();
  const [isSummaryLoading, setSummaryLoading] = useState(false);

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    const { experience, education, skills } = form.getValues();
    const summaryInput = {
      experience: experience.map(e => e.description).join('\n'),
      education: education.map(e => `${e.degree} in ${e.major} from ${e.institution}`).join('\n'),
      skills: skills.map(s => s.name).join(', '),
    };

    try {
      const result = await generateSummary(summaryInput);
      if (result) {
        form.setValue('summary', result);
        toast({ title: "Summary Generated", description: "AI-powered summary has been added." });
      } else {
        throw new Error();
      }
    } catch (error) {
      toast({ variant: 'destructive', title: "Error", description: "Failed to generate summary." });
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateExperience = async (index: number) => {
    const experience = form.getValues(`experience.${index}`);
    
    try {
      const result = await generateExperienceSuggestion({ experience: [experience] });
      if (result?.experienceSuggestions?.[0]) {
        form.setValue(`experience.${index}.description`, result.experienceSuggestions[0]);
        toast({ title: "Suggestion Added", description: "AI suggestion for experience has been applied." });
      } else {
        throw new Error();
      }
    } catch(error) {
        toast({ variant: 'destructive', title: "Error", description: "Failed to generate experience suggestion." });
    }
  }


  return (
    <Accordion type="multiple" defaultValue={["personal", "summary"]} className="w-full space-y-4">
      <AccordionItem value="personal" className="bg-card border rounded-lg">
        <AccordionTrigger className="p-4 font-headline text-lg"><User className="mr-2" />Personal Information</AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="personalInfo.name" render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="personalInfo.email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input placeholder="jane.doe@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="personalInfo.phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder="123-456-7890" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="personalInfo.address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl><Input placeholder="123 Tech Lane, CA" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="personalInfo.link" render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn/Portfolio URL</FormLabel>
                <FormControl><Input placeholder="https://linkedin.com/in/janedoe" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="summary" className="bg-card border rounded-lg">
        <AccordionTrigger className="p-4 font-headline text-lg"><Lightbulb className="mr-2" />Professional Summary</AccordionTrigger>
        <AccordionContent className="p-4 space-y-2">
          <FormField control={form.control} name="summary" render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl><Textarea placeholder="A brief summary of your professional background..." {...field} rows={6} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="button" size="sm" onClick={handleGenerateSummary} disabled={isSummaryLoading}>
            {isSummaryLoading ? "Generating..." : <><Sparkles className="mr-2 h-4 w-4" /> Generate with AI</>}
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="bg-card border rounded-lg">
        <AccordionTrigger className="p-4 font-headline text-lg"><Briefcase className="mr-2" />Work Experience</AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
              <FormField control={form.control} name={`experience.${index}.title`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl><Input placeholder="Senior Software Engineer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl><Input placeholder="Innovate Inc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name={`experience.${index}.startDate`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name={`experience.${index}.endDate`} render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date (optional)</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name={`experience.${index}.description`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Key responsibilities and achievements..." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <div className="flex justify-between items-center">
                 <Button type="button" variant="outline" size="sm" onClick={() => handleGenerateExperience(index)}>
                    <Sparkles className="mr-2 h-4 w-4" /> Suggest with AI
                 </Button>
                 <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
               </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => appendExperience({ id: crypto.randomUUID(), company: '', title: '', startDate: '', endDate: '', description: '' })}><Plus className="mr-2 h-4 w-4" /> Add Experience</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="bg-card border rounded-lg">
        <AccordionTrigger className="p-4 font-headline text-lg"><GraduationCap className="mr-2" />Education</AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
          {educationFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md space-y-4 relative">
               <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              <FormField control={form.control} name={`education.${index}.institution`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl><Input placeholder="State University" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl><Input placeholder="B.S. in Computer Science" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name={`education.${index}.major`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Major (optional)</FormLabel>
                  <FormControl><Input placeholder="Computer Science" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name={`education.${index}.graduationDate`} render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => appendEducation({ id: crypto.randomUUID(), institution: '', degree: '', major: '', graduationDate: '' })}><Plus className="mr-2 h-4 w-4" /> Add Education</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills" className="bg-card border rounded-lg">
        <AccordionTrigger className="p-4 font-headline text-lg"><Lightbulb className="mr-2" />Skills</AccordionTrigger>
        <AccordionContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skillsFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                    <FormField control={form.control} name={`skills.${index}.name`} render={({ field }) => (
                        <FormItem className="flex-grow">
                        <FormControl><Input placeholder="JavaScript" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                ))}
            </div>
          <Button type="button" variant="outline" onClick={() => appendSkill({ id: crypto.randomUUID(), name: '' })}><Plus className="mr-2 h-4 w-4" /> Add Skill</Button>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}
