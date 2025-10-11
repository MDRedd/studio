import ResumeBuilder from '@/components/resume-builder';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 md:p-6 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Image src="/logo.png" alt="MDR ResumeAI Logo" width={40} height={40} className="rounded-sm" />
            <div>
                <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">MDR ResumeAI</h1>
                <p className="text-sm text-muted-foreground">Craft your perfect resume with the power of AI.</p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-0">
        <ResumeBuilder />
      </main>
    </div>
  );
}
