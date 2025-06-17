'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/providers/ThemeProvider';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Security from '@mui/icons-material/Security';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Security className="text-blue-500 text-3xl" />
            <span className="text-xl font-bold text-white">DriveGuard AI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {theme === 'light' ? <DarkMode /> : <LightMode />}
            </button>
            
            <Link
              href="/auth/login"
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Login
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/20 rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}