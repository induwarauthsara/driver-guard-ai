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
    color: 'text-blue-500'
  },
  {
    icon: Dashboard,
    title: 'Admin Dashboard',
    description: 'Comprehensive monitoring dashboard with live incident feeds, analytics, and detailed reporting capabilities.',
    color: 'text-green-500'
  },
  {
    icon: Cloud,
    title: 'Azure AI Integration',
    description: 'Powered by Microsoft Azure AI services for scalable, reliable, and accurate behavior detection.',
    color: 'text-purple-500'
  },
  {
    icon: Security,
    title: 'Enterprise Security',
    description: 'Bank-level security with encrypted data transmission and Azure Active Directory integration.',
    color: 'text-red-500'
  },
  {
    icon: Notifications,
    title: 'Instant Alerts',
    description: 'Real-time notifications for drowsiness, phone usage, and overspeed incidents with customizable thresholds.',
    color: 'text-orange-500'
  },
  {
    icon: Analytics,
    title: 'Advanced Analytics',
    description: 'Detailed behavior scoring, trend analysis, and exportable reports for fleet management insights.',
    color: 'text-indigo-500'
  },
  {
    icon: Map,
    title: 'GPS Integration',
    description: 'Live location tracking with incident mapping and geofencing capabilities for complete fleet visibility.',
    color: 'text-teal-500'
  },
  {
    icon: BatteryChargingFull,
    title: 'Battery Optimized',
    description: 'Smart power management with offline recording and automatic sync when connectivity is restored.',
    color: 'text-yellow-500'
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="feature-card text-center"
            >
              <feature.icon className={`text-5xl ${feature.color} mb-4 mx-auto`} />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}