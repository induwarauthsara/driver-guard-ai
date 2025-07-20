import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import DynamicNavigation from '@/components/navigation/DynamicNavigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DriveGuard AI - Real-Time Driver Monitoring Platform',
  description: 'AI-powered driver behavior monitoring system for enhanced road safety',
  keywords: 'AI, driver monitoring, road safety, fleet management, drowsiness detection',
  icons: {
    icon: [
      {
        url: '/icon-16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
      {
        url: '/security-icon.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
    shortcut: [
      {
        url: '/security-icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/security-icon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/security-icon.svg" />
        <link rel="mask-icon" href="/security-icon.svg" color="#2563eb" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <DynamicNavigation />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}