import React, { useEffect, useState, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAppStore, sectionMusicMap } from './store/useAppStore';
import { IntroDoor } from './components/sections/IntroDoor';
import { Hero } from './components/sections/Hero';
import { DreamTransition } from './components/sections/DreamTransition';
import { Gallery } from './components/sections/Gallery';
import { Surprise } from './components/sections/Surprise';
import { EmojisSection } from './components/sections/EmojisSection';
import { Wishes } from './components/sections/Wishes';
import { FinalCelebration } from './components/sections/FinalCelebration';

const App: React.FC = () => {
  const currentSection = useAppStore((state) => state.currentSection);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.6,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Always scroll to top smoothly when changing sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  // Initialize music on component mount
  useEffect(() => {
    if (audioRef.current) {
      const musicPath = sectionMusicMap[currentSection];
      audioRef.current.src = musicPath;
      // Auto-play on initial load
      setTimeout(() => {
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
        }
      }, 200);
    }
  }, []);

  // Handle section music change and autoplay
  useEffect(() => {
    if (audioRef.current && currentSection !== 'intro') {
      // Stop current music and switch to new section's music
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Load new section music
      const musicPath = sectionMusicMap[currentSection];
      audioRef.current.src = musicPath;

      // Auto-play music immediately
      audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
    }
  }, [currentSection]);

  // Handle mute toggle
  useEffect(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isMuted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play prevented:', e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-[#0a0514] text-white min-h-screen font-sans">
      {/* Section-specific background music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      />

      {/* Floating Audio Toggle */}
      <motion.button
        className="fixed top-6 right-6 z-[100] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors shadow-lg"
        onClick={toggleAudio}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-white/70" /> : <Volume2 className="w-5 h-5 text-white" />}
      </motion.button>

      <AnimatePresence mode="wait">
        {currentSection === 'intro' && <IntroDoor key="intro" />}
        {currentSection === 'hero' && <Hero key="hero" />}
        {currentSection === 'gallery' && <Gallery key="gallery" />}
        {currentSection === 'surprise' && <Surprise key="surprise" />}
        {currentSection === 'emojis' && <EmojisSection key="emojis" />}
        {currentSection === 'wishes' && <Wishes key="wishes" />}
        {currentSection === 'finale' && <FinalCelebration key="finale" />}
        {currentSection === 'dream' && <DreamTransition key="dream" />}
      </AnimatePresence>
    </div>
  );
};

export default App;
