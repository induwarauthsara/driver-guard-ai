'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Check from '@mui/icons-material/Check';

const plans = [
  {
    name: 'Starter',
    price: 29,
    period: 'per vehicle/month',
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative feature-card ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
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

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/login"
                className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                Get Started
              </Link>
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