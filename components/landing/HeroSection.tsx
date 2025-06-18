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
  const [typingIndex, setTypingIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const fullText = "Real-time drowsiness detection, phone usage monitoring, and speed analysis to keep your fleet safe on the road.";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typingIndex < fullText.length) {
        setTypingIndex(typingIndex + 1);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [typingIndex, fullText.length]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
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
    { id: 1, size: 60, delay: 0, duration: 6, startX: 100, startY: 200 },
    { id: 2, size: 80, delay: 1, duration: 8, startX: 250, startY: 150 },
    { id: 3, size: 40, delay: 2, duration: 7, startX: 400, startY: 300 },
    { id: 4, size: 70, delay: 3, duration: 9, startX: 550, startY: 100 },
    { id: 5, size: 50, delay: 4, duration: 5, startX: 700, startY: 250 },
    { id: 6, size: 35, delay: 2.5, duration: 6.5, startX: 300, startY: 350 },
    { id: 7, size: 55, delay: 1.5, duration: 7.5, startX: 800, startY: 180 },
  ];
  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="hero-section relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating 3D Elements - AI Neural Network Nodes */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            width: element.size,
            height: element.size,
            background: element.id % 3 === 0 
              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(8, 145, 178, 0.4) 100%)' 
              : element.id % 2 === 0
              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(249, 115, 22, 0.3) 100%)'
              : 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.3) 100%)',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            boxShadow: element.id % 2 === 0 
              ? '0 0 20px rgba(251, 146, 60, 0.3)' 
              : '0 0 20px rgba(6, 182, 212, 0.3)',
          }}
          animate={{
            x: [0, 120, -60, 180, 0],
            y: [0, -180, 120, -120, 0],
            scale: [1, 1.3, 0.7, 1.2, 1],
            rotate: [0, 180, 360, 180, 0],
            opacity: [0.3, 0.8, 0.3, 0.6, 0.3],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}          initial={{
            x: element.startX,
            y: element.startY,
          }}
        />
      ))}

      {/* AI Network Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${(i * 15) % 100}%`}
            y1={`${(i * 20) % 100}%`}
            x2={`${((i + 3) * 15) % 100}%`}
            y2={`${((i + 3) * 20) % 100}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Interactive 3D Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.4) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)`,
        }}      />      
      {/* AI Monitoring Interactive Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Circular radar animation */}
        <motion.div
          className="absolute w-[500px] h-[500px] border-2 border-cyan-400/30 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] border border-amber-400/20 rounded-full"
          animate={{ 
            scale: [1.1, 1, 1.1], 
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Driver monitoring indicators */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={`indicator-${i}`}
            className="absolute w-3 h-3 rounded-full bg-emerald-400/70"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
            style={{
              left: `${30 + i * 10}%`,
              top: `${35 + (i % 3) * 10}%`
            }}
          />
        ))}
        
        {/* Safety alert pulses */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={`alert-${i}`}
            className="absolute w-4 h-4 rounded-full bg-amber-500/70"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
            style={{
              right: `${25 + i * 15}%`,
              top: `${30 + (i % 3) * 15}%`
            }}
          />
        ))}
      </div>      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
          {/* 3D Title with Depth */}          <div className="mb-10 relative z-10">
            {/* Main Title with 3D effect and highlight */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white relative hero-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo/Branding Element */}
              <div className="flex items-center justify-center mb-2">
                <motion.div                  className="w-14 h-14 mr-4 bg-cyan-600/80 rounded-xl flex items-center justify-center relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 5
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-blue-700"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <Security className="text-white w-8 h-8 relative z-10" />
                </motion.div>
                
                <div className="text-left">
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.03 }}
                  >
                    <motion.span
                      className="text-white text-5xl md:text-6xl font-extrabold"
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(6, 182, 212, 0.5)",
                          "0 0 20px rgba(6, 182, 212, 0.7)",
                          "0 0 10px rgba(6, 182, 212, 0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      DriverGuard
                    </motion.span>
                    <motion.span 
                      className="ml-3 text-amber-400 font-black relative"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ display: "inline-block" }}
                    >
                      AI
                    </motion.span>
                  </motion.div>
                </div>
              </div>
              
              {/* Tagline with AI monitoring theme */}
              <motion.div 
                className="mt-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="block text-2xl text-cyan-300 font-medium tracking-wide">Real-Time Driver Monitoring Platform</span>
                
                {/* Interactive indicators */}
                <div className="flex justify-center items-center gap-2 mt-3">
                  <motion.div 
                    className="flex items-center px-3 py-1 border border-emerald-500/30 rounded-full bg-emerald-900/20"
                    whileHover={{ scale: 1.05 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 rgba(16, 185, 129, 0)", 
                        "0 0 10px rgba(16, 185, 129, 0.5)", 
                        "0 0 0 rgba(16, 185, 129, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
                    <span className="text-sm text-emerald-400">Safety</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-900/20"
                    whileHover={{ scale: 1.05 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 rgba(6, 182, 212, 0)", 
                        "0 0 10px rgba(6, 182, 212, 0.5)", 
                        "0 0 0 rgba(6, 182, 212, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></div>
                    <span className="text-sm text-cyan-400">AI Monitoring</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center px-3 py-1 border border-amber-500/30 rounded-full bg-amber-900/20"
                    whileHover={{ scale: 1.05 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 0 rgba(251, 191, 36, 0)", 
                        "0 0 10px rgba(251, 191, 36, 0.5)", 
                        "0 0 0 rgba(251, 191, 36, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></div>
                    <span className="text-sm text-amber-400">Driving</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.h1>
          </div>
            <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.p 
              className="text-xl md:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-light"
              style={{ transform: "translateZ(30px)" }}
            >
              <span className="text-cyan-300 font-medium">{">"}</span>{" "}
              {fullText.substring(0, typingIndex)}
              <motion.span 
                className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.p>
          </motion.div>

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
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
                style={{
                  boxShadow: `
                    0 10px 30px rgba(6, 182, 212, 0.4),
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
          </motion.div>          {/* 3D Interactive Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto lg:max-w-none">
            {[
              {
                icon: Visibility,
                title: "Drowsiness Detection",
                description: "AI monitors eye closure and yawning patterns",
                color: "from-amber-500 to-orange-600",
                delay: 0.2
              },
              {
                icon: Security,
                title: "Phone Usage Alert", 
                description: "Detects distracted driving behaviors",
                color: "from-emerald-500 to-teal-600",
                delay: 0.4
              },
              {
                icon: Speed,
                title: "Speed Monitoring",
                description: "GPS-based overspeed detection and alerts",
                color: "from-cyan-500 to-blue-600",
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
                      rotate: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
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
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 group-hover:text-white transition-colors">
                      {feature.description}
                    </p>
                  </motion.div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-300"
                    whileHover={{
                      boxShadow: `
                        0 0 30px rgba(6, 182, 212, 0.4),
                        inset 0 0 30px rgba(255, 255, 255, 0.1)
                      `
                    }}
                  />
                </div>

                {/* Floating Particles */}
                {[...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
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
      </div>      {/* Interactive Cursor Effect */}
      {isHovered && (
        <motion.div
          className="fixed pointer-events-none z-50 w-8 h-8 border-2 border-cyan-400/60 rounded-full mix-blend-screen cursor-effect"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.5, 0.7, 1, 0.7, 0.5],
            scale: [1, 1.2, 1.4, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* AI Brain Visualization */}
      <div className="absolute top-10 right-10 opacity-20">        <motion.div
          className="relative w-32 h-32"
          animate={{ 
            rotateY: [0, 180, 360, 180, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Brain outline */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M30 20 Q20 10, 35 10 Q50 5, 65 10 Q80 10, 70 20 Q75 35, 70 50 Q75 65, 65 75 Q50 80, 35 75 Q20 65, 25 50 Q20 35, 30 20"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="1.5"
              strokeDasharray="2,2"
            />
            <defs>
              <linearGradient id="brainGradient">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            {/* Neural connections */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={30 + i * 8}
                cy={30 + (i % 2) * 20}
                r="1.5"
                fill="#06b6d4"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Safety Radar Effect */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <motion.div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 border-2 border-emerald-400 rounded-full"            animate={{ 
              scale: [1, 1.5, 2, 1.5, 1],
              opacity: [0.8, 0.4, 0, 0.4, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-2 border border-amber-400 rounded-full"            animate={{ 
              scale: [1, 1.25, 1.5, 1.25, 1],
              opacity: [0.6, 0.3, 0, 0.3, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
          <div className="absolute inset-4 bg-cyan-400 rounded-full animate-pulse" />
        </motion.div>
      </div>

      {/* 3D Vehicle Safety Indicator */}
      <div className="absolute bottom-20 right-20 opacity-40 pointer-events-none">
        <motion.div
          className="w-32 h-12 relative"
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Vehicle outline */}
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <motion.path
              d="M10,35 L20,20 L70,20 L85,35 L90,35 C95,35 95,40 90,40 L85,40 L80,40 C80,45 75,45 75,40 L35,40 C35,45 30,45 30,40 L10,40 C5,40 5,35 10,35 Z"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Driver */}
            <motion.circle
              cx="50"
              cy="30"
              r="5"
              fill="#f59e0b"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                fill: ["#f59e0b", "#06b6d4", "#f59e0b"] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Scanning line */}
            <motion.line
              x1="35"
              y1="30"
              x2="65"
              y2="30"
              stroke="#06b6d4"
              strokeWidth="0.5"
              strokeDasharray="2,2"
              animate={{ 
                y1: [25, 35, 25],
                y2: [25, 35, 25],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Wheels */}
            <circle cx="30" cy="40" r="5" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
            <circle cx="75" cy="40" r="5" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
          </svg>
          
          {/* AI Monitoring beams */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16">
              <motion.div 
                className="w-full h-full rounded-full border border-cyan-400/20"
                animate={{ 
                  scale: [0, 1.5], 
                  opacity: [0.8, 0] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}