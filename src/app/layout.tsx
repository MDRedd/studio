
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
        padding: 10mm; /* Reduced padding */
        margin: 0;
        box-sizing: border-box;
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
      .template-sidebar.print-friendly-sidebar {
        min-height: 0 !important;
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
        font-size: 8pt !important; /* Reduced base font size */
      }
      h1, .text-4xl, .text-5xl { font-size: 20pt !important; }
      h2, .text-2xl { font-size: 13pt !important; }
      h3, .text-lg { font-size: 9pt !important; }
      .text-sm, p, ul, div { font-size: 8pt !important; line-height: 1.2 !important; }
      .text-xs { font-size: 7pt !important; }
      .p-8 { padding: 0 !important; }
      .mb-1, .my-1 { margin-bottom: 0.1rem !important; margin-top: 0.1rem !important; }
      .mb-2, .my-2 { margin-bottom: 0.2rem !important; margin-top: 0.2rem !important; }
      .mb-3, .my-3 { margin-bottom: 0.3rem !important; margin-top: 0.3rem !important; }
      .mb-4, .my-4 { margin-bottom: 0.4rem !important; margin-top: 0.4rem !important; }
      .mb-6, .my-6 { margin-bottom: 0.6rem !important; margin-top: 0.6rem !important; }
      .mb-8, .my-8 { margin-bottom: 0.8rem !important; margin-top: 0.8rem !important; }
      .mb-10, .my-10 { margin-bottom: 1rem !important; margin-top: 1rem !important; }
      ul { padding-left: 1rem !important; }
      .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.1rem !important; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.2rem !important; }
      .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.3rem !important; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.4rem !important; }
      .space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.6rem !important; }
      .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.8rem !important; }
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
