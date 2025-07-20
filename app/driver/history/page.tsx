'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CalendarToday from '@mui/icons-material/CalendarToday';
import AccessTime from '@mui/icons-material/AccessTime';
import LocationOn from '@mui/icons-material/LocationOn';
import Timeline from '@mui/icons-material/Timeline';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Warning from '@mui/icons-material/Warning';
import Error from '@mui/icons-material/Error';
import FilterList from '@mui/icons-material/FilterList';
import Search from '@mui/icons-material/Search';
import Download from '@mui/icons-material/Download';
import Speed from '@mui/icons-material/Speed';
import TrendingUp from '@mui/icons-material/TrendingUp';
import TrendingDown from '@mui/icons-material/TrendingDown';
import Insights from '@mui/icons-material/Insights';
import Map from '@mui/icons-material/Map';
import Route from '@mui/icons-material/Route';
import LocalGasStation from '@mui/icons-material/LocalGasStation';
import Eco from '@mui/icons-material/Eco';
import ShowChart from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ViewList from '@mui/icons-material/ViewList';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';

export default function TripHistory() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('dashboard');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  // Generate comprehensive sample data
  useEffect(() => {
    if (!user) return;

    const generateSampleTrips = () => {
      const currentDate = new Date();
      const locations = [
        { start: 'Downtown Office', end: 'Residential Area' },
        { start: 'Home', end: 'Shopping Mall' },
        { start: 'Airport', end: 'City Center' },
        { start: 'University', end: 'Industrial Zone' },
        { start: 'Hospital', end: 'Suburban Area' },
        { start: 'Train Station', end: 'Business District' },
        { start: 'Beach Road', end: 'Mountain View' },
        { start: 'Tech Park', end: 'Old Town' }
      ];

      const incidentTypes = ['Harsh Braking', 'Rapid Acceleration', 'Sharp Turn', 'Phone Usage', 'Drowsiness'];
      
      const sampleTrips = [];

      for (let i = 0; i < 25; i++) {
        const daysAgo = Math.floor(Math.random() * 30);
        const tripDate = new Date(currentDate.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
        
        const startHour = 7 + Math.floor(Math.random() * 12); // 7 AM to 7 PM
        const startMinute = Math.floor(Math.random() * 60);
        tripDate.setHours(startHour, startMinute, 0, 0);

        const duration = 15 + Math.floor(Math.random() * 90); // 15-105 minutes
        const distance = Math.round((duration * (30 + Math.random() * 40)) / 60 * 10) / 10; // 30-70 km/h average
        
        const numIncidents = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4);
        const incidents = [];
        
        for (let j = 0; j < numIncidents; j++) {
          incidents.push({
            type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
            severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
            timestamp: new Date(tripDate.getTime() + Math.random() * duration * 60 * 1000)
          });
        }

        const baseScore = 100;
        const incidentPenalty = incidents.reduce((penalty, incident) => {
          return penalty + (incident.severity === 'High' ? 15 : incident.severity === 'Medium' ? 10 : 5);
        }, 0);
        const safetyScore = Math.max(60, baseScore - incidentPenalty - Math.floor(Math.random() * 10));

        const location = locations[Math.floor(Math.random() * locations.length)];
        const status = Math.random() > 0.95 ? 'interrupted' : 'completed';
        
        const avgSpeed = Math.round(distance / (duration / 60));
        const maxSpeed = avgSpeed + 10 + Math.floor(Math.random() * 20);
        
        sampleTrips.push({
          id: `trip-${String(i + 1).padStart(3, '0')}`,
          date: tripDate,
          startLocation: location.start,
          endLocation: location.end,
          duration,
          distance,
          incidents,
          safetyScore,
          status,
          avgSpeed,
          maxSpeed
        });
      }

      return sampleTrips.sort((a, b) => b.date.getTime() - a.date.getTime());
    };

    const mockTrips = generateSampleTrips();
    setTrips(mockTrips);
    setFilteredTrips(mockTrips);
    setIsLoading(false);
  }, [user]);

  // Filter trips based on search and filters
  useEffect(() => {
    let filtered = trips;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(trip => 
        trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(trip => trip.status === filterStatus);
    }

    // Period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterPeriod) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(trip => trip.date >= filterDate);
    }

    setFilteredTrips(filtered);
  }, [trips, searchTerm, filterStatus, filterPeriod]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusIcon = (status) => {
    return status === 'completed' ? 
      <CheckCircle className="text-green-500" /> : 
      <Error className="text-red-500" />;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30';
    if (score >= 75) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Calculate summary statistics
  const totalTrips = filteredTrips.length;
  const totalDistance = filteredTrips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalTime = filteredTrips.reduce((sum, trip) => sum + trip.duration, 0);
  const avgSafetyScore = totalTrips > 0 ? Math.round(filteredTrips.reduce((sum, trip) => sum + trip.safetyScore, 0) / totalTrips) : 0;
  const totalIncidents = filteredTrips.reduce((sum, trip) => sum + trip.incidents.length, 0);

  if (loading || isLoading || !user) {
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
          {/* Enhanced Header with View Mode Switcher */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Advanced Trip Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {viewMode === 'dashboard' && 'Comprehensive overview of your driving history and performance analytics'}
                {viewMode === 'analytics' && 'Deep dive into your driving patterns and trends'}
                {viewMode === 'table' && 'Detailed table view with advanced filtering and trip management'}
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'dashboard'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Speed className="text-sm" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'analytics'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Insights className="text-sm" />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'table'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <ViewList className="text-sm" />
                  <span>Detailed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Trips</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTrips}</p>
                </div>
                <Timeline className="text-blue-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Distance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalDistance.toFixed(1)} km</p>
                </div>
                <LocationOn className="text-green-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Time</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatDuration(totalTime)}</p>
                </div>
                <AccessTime className="text-purple-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Safety Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgSafetyScore}%</p>
                </div>
                <Speed className="text-orange-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Incidents</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalIncidents}</p>
                </div>
                <Warning className="text-red-500 text-3xl" />
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location or trip ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="interrupted">Interrupted</option>
              </select>

              {/* Period Filter */}
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>

              {/* Export Button */}
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Download className="text-sm" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Dashboard View */}
          {viewMode === 'dashboard' && (
            <div className="space-y-6">
              {/* Recent Trips Quick View */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Timeline className="mr-2 text-blue-500" />
                    Recent Trips
                  </h3>
                  <div className="space-y-3">
                    {filteredTrips.slice(0, 5).map((trip) => (
                      <div key={trip.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {trip.startLocation} → {trip.endLocation}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {trip.date.toLocaleDateString()} • {formatDuration(trip.duration)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(trip.safetyScore)}`}>
                            {trip.safetyScore}%
                          </span>
                          {getStatusIcon(trip.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Warning className="mr-2 text-orange-500" />
                    Safety Overview
                  </h3>
                  <div className="space-y-6">
                    {/* Safety Score with Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Safety Score</span>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{avgSafetyScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            avgSafetyScore >= 90 ? 'bg-green-500' : 
                            avgSafetyScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${avgSafetyScore}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {avgSafetyScore >= 90 ? 'Excellent driving!' : 
                         avgSafetyScore >= 75 ? 'Good, room for improvement' : 'Needs attention'}
                      </p>
                    </div>

                    {/* Incidents Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Incidents</span>
                        <span className="text-xl font-bold text-red-600">{totalIncidents}</span>
                      </div>
                      
                      {/* Incident Breakdown */}
                      <div className="space-y-2">
                        {(() => {
                          const incidentCounts = {};
                          filteredTrips.forEach(trip => {
                            trip.incidents.forEach(incident => {
                              incidentCounts[incident.type] = (incidentCounts[incident.type] || 0) + 1;
                            });
                          });
                          
                          return Object.entries(incidentCounts)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 3)
                            .map(([type, count]) => (
                              <div key={type} className="flex items-center justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400">{type}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                              </div>
                            ));
                        })()}
                      </div>
                    </div>

                    {/* Risk Level Indicator */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Level</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          totalIncidents / Math.max(totalTrips, 1) <= 0.5 ? 'bg-green-100 text-green-800' :
                          totalIncidents / Math.max(totalTrips, 1) <= 1.5 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {totalIncidents / Math.max(totalTrips, 1) <= 0.5 ? 'Low' :
                           totalIncidents / Math.max(totalTrips, 1) <= 1.5 ? 'Medium' : 'High'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(totalIncidents / Math.max(totalTrips, 1)).toFixed(1)} incidents per trip
                      </p>
                    </div>

                    {/* Safe Trips Counter */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Safe Trips</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {filteredTrips.filter(trip => trip.incidents.length === 0).length}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {totalTrips > 0 ? Math.round((filteredTrips.filter(trip => trip.incidents.length === 0).length / totalTrips) * 100) : 0}% of trips
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics View */}
          {viewMode === 'analytics' && (
            <div className="space-y-6">
              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Safety Score Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-green-500" />
                    Safety Score Trend (Last 7 Days)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { day: 'Mon', score: 85 },
                          { day: 'Tue', score: 88 },
                          { day: 'Wed', score: 82 },
                          { day: 'Thu', score: 90 },
                          { day: 'Fri', score: 87 },
                          { day: 'Sat', score: 92 },
                          { day: 'Sun', score: 89 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Trip Distance Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BarChartIcon className="mr-2 text-blue-500" />
                    Distance Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { range: '0-10km', trips: 8 },
                          { range: '10-25km', trips: 12 },
                          { range: '25-50km', trips: 15 },
                          { range: '50-100km', trips: 7 },
                          { range: '100km+', trips: 3 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="trips" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Incident Types */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <PieChartIcon className="mr-2 text-purple-500" />
                    Incident Types Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Harsh Braking', value: 35, fill: '#ef4444' },
                            { name: 'Rapid Acceleration', value: 25, fill: '#f97316' },
                            { name: 'Sharp Turn', value: 20, fill: '#eab308' },
                            { name: 'Phone Usage', value: 15, fill: '#8b5cf6' },
                            { name: 'Drowsiness', value: 5, fill: '#06b6d4' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Trip Time Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <AccessTime className="mr-2 text-orange-500" />
                    Trip Time Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { hour: '6AM', trips: 2 },
                          { hour: '7AM', trips: 8 },
                          { hour: '8AM', trips: 15 },
                          { hour: '9AM', trips: 12 },
                          { hour: '12PM', trips: 6 },
                          { hour: '5PM', trips: 18 },
                          { hour: '6PM', trips: 14 },
                          { hour: '7PM', trips: 9 },
                          { hour: '8PM', trips: 4 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="trips" stroke="#f97316" fill="#fed7aa" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Speed</h4>
                    <Speed className="text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalTrips > 0 ? Math.round(filteredTrips.reduce((sum, trip) => sum + trip.avgSpeed, 0) / totalTrips) : 0} km/h
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    +2.5% from last week
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Trip Completion Rate</h4>
                    <CheckCircle className="text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalTrips > 0 ? Math.round((filteredTrips.filter(trip => trip.status === 'completed').length / totalTrips) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <TrendingUp className="inline w-4 h-4 mr-1" />
                    +1.2% from last week
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Safe Trips</h4>
                    <Warning className="text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalTrips > 0 ? filteredTrips.filter(trip => trip.incidents.length === 0).length : 0}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {totalTrips > 0 ? Math.round((filteredTrips.filter(trip => trip.incidents.length === 0).length / totalTrips) * 100) : 0}% of total trips
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Table View */}
          {viewMode === 'table' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Trip Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Duration & Distance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Incidents
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Safety Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <CalendarToday className="text-gray-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {trip.date.toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {formatTime(trip.date)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-white flex items-center">
                              <LocationOn className="text-green-500 mr-1 text-sm" />
                              {trip.startLocation}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 flex items-center mt-1">
                              <LocationOn className="text-red-500 mr-1 text-sm" />
                              {trip.endLocation}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{formatDuration(trip.duration)}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{trip.distance} km</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-white">Avg: {trip.avgSpeed} km/h</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Max: {trip.maxSpeed} km/h</div>
                        </td>

                        <td className="px-6 py-4">
                          {trip.incidents.length === 0 ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              No incidents
                            </span>
                          ) : (
                            <div className="space-y-1">
                              {trip.incidents.slice(0, 2).map((incident, idx) => (
                                <div key={idx} className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getSeverityColor(incident.severity)}`}>
                                  {incident.type}
                                </div>
                              ))}
                              {trip.incidents.length > 2 && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  +{trip.incidents.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(trip.safetyScore)}`}>
                            {trip.safetyScore}%
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(trip.status)}
                            <span className="text-sm text-gray-900 dark:text-white capitalize">
                              {trip.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredTrips.length === 0 && (
                  <div className="text-center py-12">
                    <Timeline className="mx-auto text-gray-400 text-6xl mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trips found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || filterStatus !== 'all' || filterPeriod !== 'all' 
                        ? 'Try adjusting your filters to see more results.'
                        : 'Start driving to see your trip history!'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trip History Table - This was the old table that's now moved to the table view */}

          {/* Footer Stats */}
          {filteredTrips.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <div>
                Showing {filteredTrips.length} of {trips.length} trips
              </div>
              <div className="text-xs">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
