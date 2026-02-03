'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CakeProps {
  onExtinguish?: () => void;
  recipientName?: string;
}

export const Cake: React.FC<CakeProps> = ({
  onExtinguish,
  recipientName = 'Grace',
}) => {
  const [isLit, setIsLit] = useState(true);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [flickerIntensity, setFlickerIntensity] = useState(1);
  const [partyMode, setPartyMode] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Initialize microphone
  const initializeMicrophone = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicPermission(true);
      setIsListening(true);

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      monitorVolume(analyser);
    } catch (error) {
      setMicPermission(false);
      console.warn('Microphone not available', error);
    }
  }, []);

  // Monitor volume and respond to blowing
  const monitorVolume = useCallback((analyser: AnalyserNode) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkVolume = () => {
      if (!isLit) return;

      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setVolume(average);

      // Flicker based on volume
      if (average > 30 && average < 80) {
        setFlickerIntensity(1 - (average - 30) / 100);
      } else if (average >= 80) {
        setFlickerIntensity(0.3);
      } else {
        setFlickerIntensity(1);
      }

      // Blow out threshold
      if (average > 100) {
        extinguishCandle();
        return;
      }

      animationIdRef.current = requestAnimationFrame(checkVolume);
    };

    checkVolume();
  }, [isLit]);

  // Extinguish candle
  const extinguishCandle = useCallback(() => {
    setIsLit(false);
    setShowSmoke(true);
    stopMicrophone();

    // Trigger party mode after a moment
    setTimeout(() => {
      setPartyMode(true);
      onExtinguish?.();
    }, 800);

    // Hide smoke after animation
    setTimeout(() => {
      setShowSmoke(false);
    }, 3000);
  }, [onExtinguish]);

  // Stop microphone
  const stopMicrophone = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, [stopMicrophone]);

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        partyMode ? 'party-strobe' : 'candle-warm'
      }`}
    >
      {/* Warm Candle Ambient Light */}
      {isLit && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(ellipse at 50% 60%, rgba(251, 191, 36, ${
              0.2 * flickerIntensity
            }) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <p className="mono-detail text-xs text-[#e0aaff]/60 mb-3">The Ritual</p>
        <h2 className="serif-headline text-4xl md:text-6xl text-white glow-rose mb-4">
          Make a Wish
        </h2>
        <p className="text-[#e0aaff]/70 text-lg">
          {isLit ? 'Blow to extinguish the flame' : 'Your wish has been heard ✨'}
        </p>
      </motion.div>

      {/* 3D Low-Poly Cake */}
      <div className="relative perspective-[800px]">
        {/* Cake Container */}
        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={partyMode ? { rotateY: [0, 360] } : {}}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {/* Cake Base Layer 1 */}
          <div
            className="relative w-64 h-20 md:w-80 md:h-24"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg)' }}
          >
            {/* Top Face */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 low-poly-face"
              style={{ transform: 'translateZ(40px)' }}
            />
            {/* Side Face */}
            <div
              className="absolute inset-x-0 h-10 md:h-12 bottom-0 bg-gradient-to-b from-pink-400 to-pink-600 rounded-b-full"
              style={{ transform: 'rotateX(90deg) translateZ(-50px)' }}
            />
            {/* Frosting Drips */}
            <div className="absolute -top-2 left-4 w-6 h-8 bg-white rounded-full opacity-90" />
            <div className="absolute -top-1 left-16 w-4 h-6 bg-white rounded-full opacity-90" />
            <div className="absolute -top-3 right-8 w-5 h-10 bg-white rounded-full opacity-90" />
            <div className="absolute -top-2 right-20 w-4 h-7 bg-white rounded-full opacity-90" />
          </div>

          {/* Cake Layer 2 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-48 h-16 md:w-60 md:h-20 -top-14 md:-top-16"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 low-poly-face" />
            {/* Decorations */}
            <div className="absolute top-1/2 left-4 w-3 h-3 bg-red-500 rounded-full" />
            <div className="absolute top-1/3 left-12 w-2 h-2 bg-blue-500 rounded-full" />
            <div className="absolute top-1/2 right-6 w-3 h-3 bg-green-500 rounded-full" />
            <div className="absolute top-1/3 right-14 w-2 h-2 bg-yellow-500 rounded-full" />
          </div>

          {/* Cake Top Layer */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-32 h-12 md:w-40 md:h-14 -top-24 md:-top-28"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400 low-poly-face" />
          </div>

          {/* Candle */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-36 md:-top-44 flex flex-col items-center">
            {/* Candle Body */}
            <div className="w-4 h-16 md:w-5 md:h-20 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-t-sm relative">
              {/* Wick */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-800 rounded-full" />

              {/* Flame */}
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{
                      scale: flickerIntensity,
                      y: [0, -2, 0, -1, 0],
                      x: volume > 50 ? [-2, 2, -1, 1, 0] : 0,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      scale: { duration: 0.1 },
                      y: { duration: 0.3, repeat: Infinity },
                      x: { duration: 0.15, repeat: Infinity },
                    }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2"
                  >
                    {/* Outer Flame */}
                    <div
                      className="w-6 h-10 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200"
                      style={{
                        clipPath: 'ellipse(50% 70% at 50% 70%)',
                        filter: `blur(1px) brightness(${1 + flickerIntensity * 0.3})`,
                        boxShadow: `0 0 20px rgba(251, 191, 36, ${flickerIntensity}), 0 0 40px rgba(251, 191, 36, ${flickerIntensity * 0.5})`,
                      }}
                    />
                    {/* Inner Flame */}
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-5 rounded-full bg-gradient-to-t from-blue-400 to-white"
                      style={{ clipPath: 'ellipse(50% 70% at 50% 70%)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Smoke */}
              <AnimatePresence>
                {showSmoke && (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: 0, x: 0, opacity: 0.8, scale: 0.5 }}
                        animate={{
                          y: -80 - i * 20,
                          x: (Math.random() - 0.5) * 40,
                          opacity: 0,
                          scale: 2,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 2 + i * 0.3,
                          delay: i * 0.15,
                          ease: 'easeOut',
                        }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-400/50"
                        style={{ filter: 'blur(4px)' }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Plate */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-16 w-72 h-8 md:w-96 md:h-10 rounded-full bg-gradient-to-b from-gray-100 to-gray-300"
          style={{ transform: 'rotateX(-80deg)' }}
        />
      </div>

      {/* Controls */}
      <div className="mt-16 text-center">
        {isLit && micPermission === null && (
          <motion.button
            onClick={initializeMicrophone}
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 rounded-full font-semibold text-lg hover:scale-105 transition-transform box-glow-amber"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎤 Enable Microphone to Blow
          </motion.button>
        )}

        {isLit && micPermission === false && (
          <motion.button
            onClick={extinguishCandle}
            className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform box-glow-rose"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌬️ Click to Blow Out Candle
          </motion.button>
        )}

        {isListening && isLit && (
          <div className="flex flex-col items-center gap-4">
            <p className="mono-detail text-xs text-[#e0aaff]/60">
              Listening... Blow into your microphone!
            </p>
            {/* Volume Indicator */}
            <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                animate={{ width: `${Math.min(volume, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        )}

        {/* Party Mode Message */}
        <AnimatePresence>
          {partyMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="serif-headline text-3xl md:text-5xl text-white glow-rose mb-4">
                Happy Birthday, {recipientName}! 🎉
              </h3>
              <p className="text-[#e0aaff]/70 text-lg">
                May all your wishes come true ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
