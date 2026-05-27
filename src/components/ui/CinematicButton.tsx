import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CinematicButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'gold' | 'lavender';
}

export const CinematicButton: React.FC<CinematicButtonProps> = ({ 
  children, 
  className, 
  glowColor = 'gold',
  ...props 
}) => {
  const glowClass = glowColor === 'gold' ? 'shadow-[0_0_20px_rgba(255,214,107,0.4)]' : 'shadow-[0_0_20px_rgba(200,182,255,0.4)]';
  const hoverGlowClass = glowColor === 'gold' ? 'hover:shadow-[0_0_30px_rgba(255,214,107,0.8)]' : 'hover:shadow-[0_0_30px_rgba(200,182,255,0.8)]';

  return (
    <motion.button
      className={cn(
        'relative max-w-[calc(100vw-2rem)] rounded-full px-6 py-3.5 text-center text-base font-medium leading-snug tracking-wide transition-all duration-500 overflow-hidden group sm:px-8 sm:py-4 sm:text-lg sm:tracking-wider',
        'bg-white/10 backdrop-blur-md border border-white/20 text-white',
        glowClass,
        hoverGlowClass,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
    </motion.button>
  );
};
