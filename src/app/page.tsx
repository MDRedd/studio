import ResumeBuilder from '@/components/resume-builder';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 md:p-6 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M216 76H176V36a20 20 0 0 0-20-20H56a20 20 0 0 0-20 20v184a20 20 0 0 0 20 20h144a20 20 0 0 0 20-20V96a20 20 0 0 0-4-12ZM56 36h96v40H56Z" opacity=".2"/>
                    <path d="M222 90.4V220a20.1 20.1 0 0 1-20 20H56a20.1 20.1 0 0 1-20-20V36A20.1 20.1 0 0 1 56 16h95.6a20.1 20.1 0 0 1 14.2 5.9l44.3 44.3A20.1 20.1 0 0 1 222 90.4ZM168 37.7V76h38.3ZM200 220V96H168a12 12 0 0 1-12-12V36H56v184Zm-39-99.3a28 28 0 1 0-38.2 0L98.5 152a8 8 0 1 0 11 11.6l16.1-17.3a8 8 0 0 0 2.4-11.6 7.9 7.9 0 0 0-11-2.5l-3.2 1-11.2-12 11.2-12a12 12 0 0 1 20.1 9.3 12.5 12.5 0 0 1-2.9 8l-19 20.3a24 24 0 1 0 35.4-1.3l15.9-17.1a8 8 0 1 0-11-11.6Z"/>
                    <path d="M128 108a12 12 0 1 0-12-12 12 12 0 0 0 12 12Zm-4-32h-40a8 8 0 0 0 0 16h40a8 8 0 0 0 0-16Zm0 24h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z" opacity=".2"/>
                    <path d="M101.4 174.6a12 12 0 1 0 17.2-17l-17.2 17Zm53.2-34.2a12 12 0 1 0-17-17l17 17Z"/>
                    <path d="M92.3 56H72a8 8 0 0 0 0 16h20.3a8 8 0 0 0 0-16Zm-20.3 24h32a8 8 0 0 0 0-16h-32a8 8 0 0 0 0 16Z"/>
                </svg>
             </div>
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
    