'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChaptersGallery } from '@/components/ChaptersGallery';
import { Cake } from '@/components/Cake';
import { MusicPlayer } from '@/components/MusicPlayer';

// Kinetic Typography phrases
const kineticPhrases = [
  'THE SCIENTIST',
  'THE EXPLORER',
  'THE FRIEND',
  'THE DREAMER',
  'THE SOUL',
  'THE ONE',
];

// Kinetic Hero Component
const KineticHero: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle through phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % kineticPhrases.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Handle hold start
  const handleHoldStart = useCallback(() => {
    setIsHolding(true);
    setHoldProgress(0);

    // Progress interval
    progressIntervalRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          return prev;
        }
        return prev + 2;
      });
    }, 30);

    // Complete after 1.5 seconds
    holdTimerRef.current = setTimeout(() => {
      triggerCelebration();
    }, 1500);
  }, []);

  // Handle hold end
  const handleHoldEnd = useCallback(() => {
    setIsHolding(false);
    setHoldProgress(0);
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  }, []);

  // Trigger celebration
  const triggerCelebration = useCallback(() => {
    // Screen shake
    setIsShaking(true);

    // Confetti explosion
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#e0aaff', '#fbbf24', '#a855f7', '#ec4899'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors: ['#e0aaff', '#fbbf24'],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: ['#a855f7', '#ec4899'],
      });
    }, 400);

    // Transition after animation
    setTimeout(() => {
      setIsShaking(false);
      onEnter();
    }, 600);
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 bg-velvet flex flex-col items-center justify-center overflow-hidden film-grain ${
        isShaking ? 'screen-shake' : ''
      }`}
    >
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(224, 170, 255, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Kinetic Typography */}
      <div className="relative h-32 md:h-48 flex items-center justify-center overflow-hidden mb-12">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="serif-headline text-6xl md:text-9xl text-white glow-rose text-center"
          >
            {kineticPhrases[currentIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mono-detail text-xs md:text-sm text-[#e0aaff]/60 mb-16 text-center"
      >
        A celebration of everything you are
      </motion.p>

      {/* Hold to Celebrate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="relative"
      >
        <motion.button
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          className="relative px-12 py-5 rounded-full border-2 border-[#e0aaff]/50 text-[#e0aaff] font-semibold text-lg overflow-hidden transition-all hover:border-[#e0aaff] select-none"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Progress fill */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#e0aaff]/30 to-[#fbbf24]/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: holdProgress / 100 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Button text */}
          <span className="relative z-10">
            {isHolding ? 'Keep Holding...' : 'Hold to Celebrate'}
          </span>
        </motion.button>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isHolding ? 0 : 0.5 }}
          className="mono-detail text-[10px] text-[#e0aaff]/40 text-center mt-4"
        >
          Press and hold for 1.5 seconds
        </motion.p>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="mono-detail text-[10px] text-[#e0aaff]/30">↓ scroll ↓</p>
      </motion.div>
    </div>
  );
};

// Marquee Footer Component
const MarqueeFooter: React.FC<{ onReplay: () => void }> = ({ onReplay }) => {
  const marqueeText = 'Built with love for Grace • February 2026 • Somewhere on this crazy campus sha • ';

  return (
    <footer className="relative w-full py-8 bg-[#0f0618] border-t border-[#e0aaff]/10 overflow-hidden">
      {/* Scrolling Ticker */}
      <div className="relative overflow-hidden py-4 mb-6">
        <div className="marquee-scroll flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mono-detail text-sm text-[#e0aaff]/40 mx-4">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* Liner Notes */}
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="mono-detail text-xs text-[#e0aaff]/30 mb-6">
          Finally...                                                      
        </p>

        <h3 className="serif-headline text-2xl md:text-3xl text-white mb-4 glow-rose">
          Thank you for being you, my girl.
        </h3>

        <p className="text-[#e0aaff]/50 text-sm max-w-md mx-auto mb-8 leading-relaxed">
          The way you change the room just by walking in. The way you make people
          feel seen. The way you show up, every single time. That's rare. That's
          you.
        </p>

        {/* Replay Button */}
        <motion.button
          onClick={onReplay}
          className="px-6 py-3 rounded-full border border-[#e0aaff]/30 text-[#e0aaff]/60 mono-detail text-xs hover:border-[#e0aaff]/60 hover:text-[#e0aaff] transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          ↻ Replay Intro
        </motion.button>

        <p className="mono-detail text-[10px] text-[#e0aaff]/20 mt-8">
          © 2026 • Made with ♥ and way too much coffee by your very own IS-RA-EL"
        </p>
      </div>
    </footer>
  );
};

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
    setIsPlaying(true);
  };

  const handleCakeExtinguish = () => {
    // Massive confetti celebration
    confetti({
      particleCount: 200,
      spread: 360,
      origin: { y: 0.5 },
      colors: ['#e0aaff', '#fbbf24', '#a855f7', '#ec4899', '#10b981'],
    });
  };

  const handleReplay = () => {
    setHasEntered(false);
    setIsPlaying(false);
  };

  // Show Kinetic Hero intro
  if (!hasEntered) {
    return <KineticHero onEnter={handleEnter} />;
  }

  return (
    <main className="w-full overflow-x-hidden bg-velvet text-white film-grain">
      {/* Music Player */}
      <MusicPlayer
        audioSrc="/Bruno_Mars_-_Just_Way_You_Are_(mp3.pm).mp3"
        isPlaying={isPlaying}
        onPlayChange={setIsPlaying}
        trackTitle="Just the Way You Are"
      />

      {/* Hero Transition */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-velvet"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mono-detail text-xs text-[#e0aaff]/60 mb-4"
        >
          February 3rd, 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="serif-headline text-6xl md:text-8xl lg:text-9xl text-white mb-6 glow-rose"
        >
          Happy Birthday
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="serif-headline text-4xl md:text-6xl text-[#e0aaff] mb-8"
        >
          Grace
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[#e0aaff]/60 text-lg max-w-xl leading-relaxed"
        >
          Today we celebrate the person who makes ordinary moments extraordinary.
          Scroll down to explore your story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mono-detail text-xs text-[#e0aaff]/30">↓ scroll ↓</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Memory Vault / Chapters Gallery */}
      <ChaptersGallery />

      {/* Cake Ritual Section */}
      <section className="relative w-full bg-velvet">
        <Cake onExtinguish={handleCakeExtinguish} recipientName="Grace" />
      </section>

      {/* Marquee Footer */}
      <MarqueeFooter onReplay={handleReplay} />
    </main>
  );
}
