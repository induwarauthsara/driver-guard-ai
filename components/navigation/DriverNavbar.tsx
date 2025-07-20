'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Security from '@mui/icons-material/Security';
import DriveEta from '@mui/icons-material/DriveEta';
import History from '@mui/icons-material/History';
import Assessment from '@mui/icons-material/Assessment';
import Settings from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationOn from '@mui/icons-material/LocationOn';
import BatteryFull from '@mui/icons-material/BatteryFull';
import SignalWifi4Bar from '@mui/icons-material/SignalWifi4Bar';

export default function DriverNavbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Drive', href: '/driver/interface', icon: DriveEta },
    { label: 'History', href: '/driver/history', icon: History },
    { label: 'Stats', href: '/driver/stats', icon: Assessment },
    { label: 'Settings', href: '/driver/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <Security className="text-green-500 text-2xl sm:text-3xl" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">DriveGuard AI</span>
              <span className="text-xs sm:text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full">
                Driver
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 max-w-lg">
            <div className="flex items-center justify-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <IconComponent className="text-lg" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Status indicators and right side buttons */}
          <div className="flex items-center space-x-1 sm:space-x-5 flex-shrink-0">


            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? <DarkMode className="text-lg" /> : <LightMode className="text-lg" />}
            </button>
            


            {/* User Profile Dropdown */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex items-center space-x-1 xl:space-x-2">
                <AccountCircle className="text-gray-700 dark:text-gray-300" />
                <div className="text-sm hidden xl:block">
                  <div className="font-medium text-gray-900 dark:text-white truncate max-w-24">{user?.name}</div>
                  <div className="text-gray-500 dark:text-gray-400 truncate max-w-24">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg font-medium transition-colors"
              >
                <Logout className="text-sm" />
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <Close className="text-lg" /> : <Menu className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-2">
              {/* Status indicators for mobile */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Status</span>
                <div className="flex items-center space-x-2">
                  <LocationOn className="text-green-500 text-sm" />
                  <BatteryFull className="text-green-500 text-sm" />
                  <SignalWifi4Bar className="text-green-500 text-sm" />
                  <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                </div>
              </div>

              {navItems.map((item) => {
                const IconComponent = item.icon;
                const fullLabels: Record<string, string> = {
                  'Drive': 'Drive Interface',
                  'History': 'Trip History', 
                  'Stats': 'My Stats',
                  'Settings': 'Settings'
                };
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="text-lg" />
                    <span>{fullLabels[item.label] || item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile user info and logout */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <div className="px-3 py-2">
                  <div className="font-medium text-gray-900 dark:text-white">{user?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full text-left bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  <Logout className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
