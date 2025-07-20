'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Stop from '@mui/icons-material/Stop';
import CameraAlt from '@mui/icons-material/CameraAlt';
import LocationOn from '@mui/icons-material/LocationOn';
import BatteryFull from '@mui/icons-material/BatteryFull';
import SignalWifi4Bar from '@mui/icons-material/SignalWifi4Bar';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Warning from '@mui/icons-material/Warning';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Phone from '@mui/icons-material/Phone';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Speed from '@mui/icons-material/Speed';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';

interface Incident {
  id: string;
  type: 'drowsiness' | 'phone' | 'overspeed';
  confidence: number;
  timestamp: Date;
  location: { lat: number; lng: number; } | null;
}

interface TripData {
  startTime: Date | null;
  duration: number;
  incidents: Incident[];
  distance: number;
  currentSpeed: number;
}

export default function DriverInterface() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<'safe' | 'warning' | 'danger'>('safe');
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [currentIncident, setCurrentIncident] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const [tripData, setTripData] = useState<TripData>({
    startTime: null,
    duration: 0,
    incidents: [],
    distance: 0,
    currentSpeed: 0
  });

  // Redirect if not authenticated or not a driver
  useEffect(() => {
    if (!loading && (!user || user.role !== 'driver')) {
      router.push('/auth/login?role=driver');
    }
  }, [user, router, loading]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => console.error('Location error:', error)
      );
    }
  }, []);

  // Simulate AI detection and trip monitoring
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        // Simulate AI detection results
        const detectionResults = simulateAIDetection();
        
        if (detectionResults.incident) {
          handleIncidentDetected(detectionResults.incident);
        }
        
        // Update trip duration
        if (tripData.startTime) {
          setTripData(prev => ({
            ...prev,
            duration: Date.now() - prev.startTime!.getTime(),
            currentSpeed: Math.random() * 80 + 20, // Simulate speed
            distance: prev.distance + 0.1 // Simulate distance
          }));
        }
        
        // Simulate battery drain
        setBatteryLevel(prev => Math.max(prev - 0.1, 0));
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, tripData.startTime]);

  const simulateAIDetection = () => {
    const random = Math.random();
    
    if (random < 0.05) { // 5% chance of drowsiness
      return {
        incident: {
          id: Date.now().toString(),
          type: 'drowsiness' as const,
          confidence: 0.85 + Math.random() * 0.15,
          timestamp: new Date(),
          location
        }
      };
    } else if (random < 0.08) { // 3% chance of phone usage
      return {
        incident: {
          id: Date.now().toString(),
          type: 'phone' as const,
          confidence: 0.90 + Math.random() * 0.10,
          timestamp: new Date(),
          location
        }
      };
    } else if (random < 0.10) { // 2% chance of overspeed
      return {
        incident: {
          id: Date.now().toString(),
          type: 'overspeed' as const,
          confidence: 0.95,
          timestamp: new Date(),
          location
        }
      };
    }
    
    return { incident: null };
  };

  const handleIncidentDetected = (incident: Incident) => {
    setTripData(prev => ({
      ...prev,
      incidents: [...prev.incidents, incident]
    }));
    
    setCurrentIncident(incident.type);
    setCurrentStatus('danger');
    
    // Play alert sound
    if (audioEnabled) {
      playAlertSound(incident.type);
    }
    
    // Clear incident after 5 seconds
    setTimeout(() => {
      setCurrentIncident(null);
      setCurrentStatus('safe');
    }, 5000);
  };

  const playAlertSound = (type: string) => {
    // Create audio context for alert sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different alerts
    const frequencies = {
      drowsiness: 800,
      phone: 1000,
      overspeed: 1200
    };
    
    oscillator.frequency.setValueAtTime(frequencies[type as keyof typeof frequencies], audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  const startTrip = () => {
    setIsRecording(true);
    setTripData(prev => ({
      ...prev,
      startTime: new Date(),
      incidents: [],
      distance: 0
    }));
    setCurrentStatus('safe');
  };

  const stopTrip = () => {
    setIsRecording(false);
    setCurrentStatus('safe');
    setCurrentIncident(null);
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'safe': return 'status-safe';
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'drowsiness': return <VisibilityOff className="text-2xl" />;
      case 'phone': return <Phone className="text-2xl" />;
      case 'overspeed': return <Speed className="text-2xl" />;
      default: return <Warning className="text-2xl" />;
    }
  };

  if (loading || !user) return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="p-4">
        {/* Main Interface - Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Camera View */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Driver Camera
              </h2>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {isRecording ? 'Recording' : 'Stopped'}
                </span>
              </div>
            </div>
            
            <div className="camera-frame aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
              <Webcam
                ref={webcamRef}
                audio={false}
                className="w-full h-full object-cover"
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: lowDataMode ? 640 : 1280,
                  height: lowDataMode ? 480 : 720,
                  facingMode: "user"
                }}
              />
            </div>
            
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={startTrip}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                >
                  <PlayArrow />
                  <span>Start Trip</span>
                </button>
              ) : (
                <button
                  onClick={stopTrip}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
                >
                  <Stop />
                  <span>Stop Trip</span>
                </button>
              )}
            </div>
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className={`${getStatusColor()} rounded-lg p-6 text-center`}>
              <div className="flex items-center justify-center mb-3">
                {currentIncident ? (
                  getIncidentIcon(currentIncident)
                ) : (
                  <CheckCircle className="text-3xl" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {currentIncident ? (
                  currentIncident === 'drowsiness' ? 'DROWSINESS DETECTED!' :
                  currentIncident === 'phone' ? 'PHONE USAGE DETECTED!' :
                  'OVERSPEED DETECTED!'
                ) : 'DRIVING SAFELY'}
              </h3>
              <p className="text-sm opacity-90">
                {currentIncident ? 'Please focus on the road' : 'Keep up the good work'}
              </p>
            </div>

            {/* System Status */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Status
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BatteryFull className="text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Battery</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {batteryLevel.toFixed(0)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <SignalWifi4Bar className={connectionStatus === 'online' ? 'text-green-500' : 'text-red-500'} />
                    <span className="text-gray-700 dark:text-gray-300">Connection</span>
                  </div>
                  <span className={`font-medium ${connectionStatus === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                    {connectionStatus.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LocationOn className="text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">GPS</span>
                  </div>
                  <span className="font-medium text-green-600">
                    {location ? 'ACTIVE' : 'SEARCHING...'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <VolumeUp className={audioEnabled ? 'text-blue-500' : 'text-gray-400'} />
                    <span className="text-gray-700 dark:text-gray-300">Audio Alerts</span>
                  </div>
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      audioEnabled ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {audioEnabled ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Settings
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Low Data Mode</span>
                  <button
                    onClick={() => setLowDataMode(!lowDataMode)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      lowDataMode ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {lowDataMode ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Information */}
        {isRecording && tripData.startTime && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Current Trip
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatDuration(tripData.duration)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {tripData.distance.toFixed(1)} km
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Distance</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {tripData.currentSpeed.toFixed(0)} km/h
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Speed</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {tripData.incidents.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Incidents</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}