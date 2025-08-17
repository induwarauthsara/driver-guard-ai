'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MessageCircle, Book, Video, Users, Clock, HelpCircle, FileText } from 'lucide-react';
import { useState } from 'react';
import Footer from '@/components/landing/Footer';

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportChannels = [
    {
      icon: <Phone className="w-8 h-8 text-green-600" />,
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      contact: "+94 11 234 5678",
      availability: "24/7 Emergency Support\nBusiness Hours: Mon-Fri 8AM-8PM IST"
    },
    {
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      title: "Email Support",
      description: "Get detailed assistance via email",
      contact: "support@driveguard.ai",
      availability: "Response within 4-6 hours\n24-hour response guarantee"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-purple-600" />,
      title: "Live Chat",
      description: "Instant help through our chat system",
      contact: "Available on website",
      availability: "Mon-Fri 8AM-8PM IST\nWeekends 10AM-4PM IST"
    },
    {
      icon: <Video className="w-8 h-8 text-red-600" />,
      title: "Video Support",
      description: "Screen sharing for complex issues",
      contact: "Scheduled Sessions",
      availability: "By appointment\nMon-Fri 9AM-5PM IST"
    }
  ];

  const faqCategories = [
    { id: 'general', name: 'General', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'installation', name: 'Installation', icon: <Users className="w-5 h-5" /> },
    { id: 'technical', name: 'Technical', icon: <Book className="w-5 h-5" /> },
    { id: 'billing', name: 'Billing', icon: <FileText className="w-5 h-5" /> }
  ];

  const faqs = {
    general: [
      {
        question: "How does DriveGuard AI work?",
        answer: "DriveGuard AI uses advanced computer vision and machine learning algorithms to monitor driver behavior in real-time, detecting signs of fatigue, distraction, and other safety risks."
      },
      {
        question: "Is my driving data secure?",
        answer: "Yes, we use end-to-end encryption and process most data locally on your device. We follow strict security protocols and comply with privacy regulations."
      },
      {
        question: "What vehicles are compatible?",
        answer: "DriveGuard AI is compatible with most vehicles manufactured after 2015. We support both consumer vehicles and commercial fleets."
      }
    ],
    installation: [
      {
        question: "How long does installation take?",
        answer: "Professional installation typically takes 30-45 minutes. DIY installation with our guided setup takes about 1 hour."
      },
      {
        question: "Do I need special tools for installation?",
        answer: "Our standard kit includes all necessary tools. For some vehicles, basic tools like a screwdriver may be needed."
      },
      {
        question: "Can I install it myself?",
        answer: "Yes! We provide detailed instructions and video guides. However, professional installation is recommended for optimal performance."
      }
    ],
    technical: [
      {
        question: "What happens if I lose internet connection?",
        answer: "The system continues to work offline, storing data locally. When connection is restored, data syncs automatically to the cloud."
      },
      {
        question: "How accurate are the AI predictions?",
        answer: "Our system has 95%+ accuracy for fatigue detection and 92%+ for distraction detection, with continuous improvements through machine learning."
      },
      {
        question: "Can I customize alert sensitivity?",
        answer: "Yes, you can adjust sensitivity levels for different types of alerts through the mobile app or web dashboard."
      }
    ],
    billing: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, bank transfers, and offer enterprise billing options for fleet customers."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel anytime. Your service continues until the end of your billing period with no early termination fees."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 30-day money-back guarantee for new subscriptions and prorated refunds for service issues."
      }
    ]
  };

  const resources = [
    {
      icon: <Book className="w-6 h-6 text-blue-600" />,
      title: "User Manual",
      description: "Complete guide to using DriveGuard AI",
      link: "#"
    },
    {
      icon: <Video className="w-6 h-6 text-red-600" />,
      title: "Video Tutorials",
      description: "Step-by-step installation and usage videos",
      link: "#"
    },
    {
      icon: <FileText className="w-6 h-6 text-green-600" />,
      title: "API Documentation",
      description: "Developer resources and integration guides",
      link: "#"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Community Forum",
      description: "Connect with other users and share experiences",
      link: "#"
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
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <HelpCircle className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Support Center</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Get the help you need to make the most of DriveGuard AI. Our support team is here to assist you 24/7.
              </p>
            </motion.div>

            {/* Support Channels */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Contact Our Support Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {supportChannels.map((channel, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex justify-center mb-4">{channel.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{channel.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{channel.description}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">{channel.contact}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs whitespace-pre-line">{channel.availability}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Emergency Support Banner */}
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-red-600 dark:text-red-400 mr-2" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">Emergency Support</h3>
              </div>
              <p className="text-red-700 dark:text-red-300">
                For critical safety issues or system failures, call our 24/7 emergency hotline: 
                <strong className="ml-2">+94 11 911 7233</strong>
              </p>
            </motion.div>

            {/* FAQ Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h2>
              
              {/* FAQ Categories */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {faqs[selectedCategory].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Resources Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Helpful Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.link}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors block"
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="flex justify-center mb-4">{resource.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{resource.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.section>

            {/* Contact Form Teaser */}
            <motion.div
              className="mt-12 bg-blue-50 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Still Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Cannot find the answer you are looking for? Our support team is ready to help you with any questions or issues.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support Team
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      </main>
      <Footer />
    </>
  );
}
