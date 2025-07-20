'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Speed from '@mui/icons-material/Speed';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import Phone from '@mui/icons-material/Phone';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CalendarToday from '@mui/icons-material/CalendarToday';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

export default function MyStats() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated or not a driver
  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  // Generate mock statistics data
  useEffect(() => {
    if (!user) return;

    const generateMockStats = () => {
      // Generate daily data for the last 30 days
      const dailyData = [];
      const currentDate = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
        
        dailyData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          safetyScore: Math.floor(Math.random() * 40) + 60, // 60-100
          trips: Math.floor(Math.random() * 5) + 1, // 1-5 trips per day
          distance: Math.floor(Math.random() * 100) + 20, // 20-120 km
          incidents: Math.floor(Math.random() * 3), // 0-2 incidents
        });
      }

      // Generate incident breakdown
      const incidentData = [
        { name: 'Drowsiness', value: Math.floor(Math.random() * 10) + 5, color: '#ff9800' },
        { name: 'Phone Usage', value: Math.floor(Math.random() * 8) + 3, color: '#f44336' },
        { name: 'Overspeed', value: Math.floor(Math.random() * 6) + 2, color: '#9c27b0' },
      ];

      // Generate time-based driving pattern
      const timeData = [
        { hour: '6 AM', trips: Math.floor(Math.random() * 3) + 1 },
        { hour: '9 AM', trips: Math.floor(Math.random() * 5) + 2 },
        { hour: '12 PM', trips: Math.floor(Math.random() * 4) + 1 },
        { hour: '3 PM', trips: Math.floor(Math.random() * 4) + 1 },
        { hour: '6 PM', trips: Math.floor(Math.random() * 6) + 3 },
        { hour: '9 PM', trips: Math.floor(Math.random() * 3) + 1 },
      ];

      // Calculate overall stats
      const totalTrips = dailyData.reduce((sum, day) => sum + day.trips, 0);
      const totalDistance = dailyData.reduce((sum, day) => sum + day.distance, 0);
      const totalIncidents = incidentData.reduce((sum, incident) => sum + incident.value, 0);
      const avgSafetyScore = Math.round(dailyData.reduce((sum, day) => sum + day.safetyScore, 0) / dailyData.length);
      
      const bestDay = dailyData.reduce((best, day) => day.safetyScore > best.safetyScore ? day : best);
      const worstDay = dailyData.reduce((worst, day) => day.safetyScore < worst.safetyScore ? day : worst);

      return {
        dailyData,
        incidentData,
        timeData,
        summary: {
          totalTrips,
          totalDistance,
          totalIncidents,
          avgSafetyScore,
          bestDay,
          worstDay,
          incidentRate: ((totalIncidents / totalTrips) * 100).toFixed(1),
          avgTripDistance: Math.round(totalDistance / totalTrips),
        }
      };
    };

    const mockStats = generateMockStats();
    setStats(mockStats);
    setIsLoading(false);
  }, [user, selectedPeriod]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900';
    return 'bg-red-100 dark:bg-red-900';
  };

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="text-green-500" />;
    if (current < previous) return <TrendingDown className="text-red-500" />;
    return <div className="w-6 h-6" />;
  };

  if (loading || isLoading || !user || !stats || !stats.summary) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Driving Stats</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your driving performance and improvements</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <CalendarToday className="text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Safety Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(stats.summary.avgSafetyScore)}`}>
                    {stats.summary.avgSafetyScore}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Average this month</p>
                </div>
                <div className={`p-3 rounded-full ${getScoreBgColor(stats.summary.avgSafetyScore)}`}>
                  <CheckCircle className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Trips</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.summary.totalTrips}</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(stats.summary.totalTrips, 45)}
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <LocationOn className="text-blue-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Distance Driven</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.summary.totalDistance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">km this month</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Speed className="text-green-600 text-2xl" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Incident Rate</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.summary.incidentRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">incidents per trip</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <Warning className="text-purple-600 text-2xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Safety Score Trend */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Safety Score Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="date" className="text-sm" />
                  <YAxis domain={[0, 100]} className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="safetyScore" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Incident Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Incident Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats.incidentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-4 mt-4">
                {stats.incidentData.map((incident, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: incident.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {incident.name}: {incident.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Driving Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Time-based Driving Pattern */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Driving Patterns by Time</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={stats.timeData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="hour" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="trips" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Highlights */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Highlights</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Best Day</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{stats.summary.bestDay.date}</p>
                  </div>
                  <div className="text-lg font-bold text-green-600">{stats.summary.bestDay.safetyScore}%</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Needs Improvement</p>
                    <p className="text-xs text-red-600 dark:text-red-400">{stats.summary.worstDay.date}</p>
                  </div>
                  <div className="text-lg font-bold text-red-600">{stats.summary.worstDay.safetyScore}%</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Avg Trip Distance</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">This month</p>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{stats.summary.avgTripDistance} km</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements & Goals</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-yellow-600 text-3xl" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Safe Driver</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">No incidents for 7 days</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <LocationOn className="text-blue-600 text-3xl" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Distance Master</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Drive 1000km safely</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Speed className="text-green-600 text-3xl" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Speed Demon</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">No speeding for 30 days</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
