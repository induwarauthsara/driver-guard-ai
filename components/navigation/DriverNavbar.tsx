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
    { label: 'Drive Interface', href: '/driver/interface', icon: DriveEta },
    { label: 'Trip History', href: '/driver/history', icon: History },
    { label: 'My Stats', href: '/driver/stats', icon: Assessment },
    { label: 'Settings', href: '/driver/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Security className="text-green-500 text-3xl" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">DriveGuard AI</span>
            <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
              Driver
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <IconComponent className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Status indicators and right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Status indicators for mobile/desktop */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <LocationOn className="text-green-500" />
              <BatteryFull className="text-green-500" />
              <SignalWifi4Bar className="text-green-500" />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? <DarkMode /> : <LightMode />}
            </button>
            
            <button className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Notifications />
            </button>

            {/* User Profile Dropdown */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <AccountCircle className="text-gray-700 dark:text-gray-300" />
                <div className="text-sm">
                  <div className="font-medium text-gray-900 dark:text-white">{user?.name}</div>
                  <div className="text-gray-500 dark:text-gray-400">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-2 rounded-lg font-medium transition-colors"
              >
                <Logout className="text-sm" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
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
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="text-lg" />
                    <span>{item.label}</span>
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
