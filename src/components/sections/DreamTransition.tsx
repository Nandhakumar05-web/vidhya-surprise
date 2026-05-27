import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';
import { GlassCard } from '../ui/GlassCard';
import { seededValue } from '../../lib/utils';

const transitionImages = [
  './photo1.jpg',
  './photo2.jpg',
  './photo3.jpg',
  './photo4.jpg',
  './photo5.jpg',
];

export const DreamTransition: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      if (activeIndex < transitionImages.length - 1) {
        setActiveIndex(prev => prev + 1);
      }
      setTimeout(() => setIsTransitioning(false), 1200);
    }, 1200);
  };

  const isLastImage = activeIndex === transitionImages.length - 1;

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-[#0a050f] flex flex-col items-center justify-center overflow-hidden px-4"
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
      transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* 3D Particle Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.4} color="#ffd5c2" />
          <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={4} color="#ffb085" />
          <spotLight position={[-5, -3, -5]} angle={0.6} penumbra={1} intensity={2} color="#C8B6FF" />
          <Sparkles count={300} scale={15} size={3} speed={0.3} color="#ffb085" opacity={0.5} />
          <Sparkles count={150} scale={12} size={5} speed={0.15} color="#ff7b54" opacity={0.3} />
          <Sparkles count={80} scale={10} size={7} speed={0.2} color="#ffffff" opacity={0.15} />
          <Environment preset="sunset" />
          <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={30} blur={4} color="#000" />
        </Canvas>
      </div>

      {/* Warm gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1c0d22]/80 via-[#0a050f]/60 to-[#05020a]/80 pointer-events-none" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#ffb085] opacity-[0.06] blur-[120px] rounded-full" />
      </div>

      {/* Title */}
      <motion.div
        className="absolute top-8 sm:top-16 z-20 text-center w-full pointer-events-none px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <h2 className="text-[clamp(2.1rem,10vw,4rem)] md:text-6xl font-serif text-[#ffb085] mb-2 sm:mb-3 drop-shadow-[0_0_25px_rgba(255,176,133,0.6)] leading-tight">
          A Floating Dream
        </h2>
        <p className="text-white/50 font-light italic text-sm sm:text-lg">
          Tap each portrait to drift through memories
        </p>
      </motion.div>

      {/* Image Counter */}
      <motion.div
        className="absolute top-32 sm:top-40 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-2">
          {transitionImages.map((_, i) => (
            <div
              key={i}
              className={`w-6 sm:w-8 h-1 rounded-full transition-all duration-700 ${
                i === activeIndex ? 'bg-[#ffb085] shadow-[0_0_10px_rgba(255,176,133,0.8)]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* 3D Layered Image Container */}
      <div className="relative z-10 mt-12 w-[min(76vw,320px)] h-[min(52dvh,440px)] sm:h-[460px] md:w-[400px] md:h-[580px]">
        <motion.div
          className="w-full h-full"
          style={{
            perspective: '1500px',
          }}
          animate={{
            rotateY: mousePos.x * 0.3,
            rotateX: -mousePos.y * 0.3,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`portrait-${activeIndex}`}
              className="absolute inset-0 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={handleTransition}
              initial={{ opacity: 0, scale: 0.6, rotateY: 60, z: -500, filter: 'blur(30px)' }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.3, rotateY: -40, z: 300, filter: 'blur(25px)' }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Deep Glow Behind */}
              <motion.div
                className="absolute -inset-8 rounded-3xl bg-[#ffb085] opacity-30 blur-[60px]"
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Layer 3 — deepest ghost */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden opacity-25"
                style={{ transform: 'translateZ(-60px) scale(1.08)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src={transitionImages[activeIndex]}
                  className="w-full h-full object-cover blur-md"
                  alt="Depth layer"
                />
                <div className="absolute inset-0 bg-[#ff7b54]/40 mix-blend-overlay" />
              </motion.div>

              {/* Layer 2 — middle echo */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden opacity-50"
                style={{ transform: 'translateZ(-30px) scale(1.04)', transformStyle: 'preserve-3d' }}
              >
                <img
                  src={transitionImages[activeIndex]}
                  className="w-full h-full object-cover blur-sm"
                  alt="Mid layer"
                />
                <div className="absolute inset-0 bg-[#C8B6FF]/20 mix-blend-screen" />
              </motion.div>

              {/* Layer 1 — main sharp image */}
              <GlassCard glow className="absolute inset-0 p-2 bg-white/5 border-white/15 shadow-[0_30px_80px_rgba(255,176,133,0.25)]">
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <motion.img
                    src={transitionImages[activeIndex]}
                    className="w-full h-full object-cover"
                    alt="Dream portrait"
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
                  />
                  {/* Warm cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#ff7b54]/30 via-transparent to-[#C8B6FF]/10 mix-blend-overlay" />
                  {/* Bottom reflection */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </GlassCard>

              {/* Floating sparkle accents */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#ffb085] rounded-full"
                  style={{
                    top: `${15 + seededValue(i + 1) * 70}%`,
                    left: `${10 + seededValue(i + 11) * 80}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -20, -40],
                  }}
                  transition={{
                    duration: 2 + seededValue(i + 21) * 2,
                    repeat: Infinity,
                    delay: seededValue(i + 31) * 3,
                  }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Controls */}
      <motion.div
        className="absolute bottom-8 sm:bottom-16 z-20 flex flex-col items-center gap-4 sm:gap-6 px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.19, 1, 0.22, 1] }}
      >
        <p className="text-white/40 text-xs sm:text-sm tracking-widest uppercase">
          {isLastImage ? 'Journey complete' : `${activeIndex + 1} / ${transitionImages.length}`}
        </p>

        {isLastImage && !isTransitioning && (
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <CinematicButton onClick={unlockNext} glowColor="gold">
              Awaken ✨
            </CinematicButton>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};
