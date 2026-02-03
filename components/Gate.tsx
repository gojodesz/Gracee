'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GateProps {
  onEnter: () => void;
}

export const Gate: React.FC<GateProps> = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Animated background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-purple-900/30 to-slate-950"
      />

      {/* Spotlight effect */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-amber-400 to-purple-500 rounded-full filter blur-3xl opacity-10"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-2xl px-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent"
        >
          🎉 Midnight Gala 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
        >
          A Modern, Interactive Celebration of Your Special Day
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 191, 36, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-4 bg-gradient-to-r from-amber-400 to-purple-500 text-white font-bold text-xl rounded-full glow-effect hover:glow-effect transition-all cursor-pointer"
        >
          Enter the Celebration ✨
        </motion.button>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-amber-300/60 text-sm"
      >
        ↓ Scroll to continue ↓
      </motion.div>
    </motion.div>
  );
};
