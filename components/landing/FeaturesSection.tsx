'use client';

import { motion } from 'framer-motion';
import CameraAlt from '@mui/icons-material/CameraAlt';
import Dashboard from '@mui/icons-material/Dashboard';
import Cloud from '@mui/icons-material/Cloud';
import Security from '@mui/icons-material/Security';
import Notifications from '@mui/icons-material/Notifications';
import Analytics from '@mui/icons-material/Analytics';
import Map from '@mui/icons-material/Map';
import BatteryChargingFull from '@mui/icons-material/BatteryChargingFull';

const features = [
  {
    icon: CameraAlt,
    title: 'Real-Time Video Analysis',
    description: 'Advanced AI processes video frames in real-time to detect dangerous driving behaviors with high accuracy.',
    color: 'text-cyan-500',
    glowColor: 'rgba(6, 182, 212, 0.35)'
  },
  {
    icon: Dashboard,
    title: 'Admin Dashboard',
    description: 'Comprehensive monitoring dashboard with live incident feeds, analytics, and detailed reporting capabilities.',
    color: 'text-emerald-500',
    glowColor: 'rgba(16, 185, 129, 0.35)'
  },
  {
    icon: Cloud,
    title: 'Azure AI Integration',
    description: 'Powered by Microsoft Azure AI services for scalable, reliable, and accurate behavior detection.',
    color: 'text-purple-500',
    glowColor: 'rgba(147, 51, 234, 0.35)'
  },
  {
    icon: Security,
    title: 'Enterprise Security',
    description: 'Bank-level security with encrypted data transmission and Azure Active Directory integration.',
    color: 'text-rose-500',
    glowColor: 'rgba(244, 63, 94, 0.35)'
  },
  {
    icon: Notifications,
    title: 'Instant Alerts',
    description: 'Real-time notifications for drowsiness, phone usage, and overspeed incidents with customizable thresholds.',
    color: 'text-amber-500',
    glowColor: 'rgba(251, 191, 36, 0.35)'
  },
  {
    icon: Analytics,
    title: 'Advanced Analytics',
    description: 'Detailed behavior scoring, trend analysis, and exportable reports for fleet management insights.',
    color: 'text-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.35)'
  },
  {
    icon: Map,
    title: 'GPS Integration',
    description: 'Live location tracking with incident mapping and geofencing capabilities for complete fleet visibility.',
    color: 'text-teal-500',
    glowColor: 'rgba(20, 184, 166, 0.35)'
  },
  {
    icon: BatteryChargingFull,
    title: 'Battery Optimized',
    description: 'Smart power management with offline recording and automatic sync when connectivity is restored.',
    color: 'text-yellow-500',
    glowColor: 'rgba(250, 204, 21, 0.35)'
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features for Complete Safety
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with intuitive design 
            to deliver comprehensive driver monitoring solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -8,
                boxShadow: `0 10px 25px -5px ${feature.glowColor || 'rgba(6, 182, 212, 0.35)'}, 0 10px 10px -5px ${feature.glowColor || 'rgba(6, 182, 212, 0.2)'}`,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className={`feature-card text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative ${index % 3 === 0 ? 'glow-card-cyan' : index % 3 === 1 ? 'glow-card-purple' : 'glow-card-amber'}`}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <feature.icon className={`text-5xl ${feature.color} mb-4 mx-auto`} />
              </motion.div>
              
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}