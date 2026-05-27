import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';
import { GlassCard } from '../ui/GlassCard';

const images = [
  '/photo7.jpg',
  '/photo14.jpg',
  '/photo9.jpg',
  '/photo10.jpg',
  '/photo13.jpg',
  '/photo12.jpg',
];

export const Gallery: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100dvh] md:min-h-[150vh] bg-[#0a0514] overflow-hidden"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(15px)' }}
      transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(43,18,76,0.8)_0%,rgba(10,5,20,1)_100%)]" />
      </div>

      <div className="relative md:sticky top-0 min-h-[100dvh] md:h-screen flex flex-col items-center justify-center px-4 py-24 sm:py-20">
        <motion.div
          className="text-center z-20 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[clamp(2.25rem,10vw,3.25rem)] md:text-5xl font-serif text-glow mb-3 md:mb-4 leading-tight">Beautiful Memories</h2>
          <p className="text-white/60 font-light tracking-widest uppercase text-xs sm:text-sm">Every moment is a treasure</p>
        </motion.div>

        {/* 3D Floating Gallery */}
        <div className="w-full max-w-6xl mx-auto h-[min(52dvh,520px)] md:h-[60vh] relative perspective-[1200px] flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
          {/* Left Column */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-3 sm:gap-5 md:gap-8 w-1/3 mt-16 md:mt-32">
            <GalleryItem src={images[0]} delay={0.2} />
            <GalleryItem src={images[1]} delay={0.4} />
          </motion.div>

          {/* Center Column */}
          <motion.div className="flex flex-col gap-3 sm:gap-5 md:gap-8 w-1/3 z-10 scale-105 md:scale-110">
            <GalleryItem src={images[2]} delay={0.1} />
            <GalleryItem src={images[3]} delay={0.3} />
          </motion.div>

          {/* Right Column */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-3 sm:gap-5 md:gap-8 w-1/3 -mt-16 md:-mt-32">
            <GalleryItem src={images[4]} delay={0.5} />
            <GalleryItem src={images[5]} delay={0.6} />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 md:mt-12 z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CinematicButton onClick={unlockNext} glowColor="gold">
            Continue Memory Journey
          </CinematicButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

const GalleryItem = ({ src, delay }: { src: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 20, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, ease: [0.23, 1, 0.32, 1] }}
      className="relative cursor-pointer group premium-3d-card"
    >
      <GlassCard className="p-2 md:p-4 bg-white/5 border-white/10 transition-colors duration-500 overflow-hidden">
        <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-40 group-hover:opacity-0 transition-opacity duration-700 z-10" />
          <motion.img
            initial={{ scale: 1.4 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: delay + 0.2 }}
            src={src}
            alt="Memory"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </div>
      </GlassCard>
    </motion.div>
  );
};
