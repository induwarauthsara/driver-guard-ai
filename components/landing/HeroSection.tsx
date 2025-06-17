'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  PlayArrowIcon, 
  SecurityIcon, 
  VisibilityIcon, 
  SpeedIcon 
} from '@mui/icons-material';

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI-Powered Driver
            <span className="block text-yellow-300">Safety Monitoring</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Real-time drowsiness detection, phone usage monitoring, and speed analysis 
            to keep your fleet safe on the road.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/auth/login?role=driver"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <PlayArrowIcon />
              Try Driver Demo
            </Link>
            
            <Link
              href="/auth/login?role=admin"
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <SecurityIcon />
              Admin Dashboard
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect p-6 rounded-lg"
            >
              <VisibilityIcon className="text-4xl text-yellow-300 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Drowsiness Detection</h3>
              <p className="text-white/80">AI monitors eye closure and yawning patterns</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-effect p-6 rounded-lg"
            >
              <SecurityIcon className="text-4xl text-yellow-300 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Phone Usage Alert</h3>
              <p className="text-white/80">Detects distracted driving behaviors</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="glass-effect p-6 rounded-lg"
            >
              <SpeedIcon className="text-4xl text-yellow-300 mb-3" />
              <h3 className="text-xl font-semibold text-white mb-2">Speed Monitoring</h3>
              <p className="text-white/80">GPS-based overspeed detection and alerts</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}