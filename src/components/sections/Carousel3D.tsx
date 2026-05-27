import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, AnimatePresence, type MotionValue } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';

const images = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
  '/photo7.jpg',
  '/photo8.jpg',
  '/photo9.jpg',
  '/photo10.jpg',
  '/photo16.jpg',
  '/photo12.jpg',
  '/photo13.jpg',
  '/photo14.jpg',
];

const CarouselCard = ({ index, image, angleObj, onSelect }: { index: number, image: string, angleObj: MotionValue<number>, onSelect: (img: string) => void }) => {
  const cardAngle = index * 36;
  
  const scale = useTransform(angleObj, (val: number) => {
    let diff = (val + cardAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    const dist = Math.abs(diff);
    if (dist < 40) return 1.2 - (dist / 40) * 0.2;
    return 1.0 - Math.min((dist - 40) / 140, 1) * 0.2;
  });

  const filter = useTransform(angleObj, (val: number) => {
    let diff = (val + cardAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    const dist = Math.abs(diff);
    if (dist < 30) return `blur(0px)`;
    return `blur(${Math.min((dist - 30) / 60, 1) * 12}px)`;
  });

  const opacity = useTransform(angleObj, (val: number) => {
    let diff = (val + cardAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    const dist = Math.abs(diff);
    if (dist < 90) return 1;
    return 1 - ((dist - 90) / 90) * 0.8;
  });

  const brightness = useTransform(angleObj, (val: number) => {
    let diff = (val + cardAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const dist = Math.abs(diff);
    if (dist < 30) return 1.2;
    return 0.5;
  });

  return (
    <div 
      className="absolute top-1/2 left-1/2 -mt-[175px] -ml-[125px]"
      style={{ 
        transform: `rotateY(${cardAngle}deg)`, 
        transformStyle: 'preserve-3d' 
      }}
    >
      <motion.div
        className="w-[250px] h-[350px] md:w-[280px] md:h-[400px] shadow-[0_0_40px_rgba(0,0,0,0.8)] rounded-xl overflow-hidden glass-panel cursor-pointer"
        onClick={() => onSelect(image)}
        style={{ 
          z: 700, 
          scale, 
          filter, 
          opacity 
        }}
      >
        <motion.div className="w-full h-full" style={{ filter: useTransform(brightness, b => `brightness(${b})`) }}>
          <div className="absolute inset-0 bg-[#2B124C] mix-blend-color opacity-30 z-10" />
          <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
          
          {/* Active indicator border */}
          <motion.div 
            className="absolute inset-0 border-2 border-[#FFD66B] rounded-xl z-20 pointer-events-none"
            style={{ 
              opacity: useTransform(angleObj, (val: number) => {
                let diff = (val + cardAngle) % 360;
                if (diff > 180) diff -= 360;
                if (diff < -180) diff += 360;
                return Math.abs(diff) < 15 ? 1 : 0;
              }) 
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Carousel3D: React.FC = () => {
  const unlockNext = useAppStore((state) => state.unlockNext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Angle tracks the overall rotation of the carousel (0 to 360)
  const angle = useMotionValue(0);
  
  // Parallax offsets
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  // Mouse interaction speed modifier
  const speed = useRef(0.02);

  useAnimationFrame((_t, delta) => {
    if (!selectedImage) {
      angle.set((angle.get() + delta * speed.current) % 360);
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      parallaxX.set(x);
      parallaxY.set(y);
      
      // Speed up or slow down rotation based on mouse X
      const normalizedX = (e.pageX / window.innerWidth) - 0.5; // -0.5 to 0.5
      speed.current = 0.02 + (normalizedX * 0.05); // dynamic speed
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [parallaxX, parallaxY]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen bg-[#05020a] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="absolute top-20 z-20 text-center pointer-events-none">
        <motion.h2 
          className="text-4xl md:text-6xl font-serif text-glow-lavender title-3d"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Infinite Memories
        </motion.h2>
      </div>

      {/* 3D Cylinder Container */}
      <div className="relative w-full h-[600px] perspective-[1500px] z-10 flex items-center justify-center">
        <motion.div 
          className="relative w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            rotateX: parallaxY,
            rotateY: parallaxX,
            z: -200
          }}
        >
          {/* Central Glow */}
          <div className="absolute top-1/2 left-1/2 -mt-[250px] -ml-[250px] w-[500px] h-[500px] bg-[#C8B6FF] opacity-10 rounded-full blur-[100px] pointer-events-none" style={{ transform: 'translateZ(100px)' }} />

          {/* Cards wrapped in a spinning cylinder */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              transformStyle: 'preserve-3d',
              rotateY: angle
            }}
          >
            {images.map((src, i) => (
              <CarouselCard key={i} index={i} image={src} angleObj={angle} onSelect={setSelectedImage} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-20 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.23, 1, 0.32, 1] }}
      >
        <CinematicButton onClick={unlockNext} glowColor="gold">
          Unlock The Surprise
        </CinematicButton>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, y: 50, rotateX: 10 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Selected" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl premium-3d-card"
              />
              <button 
                className="absolute top-4 right-4 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 backdrop-blur-md transition-all"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
