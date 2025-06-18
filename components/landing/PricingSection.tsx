'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Check from '@mui/icons-material/Check';

const plans = [
  {
    name: 'Starter',
    price: 29,
    period:                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.popular && (
                    <motion.div 
                      className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-300"
                      animate={{
                        opacity: [0.5, 0.7, 0.5]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  )}
                  <Link
                    href="/auth/login"
                    className={`relative block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white hover:shadow-md'
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>onth',
    description: 'Perfect for small fleets and individual drivers',
    features: [
      'Real-time drowsiness detection',
      'Basic phone usage alerts',
      'Speed monitoring',
      'Mobile app access',
      'Email support',
      'Basic reporting'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 59,
    period: 'per vehicle/month',
    description: 'Advanced features for growing fleets',
    features: [
      'All Starter features',
      'Advanced AI analytics',
      'Custom alert thresholds',
      'Admin dashboard',
      'GPS tracking & mapping',
      'Priority support',
      'Advanced reporting',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'per vehicle/month',
    description: 'Complete solution for large organizations',
    features: [
      'All Professional features',
      'Multi-language support',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom training',
      'SLA guarantee',
      'White-label options'
    ],
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your fleet size and requirements. 
            All plans include our core AI safety features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -10,
                boxShadow: plan.popular 
                  ? "0 15px 30px rgba(6, 182, 212, 0.4)" 
                  : "0 15px 30px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
              className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 ${
                plan.popular 
                  ? 'ring-2 ring-cyan-500 shadow-cyan-500/20 z-10 scale-105 md:scale-110 pricing-card-popular' 
                  : 'pricing-card'
              }`}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ y: -10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div className="relative">
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-70 blur-md"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    <motion.span 
                      className="relative block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 rgba(6, 182, 212, 0.3)",
                          "0 0 15px rgba(6, 182, 212, 0.6)",
                          "0 0 0 rgba(6, 182, 212, 0.3)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      Most Popular
                    </motion.span>
                  </motion.div>
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {plan.description}
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <motion.ul
                className="space-y-3 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3, staggerChildren: 0.1 }}
                viewport={{ once: true }}
              >
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: featureIndex * 0.05 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="text-emerald-500 mr-3 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/auth/login"
                    className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white hover:shadow-md'
                    }`}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Need a custom solution? Contact our sales team for enterprise pricing.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact Sales →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}