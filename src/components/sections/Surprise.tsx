import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { CinematicButton } from '../ui/CinematicButton';

const images = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo15.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo14.jpg',
  '/photo16.jpg',
  '/photo17.jpg',
  '/photo12.jpg',
];

const getCarouselRadius = () => (
  typeof window !== 'undefined' && window.innerWidth < 768 ? 360 : 700
);

const CarouselCard = ({ index, image, angleObj, radius, onSelect }: { index: number, image: string, angleObj: MotionValue<number>, radius: number, onSelect: (img: string) => void }) => {
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
    if (dist < 30) return 1.1; // Warm bright highlight
    return 0.6; // Darker dreamy back
  });

  return (
    <div 
      className="absolute top-1/2 left-1/2 -mt-[115px] -ml-[75px] md:-mt-[175px] md:-ml-[125px]"
      style={{ 
        transform: `rotateY(${cardAngle}deg)`, 
        transformStyle: 'preserve-3d' 
      }}
    >
      <motion.div
        className="w-[150px] h-[230px] sm:w-[190px] sm:h-[280px] md:w-[280px] md:h-[400px] shadow-[0_20px_50px_rgba(255,123,84,0.3)] rounded-xl overflow-hidden glass-panel cursor-pointer border border-white/20"
        onClick={() => onSelect(image)}
        style={{ 
          z: radius, 
          scale, 
          filter, 
          opacity 
        }}
      >
        <motion.div className="w-full h-full relative" style={{ filter: useTransform(brightness, b => `brightness(${b}) sepia(20%) hue-rotate(-10deg)`) }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#ff7b54]/40 to-transparent mix-blend-overlay z-10" />
          <img src={image} alt={`Memory ${index}`} className="w-full h-full object-cover" />
          
          <motion.div 
            className="absolute inset-0 border-[3px] border-[#ffb085] rounded-xl z-20 pointer-events-none"
            style={{ 
              opacity: useTransform(angleObj, (val: number) => {
                let diff = (val + cardAngle) % 360;
                if (diff > 180) diff -= 360;
                if (diff < -180) diff += 360;
                return Math.abs(diff) < 15 ? 0.8 : 0;
              }),
              boxShadow: 'inset 0 0 20px rgba(255,176,133,0.5)'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

const GiftBox = ({ onClick, isOpened }: { onClick: () => void; isOpened: boolean }) => {
  const lidRef = useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && !isOpened) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 - 1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  useEffect(() => {
    if (isOpened && lidRef.current && boxRef.current && groupRef.current) {
      gsap.to(lidRef.current.position, {
        y: 3.5,
        x: 2.5,
        z: -2.5,
        duration: 3,
        ease: 'power3.out',
      });
      gsap.to(lidRef.current.rotation, {
        z: -Math.PI / 2.5,
        x: Math.PI / 3,
        y: Math.PI / 1.5,
        duration: 3,
        ease: 'power3.out',
      });
      
      gsap.to(boxRef.current.position, {
        y: -5, // Drop box far down
        duration: 3,
        delay: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [isOpened]);

  const boxColor = "#111111";
  const ribbonColor = "#ffb085"; 

  return (
    <group ref={groupRef} onClick={!isOpened ? onClick : undefined} position={[0, -1, 0]}>
      {/* Box Base */}
      <group ref={boxRef} position={[0, -0.5, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={boxColor} metalness={0.4} roughness={0.6} />
        </mesh>
        
        {isOpened && (
          <mesh position={[0, 1.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <planeGeometry args={[1.8, 1.8]} />
            <meshStandardMaterial color="#ff7b54" emissive="#ff7b54" emissiveIntensity={8} toneMapped={false} />
          </mesh>
        )}

        <mesh position={[0, 0, 1.01]}>
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -1.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[1.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[-1.01, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
      </group>

      {/* Box Lid */}
      <group ref={lidRef} position={[0, 0.6, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.4, 2.2]} />
          <meshStandardMaterial color={boxColor} metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 2.2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.3, 2.2]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color={ribbonColor} metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export const Surprise: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const unlockNext = useAppStore((state) => state.unlockNext);
  
  const angle = useMotionValue(0);
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const speed = useRef(0.015);
  const [carouselRadius, setCarouselRadius] = useState(getCarouselRadius);

  useAnimationFrame((_t, delta) => {
    if (isOpened && !selectedImage) {
      angle.set((angle.get() + delta * speed.current) % 360);
    }
  });

  useEffect(() => {
    const handleResize = () => setCarouselRadius(getCarouselRadius());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isOpened) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = (window.innerWidth / 2 - e.pageX) / 60;
      const y = (window.innerHeight / 2 - e.pageY) / 60;
      parallaxX.set(x);
      parallaxY.set(y);
      const normalizedX = (e.pageX / window.innerWidth) - 0.5;
      speed.current = 0.015 + (normalizedX * 0.03); 
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpened, parallaxX, parallaxY]);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
  };

  return (
    <motion.section 
      className="relative min-h-[100dvh] bg-[#0f0814] flex flex-col items-center justify-center overflow-hidden perspective-[1500px] px-4"
      initial={{ opacity: 0, rotateX: 15, y: 100, scale: 0.95, transformPerspective: 1500 }}
      animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Anime Cinematic Glow Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff7b54]/20 via-[#180a1c] to-[#0f0814]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[#ffb085] mix-blend-overlay opacity-10 blur-[100px]" />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-auto z-10">
        <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
          {/* Dreamy Anime Fog */}
          <fog attach="fog" args={['#0f0814', 8, 20]} />
          
          <ambientLight intensity={0.5} color="#ffb085" />
          <spotLight position={[5, 10, 5]} angle={0.4} penumbra={1} intensity={4} color="#ff7b54" castShadow />
          <spotLight position={[-5, -5, -5]} angle={0.6} penumbra={1} intensity={2} color="#C8B6FF" />
          
          <Float speed={isOpened ? 0 : 1.5} rotationIntensity={isOpened ? 0 : 0.3} floatIntensity={isOpened ? 0 : 0.4}>
            <GiftBox onClick={handleOpen} isOpened={isOpened} />
          </Float>

          {isOpened && (
            <>
              {/* Volumetric dust effect */}
              <Sparkles count={500} scale={20} size={2.5} speed={0.4} color="#ffb085" opacity={0.6} />
              <Sparkles count={200} scale={15} size={4} speed={0.2} color="#ff7b54" opacity={0.4} />
            </>
          )}

          <Environment preset="sunset" />
          <ContactShadows position={[0, -3.5, 0]} opacity={1} scale={30} blur={3} far={10} color="#000000" />
        </Canvas>
      </div>

      {/* Cinematic 3D Cylinder Reveal */}
      <AnimatePresence>
        {isOpened && (
          <motion.div 
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
            initial={{ opacity: 0, scale: 0.1, y: 200, filter: 'blur(30px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 3, delay: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ 
                transformStyle: 'preserve-3d',
                rotateX: parallaxY,
                rotateY: parallaxX,
                z: -300
              }}
            >
              <motion.div 
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', rotateY: angle }}
              >
                {images.map((src, i) => (
                  <CarouselCard key={i} index={i} image={src} angleObj={angle} radius={carouselRadius} onSelect={setSelectedImage} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-10 sm:top-16 z-30 text-center w-full pointer-events-none px-4">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="tap-text"
              initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-[clamp(2rem,9vw,3.5rem)] md:text-5xl font-serif text-glow-lavender mb-2 title-3d leading-tight">A Magical Memory</h2>
              <p className="text-white/60 uppercase tracking-widest text-xs sm:text-sm">Tap to reveal the dream</p>
            </motion.div>
          ) : (
            <motion.div
              key="reveal-text"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2.5, delay: 2, ease: [0.19, 1, 0.22, 1] }}
            >
              <h2 className="text-[clamp(2.3rem,10vw,4rem)] md:text-6xl font-serif text-[#ffb085] mb-2 drop-shadow-[0_0_20px_rgba(255,176,133,0.8)] title-3d leading-tight">Infinite Dreams</h2>
              <p className="text-base md:text-xl text-white/80 font-light max-w-xl mx-auto italic">
                Every moment a masterpiece.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpened && !selectedImage && (
          <motion.div 
            className="absolute bottom-8 sm:bottom-16 z-30 pointer-events-auto px-4"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5, delay: 4, ease: [0.23, 1, 0.32, 1] }}
          >
            <CinematicButton onClick={unlockNext} glowColor="gold">
              Step Into The Future
            </CinematicButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0514]/95 backdrop-blur-2xl p-4 md:p-12 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, y: 80, rotateX: 15, filter: 'blur(20px)' }}
              animate={{ scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ scale: 0.9, y: 30, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[#ff7b54] opacity-20 blur-[120px] rounded-full pointer-events-none" />
              <img 
                src={selectedImage} 
                alt="Selected Dream" 
                className="max-w-full max-h-full object-contain rounded-xl shadow-[0_30px_100px_rgba(255,123,84,0.4)] border border-white/10 relative z-10"
              />
              <button 
                className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white/70 hover:text-white bg-white/5 hover:bg-white/20 rounded-full px-4 py-3 backdrop-blur-md transition-all z-20"
                onClick={() => setSelectedImage(null)}
                aria-label="Close image"
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
