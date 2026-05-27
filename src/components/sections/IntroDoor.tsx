import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

const images = [
  './photo1.jpg',
  './photo2.jpg',
  './photo3.jpg',
  './photo4.jpg',
  './photo5.jpg',
];

export const IntroDoor: React.FC = () => {
  const [isOpening, setIsOpening] = useState(false);
  const unlockNext = useAppStore((state) => state.unlockNext);
  const controls = useAnimation();

  const handleUnlock = async () => {
    if (isOpening) return;
    setIsOpening(true);

    // Animate photos flying past the camera
    await controls.start((i) => ({
      z: 1000,
      opacity: 0,
      scale: 1.5,
      transition: { duration: 1.5, ease: 'easeIn', delay: i * 0.1 }
    }));

    unlockNext();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#0a0514] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic Background Glow - Optimized */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-[#2B124C]/30 blur-[80px]" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
      </div>

      <div className="absolute top-8 sm:top-16 z-20 text-center w-full pointer-events-none px-4">
        <motion.h1
          className="text-[clamp(2rem,9vw,3rem)] md:text-5xl font-serif text-glow-lavender mb-2 leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          A MAGICAL JOURNEY
        </motion.h1>
        <motion.p
          className="text-white/60 tracking-widest uppercase text-xs sm:text-sm"
          animate={!isOpening ? { opacity: [0.4, 1, 0.4] } : { opacity: 0 }}
          transition={!isOpening ? { repeat: Infinity, duration: 2 } : { duration: 0.5 }}
        >
          Tap the center to unlock
        </motion.p>
        <motion.p
          className="text-white/50 tracking-widest uppercase text-[0.68rem] sm:text-xs mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          🔊 Click the play button for music
        </motion.p>
      </div>

      {/* 3D Parallel Photos Container */}
      <div
        className="relative mt-20 sm:mt-12 w-full h-[min(64dvh,560px)] flex items-center justify-center perspective-[1500px]"
        onClick={handleUnlock}
      >
        {/* Left Far Image */}
        <motion.div
          custom={0}
          animate={controls}
          initial={{ x: '-120%', z: -400, rotateY: 25, opacity: 0, filter: 'blur(20px)' }}
          whileInView={{ opacity: 0.5, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-[44vw] max-w-[200px] aspect-[2/3] md:w-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-2xl glass-panel"
        >
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-50 z-10" />
          <motion.img
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
            src={images[0]}
            alt="Memory 1"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Left Near Image */}
        <motion.div
          custom={1}
          animate={controls}
          initial={{ x: '-60%', z: -200, rotateY: 15, opacity: 0, filter: 'blur(20px)' }}
          whileInView={{ opacity: 0.7, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-[48vw] max-w-[220px] aspect-[11/16] md:w-[280px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl glass-panel"
        >
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-30 z-10" />
          <motion.img
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            src={images[1]}
            alt="Memory 2"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Center Focus Image */}
        <motion.div
          custom={2}
          animate={controls}
          initial={{ x: '0%', z: 0, rotateY: 0, opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          whileHover={{ scale: 1.05, z: 50, boxShadow: '0 0 40px rgba(200,182,255,0.4)' }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-[min(68vw,250px)] aspect-[5/7] md:w-[320px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl glass-panel cursor-pointer z-20 group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 flex items-end justify-center pb-6">
            <span className="text-white tracking-widest uppercase text-sm border border-white/30 px-6 py-2 rounded-full backdrop-blur-md group-hover:bg-white/10 transition-colors">
              Begin
            </span>
          </div>
          <motion.img
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            src={images[2]}
            alt="Memory 3"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </motion.div>

        {/* Right Near Image */}
        <motion.div
          custom={3}
          animate={controls}
          initial={{ x: '60%', z: -200, rotateY: -15, opacity: 0, filter: 'blur(20px)' }}
          whileInView={{ opacity: 0.7, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-[48vw] max-w-[220px] aspect-[11/16] md:w-[280px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl glass-panel"
        >
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-30 z-10" />
          <motion.img
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            src={images[3]}
            alt="Memory 4"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Far Image */}
        <motion.div
          custom={4}
          animate={controls}
          initial={{ x: '120%', z: -400, rotateY: -25, opacity: 0, filter: 'blur(20px)' }}
          whileInView={{ opacity: 0.5, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="absolute w-[44vw] max-w-[200px] aspect-[2/3] md:w-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-2xl glass-panel"
        >
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-50 z-10" />
          <motion.img
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            src={images[4]}
            alt="Memory 5"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {isOpening && (
        <motion.div
          className="absolute inset-0 bg-[#0a0514] z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        />
      )}
    </motion.div>
  );
};
