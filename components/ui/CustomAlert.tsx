import React, { useState, useEffect } from 'react';
import { AlertSuggestion } from '../notifications/DriverAlertSystem';

interface CustomAlertProps {
  alert: AlertSuggestion | null;
  onDismiss: () => void;
  onAction?: (action: string) => void;
}

export default function CustomAlert({ alert, onDismiss, onAction }: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
      setProgress(100);

      // Progress countdown
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (alert.duration / 100));
          if (newProgress <= 0) {
            clearInterval(interval);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      // Auto dismiss after duration
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss(), 300); // Wait for animation
      }, alert.duration);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setIsVisible(false);
    }
  }, [alert, onDismiss]);

  if (!alert) return null;

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return {
          container: 'bg-red-600 border-red-700 text-white shadow-red-500/50',
          progress: 'bg-red-300',
          animation: 'animate-pulse'
        };
      case 'high':
        return {
          container: 'bg-orange-500 border-orange-600 text-white shadow-orange-500/50',
          progress: 'bg-orange-300',
          animation: 'animate-bounce'
        };
      case 'medium':
        return {
          container: 'bg-yellow-500 border-yellow-600 text-white shadow-yellow-500/50',
          progress: 'bg-yellow-300',
          animation: ''
        };
      case 'low':
        return {
          container: 'bg-blue-500 border-blue-600 text-white shadow-blue-500/50',
          progress: 'bg-blue-300',
          animation: ''
        };
      default:
        return {
          container: 'bg-gray-500 border-gray-600 text-white shadow-gray-500/50',
          progress: 'bg-gray-300',
          animation: ''
        };
    }
  };

  const styles = getUrgencyStyles(alert.urgency);

  const handleActionClick = () => {
    if (alert.action && onAction) {
      onAction(alert.action);
    }
    onDismiss();
  };

  const getActionButtonText = (action: string) => {
    switch (action) {
      case 'hydrate': return 'Drink Water';
      case 'break': return 'Take Break';
      case 'rest': return 'Find Rest Area';
      case 'music': return 'Play Music';
      case 'stop': return 'Stop Safely';
      case 'ventilate': return 'Open Windows';
      case 'exercise': return 'Note for Next Stop';
      case 'mandatory_break': return 'STOP NOW';
      case 'emergency_stop': return 'EMERGENCY STOP';
      case 'refresh': return 'Refresh Yourself';
      case 'phone_away': return 'Put Phone Away';
      case 'hands_free': return 'Use Hands-Free';
      case 'pullover': return 'Pull Over';
      case 'reduce_speed': return 'Reduce Speed';
      case 'emergency': return 'CALL EMERGENCY';
      default: return 'Acknowledge';
    }
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className={`
          ${styles.container} ${styles.animation}
          ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          transition-all duration-300 ease-in-out
          rounded-xl border-2 shadow-2xl backdrop-blur-sm
          transform scale-105
        `}
      >
        {/* Progress bar */}
        <div className="h-1 bg-black/20 rounded-t-xl overflow-hidden">
          <div
            className={`h-full ${styles.progress} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Alert content */}
        <div className="p-6">
          {/* Header with icon and urgency indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{alert.icon}</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-2 py-1 bg-black/20 rounded-full uppercase">
                  {alert.urgency}
                </span>
                {alert.urgency === 'critical' && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onDismiss}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Alert message */}
          <div className="mb-4">
            <p className="text-lg font-medium leading-relaxed">
              {alert.message}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            {alert.action && (
              <button
                onClick={handleActionClick}
                className={`
                  flex-1 px-4 py-3 bg-white/20 hover:bg-white/30 
                  rounded-lg font-semibold transition-all duration-200
                  transform hover:scale-105 active:scale-95
                  ${alert.urgency === 'critical' ? 'animate-pulse' : ''}
                `}
              >
                {getActionButtonText(alert.action)}
              </button>
            )}
            <button
              onClick={onDismiss}
              className="px-4 py-3 bg-black/20 hover:bg-black/30 rounded-lg font-semibold transition-all duration-200"
            >
              Dismiss
            </button>
          </div>

          {/* Additional info for critical alerts */}
          {alert.urgency === 'critical' && (
            <div className="mt-4 p-3 bg-black/20 rounded-lg">
              <p className="text-sm font-medium">
                ⚠️ This is a critical safety alert. Please take immediate action.
              </p>
            </div>
          )}
        </div>

        {/* Visual effects for different urgencies */}
        {alert.urgency === 'critical' && (
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <div className="absolute inset-0 bg-red-500/30 rounded-xl animate-ping"></div>
          </div>
        )}
      </div>
    </div>
  );
}
