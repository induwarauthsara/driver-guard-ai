'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Server, Key, AlertTriangle } from 'lucide-react';
import Footer from '@/components/landing/Footer';

export default function Security() {
  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: "End-to-End Encryption",
      description: "All data transmission is protected with AES-256 encryption, ensuring your driving data remains secure in transit."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Local Processing",
      description: "Critical AI analysis happens on-device whenever possible, minimizing sensitive data transmission to our servers."
    },
    {
      icon: <Server className="w-8 h-8 text-purple-600" />,
      title: "Secure Cloud Infrastructure",
      description: "Our cloud services run on enterprise-grade infrastructure with 24/7 monitoring and automated security updates."
    },
    {
      icon: <Key className="w-8 h-8 text-orange-600" />,
      title: "Access Control",
      description: "Multi-factor authentication and role-based access ensure only authorized personnel can access your data."
    },
    {
      icon: <Eye className="w-8 h-8 text-cyan-600" />,
      title: "Privacy by Design",
      description: "We collect only necessary data and provide granular controls over what information is shared and stored."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      title: "Incident Response",
      description: "Rapid response team with 24/7 monitoring to detect and respond to any security incidents immediately."
    }
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Shield className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Security & Trust</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Your safety and privacy are our top priorities. Learn how we protect your data and ensure the security of our AI-powered driver monitoring system.
              </p>
            </motion.div>

            {/* Security Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">{feature.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Detailed Security Information */}
            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Protection Standards</h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>SOC 2 Type II Compliant:</strong> Our security controls are audited annually by independent third parties</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>GDPR Ready:</strong> Full compliance with European data protection regulations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>ISO 27001:</strong> International standard for information security management systems</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span><strong>CCPA Compliant:</strong> California Consumer Privacy Act compliance for US users</span>
                    </li>
                  </ul>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Technical Security Measures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Infrastructure Security</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• AWS/Azure enterprise-grade cloud hosting</li>
                      <li>• DDoS protection and firewall security</li>
                      <li>• Regular penetration testing</li>
                      <li>• Automated vulnerability scanning</li>
                      <li>• Secure development lifecycle (SDLC)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Data Security</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                      <li>• AES-256 encryption at rest and in transit</li>
                      <li>• Database encryption and access logging</li>
                      <li>• Secure key management system</li>
                      <li>• Data anonymization techniques</li>
                      <li>• Regular security backups</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Incident Response</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  In the unlikely event of a security incident, our response team follows a comprehensive protocol:
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 dark:text-red-300 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Detection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">24/7 monitoring systems detect anomalies</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 dark:text-red-300 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Response</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Immediate containment and assessment</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 dark:text-red-300 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Notification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Users and authorities notified within 72 hours</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 dark:text-red-300 font-bold">4</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Recovery</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">System restoration and prevention measures</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Contact</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you discover a security vulnerability or have security concerns, please contact our security team immediately:
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Security Team</h4>
                      <p className="text-gray-700 text-sm">
                        <strong>Email:</strong> security@driveguard.ai<br />
                        <strong>PGP Key:</strong> Available on request<br />
                        <strong>Response Time:</strong> Within 24 hours
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Bug Bounty Program</h4>
                      <p className="text-gray-700 text-sm">
                        We reward responsible disclosure of security vulnerabilities. Contact us for details about our bug bounty program.
                      </p>
                    </div>
                  </div>
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
