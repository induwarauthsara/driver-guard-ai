'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/landing/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              <motion.h1 
                className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Privacy Policy
              </motion.h1>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Last updated: August 17, 2025
              </motion.p>

              <div className="prose prose-lg max-w-none space-y-6">
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    DriveGuard AI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered driver monitoring service.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">Personal Information</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li>Name, email address, and contact information</li>
                      <li>Account credentials and profile information</li>
                      <li>Payment and billing information</li>
                    </ul>
                    
                    <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mt-6">Driving Data</h3>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                      <li>Vehicle telemetry and performance data</li>
                      <li>Driving behavior patterns and safety metrics</li>
                      <li>Location data for trip analysis</li>
                      <li>Camera and sensor data for AI analysis (processed locally when possible)</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                    <li>Provide and improve our driver safety monitoring services</li>
                    <li>Generate safety insights and personalized recommendations</li>
                    <li>Send safety alerts and notifications</li>
                    <li>Process payments and manage your account</li>
                    <li>Comply with legal obligations and safety regulations</li>
                    <li>Conduct research to improve road safety (anonymized data only)</li>
                  </ul>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We implement industry-standard security measures to protect your data, including end-to-end encryption, secure data storage, and regular security audits. Camera and sensor data is processed locally on your device whenever possible to minimize data transmission.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                    <li>Access and review your personal data</li>
                    <li>Correct or update inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt-out of non-essential data collection</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Email:</strong> privacy@driveguard.ai<br />
                      <strong>Address:</strong> DriveGuard AI Privacy Office<br />
                      No. 45, Galle Road, Colombo 03, Sri Lanka
                    </p>
                  </div>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
