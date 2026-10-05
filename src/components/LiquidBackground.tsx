import { motion } from "motion/react";

export default function LiquidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-brand-light pointer-events-none">
      {/* Liquid Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-accent/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 150, -100, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-dark/5 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 80, 120, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-brand-accent/5 blur-[110px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, -50, 100, 0],
          scale: [0.9, 1.1, 1, 0.9],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[10%] left-[40%] w-[35%] h-[35%] rounded-full bg-brand-accent/10 blur-[90px]"
      />

      {/* Subtle Grain Overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
