import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';
import { GlassCard } from '../ui/GlassCard';

const emojis = [
  { icon: '✨', title: 'Magic', desc: 'May your days be filled with wonder.' },
  { icon: '🎂', title: 'Sweetness', desc: 'A year sweeter than the last.' },
  { icon: '🎉', title: 'Joy', desc: 'Endless celebrations await you.' },
  { icon: '💖', title: 'Love', desc: 'Surrounded by those who cherish you.' },
  { icon: '🎁', title: 'Surprises', desc: 'Beautiful moments unfolding.' },
  { icon: '🥂', title: 'Cheers', desc: 'To your bright and beautiful future.' },
];

export const EmojisSection: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-[#0a0514] py-24 sm:py-32 px-4 sm:px-6 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, rotateX: 15, y: 100, scale: 0.95, transformPerspective: 1200 }}
      animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, rotateX: -15, y: -50 }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-[80vw] h-[80vw] max-w-4xl max-h-4xl rounded-full bg-[#FFD66B] blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10 sm:mb-16 md:mb-20"
        >
          <h2 className="text-[clamp(2.4rem,11vw,4rem)] md:text-6xl font-serif text-glow-lavender mb-4 sm:mb-6 title-3d leading-tight">
            Little Blessings
          </h2>
          <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed italic">
            "A collection of wishes, just for you."
          </p>
        </motion.div>

        <motion.div
          style={{ y }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-20 w-full"
        >
          {emojis.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: 20, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="premium-3d-card"
            >
              <GlassCard glow className="h-full min-h-[180px] p-5 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors duration-500">
                <span className="text-5xl sm:text-6xl mb-4 sm:mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{item.icon}</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FFD66B] mb-3">{item.title}</h3>
                <p className="text-sm sm:text-base text-white/60 font-light">{item.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <CinematicButton onClick={unlockNext} glowColor="gold">
            Read My Wishes
          </CinematicButton>
        </motion.div>
      </div>
    </motion.section>
  );
};
