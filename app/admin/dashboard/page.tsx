'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import Warning from '@mui/icons-material/Warning';
import TrendingUp from '@mui/icons-material/TrendingUp';
import LocationOn from '@mui/icons-material/LocationOn';
import Visibility from '@mui/icons-material/Visibility';
import Phone from '@mui/icons-material/Phone';
import Speed from '@mui/icons-material/Speed';
import FilterList from '@mui/icons-material/FilterList';
import GetApp from '@mui/icons-material/GetApp';
import Refresh from '@mui/icons-material/Refresh';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Driver {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'incident';
  location: { lat: number; lng: number };
  lastSeen: Date;
  currentTrip?: {
    startTime: Date;
    duration: number;
    incidents: number;
  };
}

interface Incident {
  id: string;
  driverId: string;
  driverName: string;
  type: 'drowsiness' | 'phone' | 'overspeed';
  confidence: number;
  timestamp: Date;
  location: { lat: number; lng: number };
  resolved: boolean;
}

interface Analytics {
  totalDrivers: number;
  activeDrivers: number;
  totalIncidents: number;
  incidentsByType: { type: string; count: number; color: string }[];
  incidentsTrend: { date: string; incidents: number }[];
  driverScores: { name: string; score: number }[];
}

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'incidents' | 'drivers' | 'analytics' | 'settings'>('overview');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'drowsiness' | 'phone' | 'overspeed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated or not an admin
  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/auth/login?role=admin');
    }
  }, [user, router, loading]);

  // Handle tab from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'incidents', 'drivers', 'analytics', 'settings'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, [searchParams]);

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      // Generate mock drivers
      const mockDrivers: Driver[] = Array.from({ length: 15 }, (_, i) => ({
        id: `driver-${i + 1}`,
        name: `Driver ${i + 1}`,
        email: `driver${i + 1}@company.com`,
        status: Math.random() > 0.7 ? 'active' : Math.random() > 0.5 ? 'inactive' : 'incident',
        location: {
          lat: 6.9271 + (Math.random() - 0.5) * 0.1,
          lng: 79.8612 + (Math.random() - 0.5) * 0.1
        },
        lastSeen: new Date(Date.now() - Math.random() * 3600000),
        currentTrip: Math.random() > 0.6 ? {
          startTime: new Date(Date.now() - Math.random() * 7200000),
          duration: Math.random() * 7200000,
          incidents: Math.floor(Math.random() * 5)
        } : undefined
      }));

      // Generate mock incidents
      const incidentTypes: ('drowsiness' | 'phone' | 'overspeed')[] = ['drowsiness', 'phone', 'overspeed'];
      const mockIncidents: Incident[] = Array.from({ length: 50 }, (_, i) => {
        const driver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
        const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
        
        return {
          id: `incident-${i + 1}`,
          driverId: driver.id,
          driverName: driver.name,
          type,
          confidence: 0.7 + Math.random() * 0.3,
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
          location: {
            lat: driver.location.lat + (Math.random() - 0.5) * 0.01,
            lng: driver.location.lng + (Math.random() - 0.5) * 0.01
          },
          resolved: Math.random() > 0.3
        };
      });

      // Generate analytics
      const incidentsByType = [
        { type: 'Drowsiness', count: mockIncidents.filter(i => i.type === 'drowsiness').length, color: '#ff9800' },
        { type: 'Phone Usage', count: mockIncidents.filter(i => i.type === 'phone').length, color: '#f44336' },
        { type: 'Overspeed', count: mockIncidents.filter(i => i.type === 'overspeed').length, color: '#9c27b0' }
      ];

      const incidentsTrend = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          incidents: Math.floor(Math.random() * 20) + 5
        };
      });

      const driverScores = mockDrivers.slice(0, 10).map(driver => ({
        name: driver.name,
        score: Math.floor(Math.random() * 40) + 60 // Score between 60-100
      }));

      const mockAnalytics: Analytics = {
        totalDrivers: mockDrivers.length,
        activeDrivers: mockDrivers.filter(d => d.status === 'active').length,
        totalIncidents: mockIncidents.length,
        incidentsByType,
        incidentsTrend,
        driverScores
      };

      setDrivers(mockDrivers);
      setIncidents(mockIncidents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
      setAnalytics(mockAnalytics);
      setIsLoading(false);
    };

    generateMockData();
  }, []);

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'drowsiness': return <Visibility className="text-orange-500" />;
      case 'phone': return <Phone className="text-red-500" />;
      case 'overspeed': return <Speed className="text-purple-500" />;
      default: return <Warning className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'incident': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredIncidents = incidents.filter(incident => 
    filterType === 'all' || incident.type === filterType
  );

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Driver,Type,Confidence,Timestamp,Location,Resolved\n" +
      filteredIncidents.map(incident => 
        `${incident.id},${incident.driverName},${incident.type},${incident.confidence.toFixed(2)},${incident.timestamp.toISOString()},${incident.location.lat};${incident.location.lng},${incident.resolved}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "incidents_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || isLoading || !user) return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <People className="text-blue-500 text-3xl mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Drivers</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analytics.totalDrivers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <LocationOn className="text-green-500 text-3xl mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Now</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analytics.activeDrivers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Warning className="text-orange-500 text-3xl mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Incidents</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{analytics.totalIncidents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <TrendingUp className="text-purple-500 text-3xl mr-4" />
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Detection Rate</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">98.5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Incidents Trend (Last 7 Days)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.incidentsTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Incidents by Type
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.incidentsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ type, count }) => `${type}: ${count}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {analytics.incidentsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Incidents
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {incidents.slice(0, 5).map((incident) => (
                  <div key={incident.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getIncidentIcon(incident.type)}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {incident.driverName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} - 
                            Confidence: {(incident.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {incident.timestamp.toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {incident.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <FilterList className="text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Incidents</option>
                    <option value="drowsiness">Drowsiness</option>
                    <option value="phone">Phone Usage</option>
                    <option value="overspeed">Overspeed</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={exportData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <GetApp />
                    <span>Export</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Refresh />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Incidents List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Incidents ({filteredIncidents.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                {filteredIncidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getIncidentIcon(incident.type)}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {incident.driverName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {incident.type.charAt(0).toUpperCase() + incident.type.slice(1)} - 
                            Confidence: {(incident.confidence * 100).toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {incident.timestamp.toLocaleString()}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          incident.resolved 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {incident.resolved ? 'Resolved' : 'Active'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active Drivers ({drivers.length})
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {drivers.map((driver) => (
                  <div key={driver.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {driver.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {driver.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {driver.email}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Last seen: {driver.lastSeen.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                          {driver.status.charAt(0).toUpperCase() + driver.status.slice(1)}
                        </span>
                        {driver.currentTrip && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Trip: {Math.floor(driver.currentTrip.duration / 60000)}m, 
                            {driver.currentTrip.incidents} incidents
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Driver Safety Scores
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analytics.driverScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Incident Analysis
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={analytics.incidentsTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Average Response Time
                </h4>
                <p className="text-3xl font-bold text-blue-600">2.3s</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI Detection Speed</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  False Positive Rate
                </h4>
                <p className="text-3xl font-bold text-green-600">1.5%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">System Accuracy</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Incidents Prevented
                </h4>
                <p className="text-3xl font-bold text-purple-600">847</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                System Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Alert Thresholds
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Drowsiness Detection
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        defaultValue="75"
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">75% confidence</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Usage Detection
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        defaultValue="80"
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">80% confidence</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Speed Limit Alert
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        defaultValue="10"
                        className="w-full"
                      />
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">+10 km/h over limit</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Notification Settings
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Email alerts for critical incidents
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        SMS notifications for emergency situations
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded" />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Daily summary reports
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
                    Data Retention
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Incident Data
                      </label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                        <option>Forever</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video Recordings
                      </label>
                      <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>7 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Reset to Defaults
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Incident Details
                </h3>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Driver
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedIncident.driverName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Incident Type
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedIncident.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confidence
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {(selectedIncident.confidence * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timestamp
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedIncident.timestamp.toLocaleString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedIncident.location.lat.toFixed(6)}, {selectedIncident.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}