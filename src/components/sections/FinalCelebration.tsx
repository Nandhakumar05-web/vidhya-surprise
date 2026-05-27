import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';

export const FinalCelebration: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="relative min-h-screen bg-[#0a0514] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Starry background */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="text-6xl md:text-9xl font-serif text-[#FFD66B] mb-8 text-glow leading-tight">
            Happy <br />
            Birthday <br />
            Vidhya ✨
          </h1>
          <p className="text-xl md:text-3xl text-white/80 font-light tracking-wide max-w-2xl mx-auto italic">
            "Here's to the beautiful journey ahead."
          </p>
        </motion.div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2, ease: [0.19, 1, 0.22, 1] }}
        >
          <CinematicButton onClick={unlockNext} glowColor="lavender">
            One Last Dream ✨
          </CinematicButton>
        </motion.div>
      </div>

      {/* Floating glowing orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full mix-blend-screen"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(200, 182, 255, 0.4)' : 'rgba(255, 214, 107, 0.4)'
                } 0%, transparent 70%)`,
              left: Math.random() * 100 + '%',
              top: '120%',
            }}
            animate={{
              y: ['0vh', '-150vh'],
              x: Math.random() * 100 > 50 ? [0, 50, -50, 0] : [0, -50, 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};
