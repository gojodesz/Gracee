'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MediaFrame } from '@/components/MediaFrame';

interface ScholarProps {
  onClose?: () => void;
}

export const Scholar: React.FC<ScholarProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center overflow-hidden"
    >
      {/* Decorative accent elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-50/50 rounded-full blur-2xl opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 gap-8">
        {/* Dual Portrait Images - Side by side */}
        <div className="w-full md:w-1/2 h-96 md:h-full flex gap-4 md:gap-6">
          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-1 rounded-lg overflow-hidden shadow-2xl"
          >
            <MediaFrame
              type="image"
              src="/images/scientist-1.jpeg"
              alt="The Scholar"
              className="w-full h-full"
              objectFit="cover"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Image 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-1 rounded-lg overflow-hidden shadow-2xl"
          >
            <MediaFrame
              type="image"
              src="/images/scientist-2.jpeg"
              alt="The Scholar Portrait"
              className="w-full h-full"
              objectFit="cover"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full md:w-1/2 flex flex-col justify-center space-y-6"
        >
          {/* Section Label */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-green-700 font-semibold mb-2">
              Chapter One
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-400" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight">
            The Scholar
          </h1>

          {/* Caption */}
          <blockquote className="text-2xl md:text-3xl italic text-green-900 font-light leading-relaxed border-l-4 border-green-400 pl-6">
            "Beauty and Brains in perfect equilibrium."
          </blockquote>

          {/* Supporting Text */}
          <p className="text-base md:text-lg leading-8 text-gray-700 font-light max-w-md">
            Brilliance isn't just what you know, it's how you think, how you grow, and how you inspire others to do the same. Every discovery, every question, every moment of curiosity is a testament to the mind and heart that drives you forward.
          </p>

          {/* Decorative accent */}
          <div className="pt-4">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full">
              <p className="text-sm text-green-800 font-medium">✨ Keep learning, keep growing</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Close Button (if onClose provided) */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-gray-600 hover:text-gray-900 transition-colors p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      )}
    </motion.div>
  );
};
