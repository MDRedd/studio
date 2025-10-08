
'use client';
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Printer } from "lucide-react";
import { AtsChecker } from "./ats-checker";

interface ResumeToolbarProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function ResumeToolbar({ selectedTemplate, onTemplateChange }: ResumeToolbarProps) {

  return (
    <div className="p-4 bg-card/80 backdrop-blur-sm border rounded-lg flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
            <Select value={selectedTemplate} onValueChange={onTemplateChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                </SelectContent>
            </Select>
            <AtsChecker />
        </div>
      <Button onClick={() => window.print()}>
        <Printer className="mr-2 h-4 w-4" />
        Print / Save PDF
      </Button>
    </div>
  );
}
