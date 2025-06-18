'use client';

import { motion } from 'framer-motion';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Twitter from '@mui/icons-material/Twitter';
import GitHub from '@mui/icons-material/GitHub';

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former Tesla AI engineer with 10+ years in autonomous vehicle technology.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    image: 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Microsoft Azure MVP and expert in computer vision and machine learning.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'Dr. Priya Patel',
    role: 'Head of AI Research',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'PhD in Computer Vision from Stanford, published researcher in driver behavior analysis.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'James Wilson',
    role: 'VP of Engineering',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former Google engineer specializing in real-time systems and cloud architecture.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our team combines decades of experience in AI, automotive technology, 
            and safety systems to deliver cutting-edge solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 70,
                  damping: 14,
                  delay: index * 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
            >
              <motion.div 
                className="relative mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-cyan-100 dark:border-cyan-900"
                />
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(6, 182, 212, 0)",
                      "0 0 0 4px rgba(6, 182, 212, 0.3)",
                      "0 0 0 0 rgba(6, 182, 212, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: index * 0.7
                  }}
                />
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {member.name}
              </motion.h3>
              
              <motion.p 
                className="text-cyan-600 dark:text-cyan-400 font-medium mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {member.role}
              </motion.p>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                {member.bio}
              </motion.p>
              
              <motion.div 
                className="flex justify-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 + 0.7, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href={member.social.linkedin}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <LinkedIn />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter />
                </a>
                <a
                  href={member.social.github}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <GitHub />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}