'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Security from '@mui/icons-material/Security';
import Visibility from '@mui/icons-material/Visibility';
import Speed from '@mui/icons-material/Speed';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const floatingElements = [
    { id: 1, size: 60, delay: 0, duration: 6 },
    { id: 2, size: 80, delay: 1, duration: 8 },
    { id: 3, size: 40, delay: 2, duration: 7 },
    { id: 4, size: 70, delay: 3, duration: 9 },
    { id: 5, size: 50, delay: 4, duration: 5 },
  ];
  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="hero-section relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating 3D Elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            width: element.size,
            height: element.size,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
            borderRadius: '50%',
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, 100, -50, 150, 0],
            y: [0, -150, 100, -100, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
        />
      ))}

      {/* Interactive 3D Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Title with Depth */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 relative"
            whileHover={{ scale: 1.05 }}
            style={{
              textShadow: `
                0 0 20px rgba(59, 130, 246, 0.5),
                0 0 40px rgba(59, 130, 246, 0.3),
                0 0 60px rgba(59, 130, 246, 0.1)
              `,
              transform: "translateZ(50px)",
            }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #60a5fa, #3b82f6, #ffffff)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI-Powered Driver
            </motion.span>
            <span className="block text-yellow-300 drop-shadow-lg">Safety Monitoring</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            style={{ transform: "translateZ(30px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Real-time drowsiness detection, phone usage monitoring, and speed analysis 
            to keep your fleet safe on the road.
          </motion.p>

          {/* 3D Interactive Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            style={{ transform: "translateZ(40px)" }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotateY: 5,
                rotateX: -5,
                z: 50 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                href="/auth/login?role=driver"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  boxShadow: `
                    0 10px 30px rgba(59, 130, 246, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <PlayArrow />
                Try Driver Demo
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotateY: -5,
                rotateX: 5,
                z: 50 
              }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                href="/auth/login?role=admin"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  boxShadow: `
                    0 10px 30px rgba(255, 255, 255, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2)
                  `
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                />
                <Security />
                Admin Dashboard
              </Link>
            </motion.div>
          </motion.div>

          {/* 3D Interactive Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Visibility,
                title: "Drowsiness Detection",
                description: "AI monitors eye closure and yawning patterns",
                color: "from-yellow-400 to-orange-500",
                delay: 0.2
              },
              {
                icon: Security,
                title: "Phone Usage Alert", 
                description: "Detects distracted driving behaviors",
                color: "from-green-400 to-blue-500",
                delay: 0.4
              },
              {
                icon: Speed,
                title: "Speed Monitoring",
                description: "GPS-based overspeed detection and alerts",
                color: "from-purple-400 to-pink-500",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ 
                  y: -10,
                  rotateX: 10,
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                }}
                className="relative group cursor-pointer"
              >
                {/* Card Background with Gradient */}
                <div className="glass-effect p-6 rounded-lg relative overflow-hidden backdrop-blur-md border border-white/20">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    animate={{
                      background: [
                        `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`,
                        `linear-gradient(225deg, transparent, rgba(255,255,255,0.1), transparent)`,
                        `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* 3D Icon */}
                  <motion.div
                    className="relative z-10"
                    whileHover={{ 
                      scale: 1.2, 
                      rotateY: 360,
                      transition: { duration: 0.6 }
                    }}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} p-3 shadow-lg`}>
                      <feature.icon className="text-white text-4xl w-full h-full" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div 
                    className="relative z-10"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">
                      {feature.description}
                    </p>
                  </motion.div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-white/30 transition-all duration-300"
                    whileHover={{
                      boxShadow: `
                        0 0 30px rgba(59, 130, 246, 0.3),
                        inset 0 0 30px rgba(255, 255, 255, 0.1)
                      `
                    }}
                  />
                </div>

                {/* Floating Particles */}
                {[...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                    style={{
                      top: `${20 + particleIndex * 20}%`,
                      right: `${10 + particleIndex * 15}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + particleIndex * 0.5,
                      repeat: Infinity,
                      delay: particleIndex * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Cursor Effect */}
      {isHovered && (
        <motion.div
          className="fixed pointer-events-none z-50 w-6 h-6 bg-blue-400/50 rounded-full mix-blend-screen"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      )}
    </section>
  );
}