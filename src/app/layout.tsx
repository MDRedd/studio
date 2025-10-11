
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'MDR ResumeAI',
  description: 'Craft your perfect resume with the power of AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const printStyles = `
    @media print {
      @page {
        size: A4;
        margin: 0;
      }
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #fff;
        color: #000;
        font-size: 10pt;
      }
      body * {
        visibility: hidden;
      }
      .printable-area, .printable-area * {
        visibility: visible;
      }
      .printable-area {
        position: fixed;
        left: 0;
        top: 0;
        width: 210mm;
        height: 297mm;
        padding: 15mm;
        margin: 0;
        box-sizing: border-box;
        transform: scale(1);
        background-color: white !important;
        box-shadow: none !important;
        border: none !important;
        font-size: 9pt;
      }
      .printable-area * {
        color: black !important;
        background-color: transparent !important;
        box-shadow: none !important;
        border-color: #ccc !important;
      }
      .overflow-auto {
        height: auto !important;
        overflow: visible !important;
      }
      .template-sidebar.print-friendly-sidebar .col-span-4 {
        width: 33.333333%;
        float: left;
      }
      .template-sidebar.print-friendly-sidebar .col-span-8 {
        width: 66.666667%;
        float: left;
      }
      .template-sidebar, .template-modern, .template-creative {
        font-size: 8.5pt;
      }
      .template-sidebar h1, .template-modern h1, .template-creative h1 {
        font-size: 24pt;
      }
      .template-sidebar h2, .template-modern h2, .template-creative h2 {
        font-size: 12pt;
      }
      .template-sidebar h3, .template-modern h3, .template-creative h3 {
        font-size: 10pt;
      }
      .template-ats-friendly, .template-classic, .template-skills-first {
        font-size: 9pt;
      }
       .template-ats-friendly h1, .template-classic h1, .template-skills-first h1 {
        font-size: 28pt;
      }
      .template-ats-friendly h2, .template-classic h2, .template-skills-first h2 {
        font-size: 14pt;
      }
      .template-ats-friendly h3, .template-classic h3, .template-skills-first h3 {
        font-size: 11pt;
      }
      .p-8 { padding: 1rem; }
      .mb-1, .mb-2, .mb-3, .mb-4, .mb-6, .mb-8, .mb-10 { margin-bottom: 0.5rem; }
      .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.1rem; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.2rem; }
      .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.4rem; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.6rem; }
      .space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.8rem; }
      .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
      ul { padding-left: 1rem; }
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
