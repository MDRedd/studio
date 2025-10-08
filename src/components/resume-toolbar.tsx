
'use client';
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Download } from "lucide-react";

export function ResumeToolbar() {

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="p-4 bg-card/80 backdrop-blur-sm border rounded-lg flex items-center justify-between no-print shadow-md">
        <div className="flex items-center gap-4">
            <h3 className="font-headline text-sm font-semibold">Template</h3>
            <Select defaultValue="classic" disabled>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="classic">Classic Professional</SelectItem>
                    <SelectItem value="modern" disabled>Modern Minimalist</SelectItem>
                    <SelectItem value="creative" disabled>Creative Bold</SelectItem>
                </SelectContent>
            </Select>
        </div>
      <Button onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
}
