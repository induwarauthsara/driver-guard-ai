'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TripHistory() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Trip History</h1>
            <p className="text-gray-600 dark:text-gray-400">Your driving history and trip records</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Trip History Dashboard</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                View your complete driving history, including trip details, safety scores, and performance metrics.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300">
                  🚗 This feature will display your trip history once you start recording drives with DriveGuard AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
