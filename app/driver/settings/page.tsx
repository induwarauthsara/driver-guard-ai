'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useRouter } from 'next/navigation';
import Person from '@mui/icons-material/Person';
import Security from '@mui/icons-material/Security';
import Notifications from '@mui/icons-material/Notifications';
import Camera from '@mui/icons-material/Camera';
import LocationOn from '@mui/icons-material/LocationOn';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Brightness6 from '@mui/icons-material/Brightness6';
import Language from '@mui/icons-material/Language';
import Save from '@mui/icons-material/Save';
import RestartAlt from '@mui/icons-material/RestartAlt';
import Download from '@mui/icons-material/Download';
import Upload from '@mui/icons-material/Upload';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import CheckCircle from '@mui/icons-material/CheckCircle';
import BatteryFull from '@mui/icons-material/BatteryFull';
import Warning from '@mui/icons-material/Warning';
import DeviceThermostat from '@mui/icons-material/DeviceThermostat';
import PowerSettingsNew from '@mui/icons-material/PowerSettingsNew';

export default function DriverSettings() {
  const { user, logout, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    vehicleModel: '',
    licenseNumber: ''
  });

  // Detection settings
  const [detectionSettings, setDetectionSettings] = useState({
    drowsinessDetection: true,
    phoneDetection: true,
    speedingAlerts: true,
    sensitivityLevel: 'medium',
    alertDelay: 3
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    audioAlerts: true,
    visualAlerts: true,
    vibrationAlerts: true,
    emailNotifications: false,
    incidentReports: true
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareLocationData: true,
    dataRetention: '90days',
    anonymousReporting: false
  });

  // Camera settings
  const [cameraSettings, setCameraSettings] = useState({
    resolution: '1080p',
    frameRate: '30fps',
    nightMode: true,
    autoFocus: true
  });

  // Battery optimization settings
  const [batterySettings, setBatterySettings] = useState({
    videoQuality: 'standard', // high, standard, low, battery_saver
    gpsUpdateInterval: 30, // seconds
    videoRecordingMode: 'continuous', // continuous, events_only, manual
    backgroundProcessing: true,
    autoSleepMode: true,
    thermalProtection: true,
    lowPowerMode: false,
    frameRateLimit: 30 // fps
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  // Redirect if not authenticated or not a driver
  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  // Initialize profile data from user
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would save to backend
    const settings = {
      profile: profileData,
      detection: detectionSettings,
      notifications: notificationSettings,
      privacy: privacySettings,
      camera: cameraSettings,
      battery: batterySettings
    };
    
    localStorage.setItem('driverSettings', JSON.stringify(settings));
    
    setIsSaving(false);
    setSavedMessage('Settings saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setDetectionSettings({
        drowsinessDetection: true,
        phoneDetection: true,
        speedingAlerts: true,
        sensitivityLevel: 'medium',
        alertDelay: 3
      });
      setNotificationSettings({
        audioAlerts: true,
        visualAlerts: true,
        vibrationAlerts: true,
        emailNotifications: false,
        incidentReports: true
      });
      setPrivacySettings({
        shareLocationData: true,
        dataRetention: '90days',
        anonymousReporting: false
      });
      setCameraSettings({
        resolution: '1080p',
        frameRate: '30fps',
        nightMode: true,
        autoFocus: true
      });
      setBatterySettings({
        videoQuality: 'standard',
        gpsUpdateInterval: 30,
        videoRecordingMode: 'continuous',
        backgroundProcessing: true,
        autoSleepMode: true,
        thermalProtection: true,
        lowPowerMode: false,
        frameRateLimit: 30
      });
    }
  };

  const handleExportData = () => {
    const data = {
      profile: profileData,
      settings: {
        detection: detectionSettings,
        notifications: notificationSettings,
        privacy: privacySettings,
        camera: cameraSettings,
        battery: batterySettings
      },
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `driver-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: Person },
    { id: 'detection', label: 'Detection', icon: Security },
    { id: 'notifications', label: 'Notifications', icon: Notifications },
    { id: 'camera', label: 'Camera', icon: Camera },
    { id: 'battery', label: 'Battery', icon: BatteryFull },
    { id: 'privacy', label: 'Privacy', icon: LocationOn },
  ];

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Customize your driving experience and preferences</p>
          </div>

          {/* Success Message */}
          {savedMessage && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600" />
                <span className="text-green-800 dark:text-green-200">{savedMessage}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <IconComponent className="text-lg" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Action Buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {isSaving ? (
                      <div className="loading-spinner w-4 h-4"></div>
                    ) : (
                      <Save />
                    )}
                    <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
                  </button>

                  <button
                    onClick={handleResetSettings}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <RestartAlt />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Download />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Vehicle Model
                        </label>
                        <input
                          type="text"
                          value={profileData.vehicleModel}
                          onChange={(e) => setProfileData(prev => ({ ...prev, vehicleModel: e.target.value }))}
                          placeholder="e.g., Toyota Camry 2020"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          License Number
                        </label>
                        <input
                          type="text"
                          value={profileData.licenseNumber}
                          onChange={(e) => setProfileData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Detection Tab */}
                {activeTab === 'detection' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Detection Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Drowsiness Detection</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Monitor eye closure and head movement</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={detectionSettings.drowsinessDetection}
                            onChange={(e) => setDetectionSettings(prev => ({ ...prev, drowsinessDetection: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Phone Usage Detection</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Detect when driver is using phone</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={detectionSettings.phoneDetection}
                            onChange={(e) => setDetectionSettings(prev => ({ ...prev, phoneDetection: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Speeding Alerts</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Alert when exceeding speed limits</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={detectionSettings.speedingAlerts}
                            onChange={(e) => setDetectionSettings(prev => ({ ...prev, speedingAlerts: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Detection Sensitivity</h3>
                        <select
                          value={detectionSettings.sensitivityLevel}
                          onChange={(e) => setDetectionSettings(prev => ({ ...prev, sensitivityLevel: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="low">Low - Less sensitive</option>
                          <option value="medium">Medium - Balanced</option>
                          <option value="high">High - Very sensitive</option>
                        </select>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Alert Delay (seconds)</h3>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={detectionSettings.alertDelay}
                          onChange={(e) => setDetectionSettings(prev => ({ ...prev, alertDelay: parseInt(e.target.value) }))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span>1s</span>
                          <span>{detectionSettings.alertDelay}s</span>
                          <span>10s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Audio Alerts</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Play sound for incidents</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.audioAlerts}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, audioAlerts: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Visual Alerts</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Show on-screen warnings</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.visualAlerts}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, visualAlerts: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Vibration Alerts</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Device vibration for alerts</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.vibrationAlerts}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, vibrationAlerts: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Send incident reports via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.emailNotifications}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Incident Reports</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Generate detailed incident reports</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notificationSettings.incidentReports}
                            onChange={(e) => setNotificationSettings(prev => ({ ...prev, incidentReports: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Camera Tab */}
                {activeTab === 'camera' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Camera Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Video Resolution</h3>
                        <select
                          value={cameraSettings.resolution}
                          onChange={(e) => setCameraSettings(prev => ({ ...prev, resolution: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="720p">720p - Standard Quality</option>
                          <option value="1080p">1080p - High Quality</option>
                          <option value="4k">4K - Ultra High Quality</option>
                        </select>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Frame Rate</h3>
                        <select
                          value={cameraSettings.frameRate}
                          onChange={(e) => setCameraSettings(prev => ({ ...prev, frameRate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="15fps">15 FPS - Battery Saving</option>
                          <option value="30fps">30 FPS - Standard</option>
                          <option value="60fps">60 FPS - Smooth</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Night Mode</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Enhanced low-light detection</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cameraSettings.nightMode}
                            onChange={(e) => setCameraSettings(prev => ({ ...prev, nightMode: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Auto Focus</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Automatic camera focus adjustment</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cameraSettings.autoFocus}
                            onChange={(e) => setCameraSettings(prev => ({ ...prev, autoFocus: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Battery Optimization Tab */}
                {activeTab === 'battery' && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <BatteryFull className="text-yellow-500" />
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Battery Optimization</h2>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <PowerSettingsNew className="text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Power Management</h3>
                          <p className="text-sm text-blue-700 dark:text-blue-200">
                            Optimize battery usage and reduce device heating during continuous monitoring.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Video Quality Setting */}
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Video Quality</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Lower quality saves battery but may reduce detection accuracy</p>
                        <select
                          value={batterySettings.videoQuality}
                          onChange={(e) => setBatterySettings(prev => ({ ...prev, videoQuality: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="high">High (Best Quality, More Battery)</option>
                          <option value="standard">Standard (Recommended)</option>
                          <option value="low">Low (Good Battery Saving)</option>
                          <option value="battery_saver">Battery Saver (Maximum Saving)</option>
                        </select>
                      </div>

                      {/* GPS Update Interval */}
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">GPS Update Frequency</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">How often to update location ({batterySettings.gpsUpdateInterval} seconds)</p>
                        <input
                          type="range"
                          min="10"
                          max="120"
                          step="10"
                          value={batterySettings.gpsUpdateInterval}
                          onChange={(e) => setBatterySettings(prev => ({ ...prev, gpsUpdateInterval: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>10s (Frequent)</span>
                          <span>60s (Balanced)</span>
                          <span>120s (Battery Saving)</span>
                        </div>
                      </div>

                      {/* Video Recording Mode */}
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Recording Mode</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Choose when to record video</p>
                        <select
                          value={batterySettings.videoRecordingMode}
                          onChange={(e) => setBatterySettings(prev => ({ ...prev, videoRecordingMode: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="continuous">Continuous Recording</option>
                          <option value="events_only">Events Only (Best Battery)</option>
                          <option value="manual">Manual Control</option>
                        </select>
                      </div>

                      {/* Frame Rate Limit */}
                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Frame Rate Limit</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Lower frame rates save battery ({batterySettings.frameRateLimit} FPS)</p>
                        <input
                          type="range"
                          min="15"
                          max="60"
                          step="15"
                          value={batterySettings.frameRateLimit}
                          onChange={(e) => setBatterySettings(prev => ({ ...prev, frameRateLimit: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>15 FPS</span>
                          <span>30 FPS</span>
                          <span>60 FPS</span>
                        </div>
                      </div>

                      {/* Power Management Toggles */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Warning className="text-orange-500" />
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Low Power Mode</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Enable aggressive power saving</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={batterySettings.lowPowerMode}
                              onChange={(e) => setBatterySettings(prev => ({ ...prev, lowPowerMode: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <DeviceThermostat className="text-red-500" />
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">Thermal Protection</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Reduce performance when device gets hot</p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={batterySettings.thermalProtection}
                              onChange={(e) => setBatterySettings(prev => ({ ...prev, thermalProtection: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Auto Sleep Mode</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Automatically reduce activity when vehicle is stationary</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={batterySettings.autoSleepMode}
                              onChange={(e) => setBatterySettings(prev => ({ ...prev, autoSleepMode: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">Background Processing</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Allow processing when app is in background</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={batterySettings.backgroundProcessing}
                              onChange={(e) => setBatterySettings(prev => ({ ...prev, backgroundProcessing: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      {/* Battery Status Information */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-3">Current Settings Impact</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Estimated Battery Life:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {batterySettings.lowPowerMode ? '8-10 hours' : 
                               batterySettings.videoQuality === 'battery_saver' ? '6-8 hours' : 
                               batterySettings.videoQuality === 'low' ? '4-6 hours' : '3-4 hours'}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Performance Level:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {batterySettings.lowPowerMode ? 'Basic' : 
                               batterySettings.videoQuality === 'high' ? 'Maximum' : 'Good'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy & Data</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Share Location Data</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Allow location tracking for incidents</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.shareLocationData}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, shareLocationData: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Retention Period</h3>
                        <select
                          value={privacySettings.dataRetention}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="30days">30 Days</option>
                          <option value="90days">90 Days</option>
                          <option value="1year">1 Year</option>
                          <option value="forever">Keep Forever</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">Anonymous Reporting</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Contribute to safety research anonymously</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacySettings.anonymousReporting}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, anonymousReporting: e.target.checked }))}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="p-4 border border-red-200 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/20">
                        <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">Danger Zone</h3>
                        <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                          These actions cannot be undone. Please proceed with caution.
                        </p>
                        <div className="space-y-2">
                          <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                            <Delete />
                            <span>Delete All Data</span>
                          </button>
                          <button 
                            onClick={logout}
                            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
