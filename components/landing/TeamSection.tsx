'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Twitter from '@mui/icons-material/Twitter';
import GitHub from '@mui/icons-material/GitHub';

const team = [
  {
    name: 'Induwara Uthsara',
    role: 'System Architect & Code Wizard',
    image: '/induwara.png',
    bio: 'The entire web platform, from interface to backend — crafted into a fully working system.',
    expertise: ['Frontend Sorcery', 'Backend Wizardry', 'Web Application Architect'],
        funFact: 'First-year tech enthusiast at UCSC who builds full systems while others draft ideas.',
    social: {
      linkedin: 'https://www.linkedin.com/in/induwarauthsara/',
      web: 'https://induwara.dev/',
      github: 'https://github.com/induwarauthsara'
    }
  },
  {
    name: 'Sashik Thiwanka',
    role: 'Idea Alchemist & Solution Craftsman',
    image: '/sashik.jpg',
    bio: 'The mastermind behind DriverGuard - transforming "what ifs" into "what is" since day one.',
    expertise: ['Concept Development', 'Software Engineering', 'Problem Solving'],
    funFact: 'First-year UCSC student who sketches algorithms while others sketch doodles',
    social: {
      linkedin: 'https://www.linkedin.com/in/sashikdevx/',
      web: 'https://www.credly.com/users/sashik-thivanka',
      github: '#'
    }
  },
  {
    name: 'Fathima Nahla',
    role: 'AI Whisperer & Algorithm Artisan',
    image: '/nahla.jpg',
    bio: 'Teaching machines to see the road ahead. Makes neural networks do party tricks.',
    expertise: ['AI Magic', 'Machine Learning', 'Computer Vision'],
    funFact: 'First-year tech prodigy at UCSC who talks to computers more than humans',
    social: {
      linkedin: '#',
      twitter: '#',
      github: 'nahlaishfaq2005'
    }
  }
];

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300 inline-block mb-4"
          >
            The Innovation Team
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Creative Minds
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Rising talents from the University of Colombo School of Computing, 
            turning their fresh perspectives into groundbreaking innovation.
          </p>
        </motion.div>        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
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
              onHoverEnd={() => setHoveredIndex(-1)}
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
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {member.bio}
                    </p>
                    
                    {/* Fun fact with glow effect */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.45, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="mb-4 relative"
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-lg -z-10"
                        animate={{ 
                          boxShadow: [
                            "0 0 0 rgba(6, 182, 212, 0.1)",
                            "0 0 8px rgba(6, 182, 212, 0.3)",
                            "0 0 0 rgba(6, 182, 212, 0.1)"
                          ]
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                      <p className="text-amber-600 dark:text-amber-400 text-xs italic font-medium py-1 px-2">
                        ✨ {member.funFact}
                      </p>
                    </motion.div>
                    
                    {/* Expertise tags */}
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {member.expertise.map((skill, idx) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 + (idx * 0.1), duration: 0.4 }}
                          viewport={{ once: true }}
                          className="inline-block px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-100 to-indigo-100 text-cyan-800 dark:from-cyan-900 dark:to-indigo-900 dark:text-cyan-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                    {/* Social icons with hover effects */}
                  <motion.div 
                    className="flex justify-center space-x-4 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div className="relative group">
                      <motion.div 
                        className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600/20 to-blue-800/20 blur-sm"
                        animate={{ scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative block"
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.3 }
                        }}
                        aria-label="LinkedIn"
                      >
                        <LinkedIn />
                      </motion.a>
                    </motion.div>
                    
                    <motion.div className="relative group">
                      <motion.div 
                        className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-sm"
                        animate={{ scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors relative block"
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.3 }
                        }}
                        aria-label="Twitter"
                      >
                        <Twitter />
                      </motion.a>
                    </motion.div>
                    
                    <motion.div className="relative group">
                      <motion.div 
                        className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gray-600/20 to-black/20 blur-sm dark:from-gray-300/20 dark:to-white/20"
                        animate={{ scale: [0.8, 1.1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                      <motion.a
                        href={member.social.github}
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative block"
                        whileHover={{ 
                          scale: 1.3, 
                          rotate: [0, 10, -10, 0],
                          transition: { duration: 0.3 }
                        }}
                        aria-label="GitHub"
                      >
                        <GitHub />
                      </motion.a>
                    </motion.div>
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
