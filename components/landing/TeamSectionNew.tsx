'use client';

import { useState } from 'react';
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
    expertise: ['AI Engineering', 'Machine Learning', 'Business Strategy'],
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
    expertise: ['Computer Vision', 'Azure Cloud', 'System Architecture'],
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
    expertise: ['Deep Learning', 'Computer Vision', 'Research'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  },
  {
    name: 'James Wilson',
    role: 'Lead Software Engineer',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Full-stack developer with expertise in real-time data processing and mobile applications.',
    expertise: ['Full-stack Development', 'Mobile Apps', 'Real-time Processing'],
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  }
];

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 inline-block mb-4"
          >
            The Experts
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Leadership Team
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our diverse team of experts brings decades of combined experience in AI, 
            computer vision, and vehicle safety systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="team-card team-card-glow bg-white dark:bg-gray-800 rounded-xl p-5 transition-all duration-300 relative"
            >
              {/* Background pattern */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl z-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              />
              
              {/* Pattern overlay */}
              <motion.div 
                className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-5 z-0 rounded-xl"
                animate={{
                  backgroundPosition: ['0px 0px', '20px 20px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
              />
              
              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  {/* Avatar with animated border */}
                  <motion.div 
                    className="mb-5 relative interactive-avatar"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-28 h-28 rounded-full overflow-hidden relative z-10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Hover overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-cyan-500/50 to-blue-500/50 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    {/* Animated pulse ring */}
                    <motion.div 
                      className="absolute -inset-1 rounded-full z-0"
                      animate={{
                        boxShadow: hoveredIndex === index 
                          ? [
                              '0 0 0 2px rgba(6, 182, 212, 0.3)', 
                              '0 0 0 4px rgba(6, 182, 212, 0.2)', 
                              '0 0 0 2px rgba(6, 182, 212, 0.3)'
                            ]
                          : '0 0 0 2px rgba(6, 182, 212, 0.2)',
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    
                    <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">
                      {member.role}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {member.bio}
                    </p>
                    
                    {/* Expertise tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.expertise.map((skill, idx) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 + (idx * 0.1), duration: 0.4 }}
                          viewport={{ once: true }}
                          className="inline-block px-2 py-1 text-xs rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Social icons with hover effects */}
                  <motion.div 
                    className="flex justify-center space-x-3 mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.3 }
                      }}
                      aria-label="LinkedIn"
                    >
                      <LinkedIn />
                    </motion.a>
                    <motion.a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.3 }
                      }}
                      aria-label="Twitter"
                    >
                      <Twitter />
                    </motion.a>
                    <motion.a
                      href={member.social.github}
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, 10, -10, 0],
                        transition: { duration: 0.3 }
                      }}
                      aria-label="GitHub"
                    >
                      <GitHub />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
