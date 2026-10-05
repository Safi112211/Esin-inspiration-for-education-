import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface LogoProps {
  className?: string;
  showSlogan?: boolean;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "h-10", showSlogan = false, variant = 'light' }: LogoProps) {
  const primaryColor = variant === 'light' ? '#5A9A8E' : '#E2E8E7';
  const secondaryColor = variant === 'light' ? '#1A3636' : '#5A9A8E';
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 cursor-pointer perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ rotateX, rotateY }}
    >
      <div className="relative h-full aspect-[200/120] shrink-0">
        {/* Glow effect behind logo */}
        <div 
          className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />
        
        <svg
          viewBox="0 0 200 120"
          className="h-full w-auto relative z-10 drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Book Icon - Stylized */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M100 100C100 100 80 90 40 90C20 90 10 100 10 100V30C10 30 20 20 40 20C80 20 100 30 100 30M100 100C100 100 120 90 160 90C180 90 190 100 190 100V30C190 30 180 20 160 20C120 20 100 30 100 30"
            stroke={primaryColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            d="M100 30V100"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Stylized characters on pages */}
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
            d="M40 40C45 40 50 45 50 50" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" 
          />
          <motion.circle 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.7 }}
            cx="45" cy="35" r="1.5" fill={primaryColor} opacity="0.6" 
          />
          <motion.circle 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8 }}
            cx="55" cy="35" r="1.5" fill={primaryColor} opacity="0.6" 
          />
          
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2 }}
            d="M150 40V60" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" 
          />
          <motion.path 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.2 }}
            d="M140 70C150 70 160 70 160 70" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" 
          />
          <motion.circle 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.4 }}
            cx="150" cy="80" r="1.5" fill={primaryColor} opacity="0.6" 
          />
        </svg>
      </div>
      
      <div className="flex flex-col justify-center">
        <motion.span 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-serif tracking-[0.1em] uppercase block leading-none"
          style={{ color: primaryColor }}
        >
          E<span className="text-base">sin</span>
        </motion.span>
        {showSlogan && (
          <motion.div 
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[0.5rem] tracking-[0.2em] uppercase font-medium mt-0.5 whitespace-nowrap opacity-60"
            style={{ color: secondaryColor }}
          >
            Inspiration for Education
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
