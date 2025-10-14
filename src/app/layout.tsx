
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
      html, body {
        width: 210mm;
        height: 297mm;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        font-size: 10pt;
      }
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
        padding: 15mm;
        margin: 0;
        box-sizing: border-box;
        transform: scale(1);
        background-color: white !important;
        box-shadow: none !important;
        border: none !important;
      }
      .no-print {
        display: none;
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
      .template-sidebar, .template-modern, .template-creative, .template-ats-friendly, .template-classic, .template-skills-first {
        font-size: 8pt; /* Reduced base font size */
      }
      h1 { font-size: 22pt; }
      h2 { font-size: 14pt; }
      h3 { font-size: 10pt; }
      ul { padding-left: 1rem; }
      .p-8 { padding: 0 !important; }
      .mb-1, .my-1 { margin-bottom: 0.2rem; margin-top: 0.2rem; }
      .mb-2, .my-2 { margin-bottom: 0.3rem; margin-top: 0.3rem; }
      .mb-3, .my-3 { margin-bottom: 0.4rem; margin-top: 0.4rem; }
      .mb-4, .my-4 { margin-bottom: 0.5rem; margin-top: 0.5rem; }
      .mb-6, .my-6 { margin-bottom: 0.8rem; margin-top: 0.8rem; }
      .mb-8, .my-8 { margin-bottom: 1rem; margin-top: 1rem; }
      .mb-10, .my-10 { margin-bottom: 1.2rem; margin-top: 1.2rem; }
      .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.1rem; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.2rem; }
      .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.4rem; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.6rem; }
      .space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.8rem; }
      .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
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
