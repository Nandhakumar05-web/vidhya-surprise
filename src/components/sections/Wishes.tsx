import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';
import { GlassCard } from '../ui/GlassCard';
import { Heart, Sparkles as SparklesIcon, Star } from 'lucide-react';

const wishes = [
  {
    text: "May your birthday be as beautiful and glowing as your smile.",
    icon: <Heart className="w-8 h-8 text-[#F8C8DC]" />,
    author: "With Love"
  },
  {
    text: "Wishing you a year filled with magical moments and endless possibilities.",
    icon: <Star className="w-8 h-8 text-[#FFD66B]" />,
    author: "Always"
  },
  {
    text: "Keep shining, keep smiling, and keep being the amazing person you are.",
    icon: <SparklesIcon className="w-8 h-8 text-[#C8B6FF]" />,
    author: "Forever"
  }
];

const getIsCompact = () => typeof window !== 'undefined' && window.innerWidth < 768;

export const Wishes: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = React.useState(getIsCompact);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  React.useEffect(() => {
    const handleResize = () => setIsCompact(getIsCompact());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-[#0a0514] md:h-[200vh]"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(15px)' }}
      transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="relative md:sticky top-0 min-h-[100dvh] md:h-screen flex flex-col items-center justify-center overflow-visible md:overflow-hidden py-24 md:py-20">

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full max-w-4xl h-64 bg-gradient-to-r from-[#2B124C] via-[#C8B6FF]/20 to-[#2B124C] blur-[100px] opacity-50" />
        </div>

        <motion.div
          className="text-center z-20 mb-10 md:mb-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[clamp(2.4rem,11vw,4rem)] md:text-6xl font-serif text-glow-lavender mb-4 leading-tight">Heartfelt Wishes</h2>
          <p className="text-white/60 font-light tracking-widest uppercase text-xs sm:text-sm">{isCompact ? 'Read with love' : 'Scroll to read'}</p>
        </motion.div>

        <div className="w-full overflow-visible md:overflow-hidden flex items-center relative z-20">
          <motion.div style={{ x: isCompact ? 0 : x }} className="flex w-full flex-col items-center gap-5 px-4 pb-8 md:w-auto md:flex-row md:items-stretch md:gap-8 md:px-[30vw] md:min-w-max md:pb-12">
            {wishes.map((wish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <GlassCard
                  glow
                  className="w-full max-w-[360px] md:w-[450px] md:max-w-none min-h-[300px] md:h-[400px] p-6 md:p-8 flex flex-col justify-between premium-3d-card"
                >
                  <div className="flex justify-between items-start mb-8">
                    {wish.icon}
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                      <span className="text-[#FFD66B] text-xl font-serif">{i + 1}</span>
                    </div>
                  </div>

                  <p className="text-xl sm:text-2xl md:text-3xl font-serif text-white/90 leading-relaxed italic mb-8">
                    "{wish.text}"
                  </p>

                  <div className="mt-auto border-t border-white/10 pt-4 text-right">
                    <p className="text-[#E6B7A9] font-light tracking-widest uppercase text-sm">
                      — {wish.author}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-6 md:mt-12 z-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <CinematicButton onClick={unlockNext} glowColor="gold">
            Begin The Grand Finale
          </CinematicButton>
        </motion.div>
      </div>
    </motion.section>
  );
};
