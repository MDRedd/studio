import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'ResumeAI',
  description: 'Craft your perfect resume with the power of AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const printStyles = `
    @media print {
      body * {
        visibility: hidden;
      }
      .printable-area, .printable-area * {
        visibility: visible;
      }
      .printable-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        padding: 0;
        margin: 0;
        transform: scale(1);
        background-color: white !important;
        color: black !important;
        -webkit-print-color-adjust: exact;
        box-shadow: none !important;
        border: none !important;
      }
      .printable-area * {
        color: black !important;
        background-color: transparent !important;
      }
      @page {
        size: A4;
        margin: 20mm;
      }
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: printStyles }} />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
