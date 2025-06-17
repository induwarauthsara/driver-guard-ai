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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="feature-card text-center"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                {member.role}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-3">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}