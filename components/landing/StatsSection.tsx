'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { label: 'Drivers Monitored', value: 50000, suffix: '+' },
  { label: 'Incidents Prevented', value: 12500, suffix: '+' },
  { label: 'Fleet Partners', value: 250, suffix: '+' },
  { label: 'Detection Accuracy', value: 98.5, suffix: '%' }
];

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Our AI-powered platform has helped thousands of drivers and fleet managers 
            improve road safety and reduce incidents.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  delay: index * 0.15
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/20"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ 
                  scale: [0.5, 1.2, 1],
                  opacity: [0, 1, 1]
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15 + 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2"
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={3000} />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-white/90 font-medium"
              >
                {stat.label}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}