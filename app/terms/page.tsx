'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/landing/Footer';

export default function TermsOfService() {
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
              Terms of Service
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
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing and using DriveGuard AI services, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service govern your use of our AI-powered driver monitoring system.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Service Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  DriveGuard AI provides AI-powered driver monitoring and safety analytics services, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Real-time driver behavior monitoring</li>
                  <li>Fatigue and distraction detection</li>
                  <li>Safety scoring and analytics</li>
                  <li>Alert and notification systems</li>
                  <li>Fleet management tools (for commercial users)</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Ensure proper installation and calibration of monitoring equipment</li>
                  <li>Maintain equipment in good working condition</li>
                  <li>Use the service in compliance with local traffic laws and regulations</li>
                  <li>Keep account information secure and confidential</li>
                  <li>Report any technical issues or safety concerns promptly</li>
                  <li>Not attempt to circumvent or interfere with system functionality</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200 font-semibold">Important Safety Notice:</p>
                  <p className="text-yellow-700 dark:text-yellow-300 mt-2">
                    DriveGuard AI is a monitoring and assistance system. It does not replace the need for safe driving practices, attention, and compliance with traffic laws. The driver remains fully responsible for vehicle operation and safety.
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Our service is provided on an &ldquo;as is&rdquo; basis</li>
                  <li>We do not guarantee 100% accuracy of AI predictions or alerts</li>
                  <li>Users are responsible for maintaining safe driving practices</li>
                  <li>DriveGuard AI is not liable for accidents, injuries, or damages</li>
                  <li>Our liability is limited to the amount paid for services</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Subscription and Payment</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                  <li>Subscription fees are billed monthly or annually as selected</li>
                  <li>Prices are subject to change with 30 days notice</li>
                  <li>Refunds are provided according to our refund policy</li>
                  <li>Service may be suspended for non-payment</li>
                  <li>Cancellation takes effect at the end of the billing period</li>
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data and Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your use of our services is also governed by our Privacy Policy. We collect and process driving data to provide safety services. By using DriveGuard AI, you consent to data collection and processing as described in our Privacy Policy.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Termination</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may terminate or suspend your account and access to services immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> legal@driveguard.ai<br />
                    <strong>Phone:</strong> +94 11 234 5678<br />
                    <strong>Address:</strong> DriveGuard AI Legal Department<br />
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
