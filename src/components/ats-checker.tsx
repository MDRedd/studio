
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useFormContext } from 'react-hook-form';
import { ResumeSchema } from '@/lib/schema';
import { checkAtsScore, AtsCheckResult } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Lightbulb, Bot } from 'lucide-react';

export function AtsChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AtsCheckResult | null>(null);
  const { getValues } = useFormContext<ResumeSchema>();
  const { toast } = useToast();

  const handleCheckScore = async () => {
    setIsLoading(true);
    setResult(null);
    const formData = getValues();
    try {
      const res = await checkAtsScore(formData);
      if (res) {
        setResult(res);
      } else {
        throw new Error('No result from server');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to check ATS score. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" />
          Check ATS Score
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>ATS Score Checker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Analyze your resume's compatibility with Applicant Tracking Systems (ATS) and get suggestions for improvement.
          </p>
          <Button onClick={handleCheckScore} disabled={isLoading} className="w-full">
            {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
          </Button>

          {isLoading && <Progress value={50} className="w-full animate-pulse" />}

          {result && (
            <div className="space-y-6 pt-4">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Your ATS Score</p>
                <p className="text-6xl font-bold text-primary">{result.score}</p>
                <p className="text-xs text-muted-foreground">out of 100</p>
              </div>

              <div className="space-y-4">
                {result.strengths.length > 0 && (
                    <div>
                        <h3 className="font-semibold flex items-center mb-2"><CheckCircle className="mr-2 h-5 w-5 text-green-500" />Strengths</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {result.strengths.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                )}
                {result.suggestions.length > 0 && (
                    <div>
                        <h3 className="font-semibold flex items-center mb-2"><Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />Suggestions for Improvement</h3>
                         <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {result.suggestions.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                )}
              </div>
               <div className="bg-accent/50 border-l-4 border-accent text-accent-foreground p-3 rounded-r-lg text-xs">
                <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                    <p>This is an AI-generated score and should be used as a guideline. ATS behavior can vary.</p>
                </div>
               </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
