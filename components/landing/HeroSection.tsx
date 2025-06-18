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
                ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.3) 0%, rgba(234, 88, 12, 0.3) 100%)'
                : 'linear-gradient(135deg, rgba(5, 150, 105, 0.3) 0%, rgba(4, 120, 87, 0.3) 100%)',
            borderRadius: '50%',
            top: element.startY,
            left: element.startX,
            boxShadow: element.id % 3 === 0 
              ? '0 0 20px rgba(6, 182, 212, 0.4)' 
              : element.id % 2 === 0
                ? '0 0 20px rgba(251, 146, 60, 0.3)'
                : '0 0 20px rgba(5, 150, 105, 0.3)',
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: isHovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
            scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Neural network connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        {floatingElements.map((element1, i) => {
          return floatingElements.slice(i + 1).map((element2, j) => {
            const opacity = (i + j) % 2 === 0 ? 0.2 : 0.15;
            return (
              <motion.line
                key={`line-${i}-${j}`}
                x1={element1.startX + element1.size / 2}
                y1={element1.startY + element1.size / 2}
                x2={element2.startX + element2.size / 2}
                y2={element2.startY + element2.size / 2}
                stroke="#06b6d4"
                strokeWidth={1}
                strokeOpacity={opacity}
                strokeDasharray="5,5"
                animate={{
                  strokeOpacity: [opacity, opacity * 2, opacity],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            )
          });
        })}
      </svg>

      {/* Interactive 3D Background Grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.4) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 70%)`,
        }}      
      />      
      
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
        <motion.div
          className="absolute w-[300px] h-[300px] border-2 border-emerald-400/20 rounded-full"
          animate={{ 
            scale: [1.2, 0.9, 1.2], 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Scanning lines */}
        <motion.div
          className="absolute w-[80%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          animate={{ 
            y: [-150, 150], 
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[1px] h-[80%] bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"
          animate={{ 
            x: [-150, 150], 
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Alert indicators */}
        {[...Array(3)].map((_, i) => (
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-20">
          {/* Left Column - Content */}
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
            <div className="mb-10 relative z-10">
              {/* Main Title with 3D effect and highlight */}
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white relative hero-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo/Branding Element */}
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <motion.div 
                    className="mr-3 flex items-center"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Security className="text-4xl text-cyan-400 mr-2" />
                  </motion.div>
                  <motion.div 
                    className="bg-clip-text"
                    animate={{
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                                      <motion.span
                                          className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text"
                                          style={{
                                              backgroundSize: "200% 200%"
                                          }}
                                          animate={{
                                              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                                          }}
                                          transition={{
                                              duration: 3,
                                              repeat: Infinity,
                                              ease: "linear"
                                          }}
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
              </motion.h1>
              
              {/* Tagline with AI monitoring theme */}
              <motion.div 
                className="mt-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="block text-2xl text-cyan-300 font-medium tracking-wide">Real-Time Driver Monitoring Platform</span>
                
                {/* Interactive indicators */}
                <div className="flex justify-center lg:justify-start items-center gap-2 mt-3">
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
                    <span className="text-sm text-emerald-400">Online</span>
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
            </div>
            
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.p 
                className="text-xl md:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
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
                      0 10px 30px rgba(8, 145, 178, 0.4),
                      inset 0 -3px 0 rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto lg:mx-0">
              {[
                {
                  icon: Visibility,
                  title: "Smart Monitoring",
                  description: "Real-time drowsiness detection",
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  icon: Speed,
                  title: "Behavior Analytics",
                  description: "Detect unsafe driving patterns",
                  color: "from-amber-500 to-orange-600"
                },
                {
                  icon: Security,
                  title: "Enhanced Safety",
                  description: "Reduce incidents by up to 60%",
                  color: "from-emerald-500 to-green-600"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="relative"
                  initial={{ opacity: 0, y: 20, rotateZ: -5 }}
                  animate={{ opacity: 1, y: 0, rotateZ: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.8, type: "spring" }}
                  whileHover={{
                    translateY: -10,
                    rotateZ: 0,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <motion.div
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 relative overflow-hidden shadow-xl"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(20px)",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`}
                      animate={{
                        opacity: [0.1, 0.15, 0.1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    <div className="flex items-start space-x-4 relative z-10">
                      <motion.div
                        className={`rounded-lg p-2 bg-gradient-to-br ${feature.color}`}
                        whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          boxShadow: "0 8px 16px -2px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <feature.icon className="text-white text-xl" />
                      </motion.div>
                      
                      <div>
                        <h3 className="font-bold text-white">{feature.title}</h3>
                        <p className="text-white/70 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="hidden lg:flex items-center justify-center mt-10 lg:mt-0"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden border-4 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {/* Glowing overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 mix-blend-overlay"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4] 
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <img 
                src="/driving.gif" 
                alt="AI Driver Monitoring in action" 
                className="w-full max-w-lg rounded-xl object-cover"
              />
              
              {/* Live indicator */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm text-white font-medium">LIVE</span>
              </div>

              {/* AI Analysis overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center text-cyan-300 text-sm mb-1">
                  <span className="mr-2">●</span>
                  <span className="font-mono">AI Analysis: Driver state normal</span>
                </div>
                <div className="flex space-x-2">
                  <motion.div 
                    className="h-1.5 flex-grow bg-gray-700/50 rounded-full overflow-hidden"
                    style={{ transformOrigin: "left" }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                      animate={{ width: ["20%", "80%", "40%", "60%", "20%"] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Safety Radar Effect */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <motion.div className="relative w-24 h-24">
          <motion.div
            className="absolute inset-0 border-2 border-emerald-400 rounded-full"            
            animate={{ 
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
            className="absolute inset-2 border border-amber-400 rounded-full"            
            animate={{ 
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
