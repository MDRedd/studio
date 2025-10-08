
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useFormContext } from 'react-hook-form';
import { ResumeSchema } from '@/lib/schema';
import { checkAtsScore, AtsCheckResult, checkJobFit, JobFitResult } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Lightbulb, Bot, Search, FileText } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function AtsChecker() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<AtsCheckResult | null>(null);
  const [jobFitResult, setJobFitResult] = useState<JobFitResult | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const { getValues } = useFormContext<ResumeSchema>();
  const { toast } = useToast();

  const handleCheckAtsScore = async () => {
    setIsLoading(true);
    setAtsResult(null);
    const formData = getValues();
    try {
      const res = await checkAtsScore(formData);
      if (res) {
        setAtsResult(res);
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

  const handleCheckJobFit = async () => {
    if (!jobDescription.trim()) {
        toast({
            variant: 'destructive',
            title: 'Job Description Missing',
            description: 'Please paste a job description to analyze.',
        });
        return;
    }
    setIsLoading(true);
    setJobFitResult(null);
    const formData = getValues();
    try {
      const res = await checkJobFit(formData, jobDescription);
      if (res) {
        setJobFitResult(res);
      } else {
        throw new Error('No result from server');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to check job fit. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChange = (open: boolean) => {
    if(!open) {
        setAtsResult(null);
        setJobFitResult(null);
    }
    setIsOpen(open);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" />
          AI Analyzer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI Resume Analyzer</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="ats-score" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ats-score"><FileText className="mr-2 h-4 w-4" />ATS Score</TabsTrigger>
                <TabsTrigger value="job-fit"><Search className="mr-2 h-4 w-4" />Job Fit</TabsTrigger>
            </TabsList>
            <TabsContent value="ats-score" className="py-4">
                 <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Analyze your resume's compatibility with Applicant Tracking Systems (ATS) and get suggestions for improvement.
                    </p>
                    <Button onClick={handleCheckAtsScore} disabled={isLoading} className="w-full">
                        {isLoading ? 'Analyzing...' : 'Analyze My Resume for ATS'}
                    </Button>

                    {isLoading && <Progress value={50} className="w-full animate-pulse" />}

                    {atsResult && (
                        <div className="space-y-6 pt-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-muted-foreground">Your ATS Score</p>
                            <p className="text-6xl font-bold text-primary">{atsResult.score}</p>
                            <p className="text-xs text-muted-foreground">out of 100</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {atsResult.strengths.length > 0 && (
                                <Card>
                                    <CardHeader className="flex-row items-center gap-2 space-y-0">
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                      <CardTitle className="text-lg">Strengths</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                          {atsResult.strengths.map((item, i) => <li key={i}>{item}</li>)}
                                      </ul>
                                    </CardContent>
                                </Card>
                            )}
                            {atsResult.suggestions.length > 0 && (
                                <Card>
                                  <CardHeader className="flex-row items-center gap-2 space-y-0">
                                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                                    <CardTitle className="text-lg">Suggestions</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                          {atsResult.suggestions.map((item, i) => <li key={i}>{item}</li>)}
                                      </ul>
                                  </CardContent>
                                </Card>
                            )}
                        </div>
                        <div className="bg-accent/50 border-l-4 border-accent text-accent-foreground p-3 rounded-r-lg text-xs">
                            <div className="flex items-start">
                                <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                                <p>This is an AI-generated score and should be used as a guideline. ATS behavior can vary.</p>
                            </div>
                        </div>
                        </div>
                    )}
                </div>
            </TabsContent>
            <TabsContent value="job-fit" className="py-4">
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Paste a job description below to see how well your resume matches, and get a list of missing keywords.
                    </p>
                    <Textarea
                        placeholder="Paste job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={8}
                        className="w-full"
                    />
                    <Button onClick={handleCheckJobFit} disabled={isLoading} className="w-full">
                        {isLoading ? 'Analyzing...' : 'Analyze Job Fit'}
                    </Button>
                     {isLoading && <Progress value={50} className="w-full animate-pulse" />}

                     {jobFitResult && (
                        <div className="space-y-6 pt-4">
                            <div className="text-center">
                                <p className="text-sm font-medium text-muted-foreground">Your Job Fit Score</p>
                                <p className="text-6xl font-bold text-primary">{jobFitResult.score}%</p>
                                <p className="text-xs text-muted-foreground">match</p>
                            </div>

                            {jobFitResult.missingKeywords.length > 0 && (
                                <Card>
                                    <CardHeader className="flex-row items-center gap-2 space-y-0">
                                        <Search className="h-5 w-5 text-blue-500" />
                                        <CardTitle className="text-lg">Missing Keywords</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">Consider adding these keywords from the job description to your resume to improve your score.</p>
                                        <div className="flex flex-wrap gap-2">
                                            {jobFitResult.missingKeywords.map((keyword, i) => (
                                                <Badge key={i} variant="secondary">{keyword}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                             <div className="bg-accent/50 border-l-4 border-accent text-accent-foreground p-3 rounded-r-lg text-xs">
                                <div className="flex items-start">
                                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                                    <p>This is an AI-generated score. Use it to guide your resume tailoring, but always use your best judgment.</p>
                                </div>
                            </div>
                        </div>
                     )}
                </div>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
