import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { getImageUrl } from '../assets/images';

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function PremiumImage({ src, alt, className = "", aspectRatio = "aspect-video" }: PremiumImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Map input_file paths or custom keys to verified image URLs
  const displaySrc = getImageUrl(src);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  
  const lightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const lightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);
  const lightOpacity = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    lightOpacity.set(0.25);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    lightOpacity.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className={`perspective-1000 group relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className={`relative overflow-hidden border-[1.5px] border-[#1a1a1a] dark:border-white/20 bg-[#1a1a1a]/5 dark:bg-white/5 transition-all duration-500 group-hover:border-[#5a9a8e] ${aspectRatio}`}
      >
        {/* The Image */}
        <img 
          src={displaySrc} 
          alt={alt} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Dynamic Lighting Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: useTransform(
              [lightX, lightY, lightOpacity],
              ([x, y, opacity]) => `radial-gradient(circle at ${x}% ${y}%, rgba(90, 154, 142, ${opacity}) 0%, transparent 60%)`
            )
          }}
        />
      </motion.div>
    </div>
  );
}
