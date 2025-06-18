'use client';

import { motion } from 'framer-motion';
import LocationOn from '@mui/icons-material/LocationOn';
import School from '@mui/icons-material/School';
import Code from '@mui/icons-material/Code';
import Psychology from '@mui/icons-material/Psychology';
import GitHub from '@mui/icons-material/GitHub';

export default function ContactSection() {

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h2>          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interested in our driver monitoring technology? We're just a message away!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <LocationOn className="text-cyan-600 text-5xl" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Find Us
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-300 text-lg"
              >
                Colombo, Sri Lanka
              </motion.p>
            </div>

            <motion.hr 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="border-t border-gray-200 dark:border-gray-700 my-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <motion.div 
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-3"
                >
                  <School className="text-cyan-600 text-3xl" />
                </motion.div>
                <p className="font-medium text-gray-900 dark:text-white">Institution</p>
                <p className="text-gray-600 dark:text-gray-300">University of Colombo School of Computing</p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-3"
                >
                  <Code className="text-cyan-600 text-3xl" />
                </motion.div>
                <p className="font-medium text-gray-900 dark:text-white">Project Type</p>
                <p className="text-gray-600 dark:text-gray-300">AI-Powered Driver Monitoring System</p>
              </motion.div>

              <motion.div 
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-3"
                >
                  <Psychology className="text-cyan-600 text-3xl" />
                </motion.div>
                <p className="font-medium text-gray-900 dark:text-white">Academic Year</p>
                <p className="text-gray-600 dark:text-gray-300">First Year Undergraduate Project</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mt-10"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHub className="text-xl" />
                <span>View on GitHub</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
