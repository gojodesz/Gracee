'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CandleProps {
  onExtinguish: () => void;
}

export const Candle: React.FC<CandleProps> = ({ onExtinguish }) => {
  const [isLit, setIsLit] = useState(true);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // Initialize Web Audio API for microphone input
  const initializeMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      setMicPermission(true);
      setIsListening(true);

      // Create audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create analyser
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Start monitoring volume
      monitorVolume(analyser);
    } catch (error) {
      setMicPermission(false);
      console.warn('Microphone permission denied or unavailable', error);
    }
  };

  // Monitor microphone volume and trigger blow-out on high volume
  const monitorVolume = (analyser: AnalyserNode) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkVolume = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setVolume(average);

      // Threshold for "blow" detection (adjustable; ~120+ is a strong blow)
      if (average > 120 && isLit) {
        extinguishCandle();
        stopMicrophone();
        return;
      }

      animationIdRef.current = requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  // Stop monitoring microphone
  const stopMicrophone = () => {
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
  };

  // Extinguish the candle
  const extinguishCandle = () => {
    setIsLit(false);
    onExtinguish();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Cake SVG */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <svg
          width="300"
          height="350"
          viewBox="0 0 300 350"
          className="mx-auto"
        >
          {/* Cake Base (Chocolate) */}
          <rect x="50" y="180" width="200" height="120" fill="#6B4423" rx="10" />

          {/* Cake Frosting Layers */}
          <ellipse cx="150" cy="180" rx="100" ry="30" fill="#8B6F47" />
          <ellipse cx="150" cy="200" rx="100" ry="25" fill="#6B4423" />

          {/* Cake Top */}
          <ellipse cx="150" cy="100" rx="100" ry="40" fill="#E8D5C4" />

          {/* Frosting swirls */}
          <path d="M 80 100 Q 120 80 150 100 Q 180 80 220 100" stroke="#D4AF37" strokeWidth="3" fill="none" />

          {/* Candle */}
          <rect x="140" y="40" width="20" height="80" fill="#FFF8DC" rx="5" />

          {/* Candle Wick */}
          {isLit && (
            <line x1="150" y1="30" x2="150" y2="10" stroke="#333" strokeWidth="2" />
          )}
        </svg>

        {/* Flame - Large wrapper for flame flicker animation */}
        {isLit && (
          <>
            {/* Outer flame (yellow/gold) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-8 left-1/2 transform -translate-x-1/2 w-12 h-16 flame-flicker"
              style={{
                background: 'linear-gradient(to top, #FCD34D 0%, #FBBF24 50%, #F59E0B 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))',
              }}
            />

            {/* Inner flame (orange/red) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-12 flame-flicker"
              style={{
                background: 'linear-gradient(to top, #F97316 0%, #EA580C 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                animationDelay: '0.1s',
              }}
            />
          </>
        )}

        {/* Smoke effect (post-extinguish) */}
        {!isLit && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -40 }}
            transition={{ duration: 2 }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-16 h-16 rounded-full bg-gray-400 opacity-40 blur-2xl" />
          </motion.div>
        )}
      </motion.div>

      {/* Instructions & Volume Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        {micPermission === null && (
          <motion.button
            onClick={initializeMicrophone}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-purple-500 text-white font-semibold glow-effect hover:glow-effect mb-4"
          >
            🎤 Enable Microphone to Blow Out Candle
          </motion.button>
        )}

        {micPermission === false && (
          <motion.button
            onClick={extinguishCandle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-purple-500 text-white font-semibold glow-effect hover:glow-effect"
          >
            💨 Click to Blow Out Candle
          </motion.button>
        )}

        {isListening && (
          <div className="text-sm text-amber-300 mb-2">
            🎤 Listening... {micPermission !== false && '(Blow into microphone)'}
          </div>
        )}

        {/* Volume bar visualization */}
        {isListening && (
          <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-red-500"
              animate={{ width: `${Math.min(volume / 1.5, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {!isLit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-2xl font-bold text-amber-300"
          >
            🎉 Make a Wish! 🎉
          </motion.div>
        )}
      </div>
    </div>
  );
};
