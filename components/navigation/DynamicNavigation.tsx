'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/landing/Navbar';
import AdminNavbar from '@/components/navigation/AdminNavbar';
import DriverNavbar from '@/components/navigation/DriverNavbar';

export default function DynamicNavigation() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // Don't show any navbar on login page
  if (pathname === '/auth/login') {
    return null;
  }

  // Show loading or no navbar while auth is loading
  if (loading) {
    return null;
  }

  // If user is not authenticated, show landing navbar
  if (!user) {
    return <Navbar />;
  }

  // If user is authenticated, show role-specific navbar based on current path
  if (pathname.startsWith('/admin')) {
    return <AdminNavbar />;
  }

  if (pathname.startsWith('/driver')) {
    return <DriverNavbar />;
  }

  // Default fallback - if logged in but not on specific path, show landing navbar
  return <Navbar />;
}
