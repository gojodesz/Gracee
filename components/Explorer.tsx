'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaFrame } from '@/components/MediaFrame';

interface ExplorerProps {
  onClose?: () => void;
}

const travelImages = [
  {
    id: 'travel-1',
    src: '/images/travel-1.jpeg',
    title: 'Ocean View',
  },
  {
    id: 'travel-2',
    src: '/images/travel-2.jpeg',
    title: 'Namibia Hotel',
  },
  {
    id: 'travel-3',
    src: '/images/travel-3.jpeg',
    title: 'Lab Coat & Braids',
  },
];

export const Explorer: React.FC<ExplorerProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % travelImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + travelImages.length) % travelImages.length);
  };

  const currentImage = travelImages[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 flex items-center justify-center overflow-hidden px-4 md:px-8"
    >
      {/* Decorative accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-2xl opacity-20 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold mb-2">
            Chapter Two
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-amber-600 to-orange-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
            The Explorer
          </h1>
          <blockquote className="text-xl md:text-2xl italic text-amber-900 font-light max-w-2xl mx-auto">
            "From Swakopmund to the stars. May you never stop exploring."
          </blockquote>
        </motion.div>

        {/* Card Stack (Fan Layout) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Image Container with Fan Stack Effect */}
          <motion.div
            className="relative w-full lg:w-1/2 aspect-[3/4] perspective"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background stacked cards effect */}
            <AnimatePresence mode="wait">
              {travelImages.map((image, idx) => {
                const distance = (idx - currentIndex + travelImages.length) % travelImages.length;
                const isVisible = distance < 3;
                const rotation = distance * 6;
                const yOffset = distance * 12;
                const scale = 1 - distance * 0.05;
                const zIndex = 10 - distance;

                return (
                  isVisible && (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 rounded-xl overflow-hidden shadow-xl bg-white"
                      style={{
                        rotate: rotation,
                        y: yOffset,
                        zIndex,
                      }}
                    >
                      <MediaFrame
                        type="image"
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full"
                        objectFit="cover"
                      />
                      {/* Card label */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white font-serif text-sm">{image.title}</p>
                      </div>
                    </motion.div>
                  )
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Controls & Description */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-1/2 flex flex-col space-y-8"
          >
            {/* Description */}
            <div className="space-y-4">
              <p className="text-base md:text-lg leading-8 text-gray-700 font-light">
                Travel isn't just about collecting passport stamps—it's about collecting perspectives, stories, and moments that reshape who you are. Every destination holds a lesson, every journey a discovery.
              </p>
              <p className="text-base md:text-lg leading-8 text-gray-700 font-light">
                From the serene shores of Swakopmund to the boundless sky above, you've shown us that the world is both vast and intimate when you approach it with an open heart.
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6">
              <motion.button
                onClick={handlePrev}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Previous
              </motion.button>
              <div className="flex items-center gap-2">
                {travelImages.map((_, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-amber-600 w-6' : 'bg-amber-300'
                    }`}
                  />
                ))}
              </div>
              <motion.button
                onClick={handleNext}
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next →
              </motion.button>
            </div>

            {/* Counter */}
            <p className="text-sm text-gray-600">
              {currentIndex + 1} of {travelImages.length}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Close Button */}
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
