'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useSearchParams, usePathname } from 'next/navigation';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Security from '@mui/icons-material/Security';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import Warning from '@mui/icons-material/Warning';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Settings from '@mui/icons-material/Settings';
import Notifications from '@mui/icons-material/Notifications';
import Logout from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get('tab') || 'overview';

  const navItems = [
    { label: 'Overview', href: '/admin/dashboard', icon: Dashboard, tab: 'overview' },
    { label: 'Incidents', href: '/admin/dashboard?tab=incidents', icon: Warning, tab: 'incidents' },
    { label: 'Drivers', href: '/admin/dashboard?tab=drivers', icon: People, tab: 'drivers' },
    { label: 'Analytics', href: '/admin/dashboard?tab=analytics', icon: TrendingUp, tab: 'analytics' },
    { label: 'Settings', href: '/admin/dashboard?tab=settings', icon: Settings, tab: 'settings' },
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
            <Security className="text-blue-500 text-3xl" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">DriveGuard AI</span>
            <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              Admin
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === '/admin/dashboard' && currentTab === item.tab;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <IconComponent className="text-lg" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
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
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === '/admin/dashboard' && currentTab === item.tab;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
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
