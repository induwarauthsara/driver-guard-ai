'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Trips() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trip Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and view your trips</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <p className="text-gray-600 dark:text-gray-400">Trip management features coming soon...</p>
        </div>
      </div>
    </div>
  );
}
