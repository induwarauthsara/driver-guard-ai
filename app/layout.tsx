import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Navbar from '@/components/landing/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DriveGuard AI - Real-Time Driver Monitoring Platform',
  description: 'AI-powered driver behavior monitoring system for enhanced road safety',
  keywords: 'AI, driver monitoring, road safety, fleet management, drowsiness detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}