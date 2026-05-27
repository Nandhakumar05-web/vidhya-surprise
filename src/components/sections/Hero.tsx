import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';
import { GlassCard } from '../ui/GlassCard';

export const Hero: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      cardRef.current.style.transform = `
        perspective(1200px)
        rotateY(${-x}deg)
        rotateX(${y}deg)
        scale3d(1.02,1.02,1.02)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0514]"
      initial={{ opacity: 0, rotateX: 15, y: 100, scale: 0.95, transformPerspective: 1200 }}
      animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: -15, y: -50 }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background glowing effects - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#2B124C]/40 blur-[100px]"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#C8B6FF]/20 blur-[120px]"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Left Content */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
              visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] } }
            }}
          >
            <h2 className="text-xl md:text-2xl text-[#E6B7A9] font-light tracking-widest uppercase mb-4">
              A Special Day
            </h2>
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 text-glow-lavender leading-tight title-3d">
              Happy <br />
              <span className="italic text-[#C8B6FF]">Birthday</span> <br />
              Vidhya
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg font-light leading-relaxed">
              To a soul that shines brighter than the stars. May this year bring you as much joy and beauty as you bring into this world.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] } }
            }}
            className="pt-8"
          >
            <CinematicButton onClick={unlockNext} glowColor="lavender">
              Unlock Next Memory
            </CinematicButton>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Portrait Frame */}
        <motion.div
          className="flex-1 flex justify-center perspective-[1200px]"
          initial={{ opacity: 0, scale: 0.9, rotateY: 30, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            ref={cardRef}
            className="relative premium-3d-card floating-glass"
          >
            <GlassCard glow className="w-[300px] h-[400px] md:w-[400px] md:h-[550px] p-4 flex flex-col relative z-20">
              <div className="flex-1 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative">
                {/* Placeholder for Vidhya's Image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2B124C] to-[#C8B6FF] opacity-30 mix-blend-overlay z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/50 tracking-widest uppercase text-sm">Portrait Space</p>
                </div>
                {/* You can replace this img src with actual photo */}
                <motion.img
                  initial={{ scale: 1.4 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 1.2 }}
                  src="/photo1.jpg"
                  alt="Vidhya"
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="pt-4 text-center">
                <p className="text-[#E6B7A9] font-serif italic text-xl">The Star of the Day</p>
              </div>
            </GlassCard>

            {/* Decorative elements behind frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#C8B6FF] to-[#F8C8DC] blur-[50px] opacity-20 -z-10 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

    </motion.section>
  );
};
