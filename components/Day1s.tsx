'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MediaFrame } from '@/components/MediaFrame';

interface Day1sProps {
  onClose?: () => void;
}

export const Day1s: React.FC<Day1sProps> = ({ onClose }) => {
  const [isHovered, setIsHovered] = useState(false);

  const gridItems = [
    {
      id: 'mall-vid',
      type: 'video' as const,
      src: '/images/mall-2-vid.mp4',
      gridClass: 'md:col-span-2 md:row-span-2',
      label: 'The Mall Vibe',
    },
    {
      id: 'mall-selfie',
      type: 'image' as const,
      src: '/images/mall-1.jpeg',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'The Selfie',
    },
    {
      id: 'cinema-close',
      type: 'video' as const,
      src: '/images/cinema-4.mp4',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'Peak',
    },
    {
      id: 'nicee',
      type: 'video' as const,
      src: '/images/mall-4.mp4',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'The Vid',
    },
    {
      id: 'cinema-vid',
      type: 'video' as const,
      src: '/images/cinema-3.mp4',
      gridClass: 'md:col-span-2 md:row-span-2',
      label: 'The Cinema Vibe',
    },
    {
      id: 'cinema-selfie',
      type: 'image' as const,
      src: '/images/cinema-1.jpeg',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'The Dark Selfie',
    },
    {
      id: 'u&i',
      type: 'image' as const,
      src: '/images/us.jpeg',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'we look so serious',
    },
    {
      id: '&us',
      type: 'video' as const,
      src: '/images/us-2.mp4',
      gridClass: 'md:col-span-1 md:row-span-1',
      label: 'Funn',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden px-4 md:px-8 py-12"
    >
      {/* Decorative accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-900/20 rounded-full blur-2xl opacity-30 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-purple-400 font-semibold mb-2">
            Chapter Three
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-400 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Day 1s
          </h1>
          <blockquote className="text-xl md:text-2xl italic text-slate-300 font-light max-w-2xl mx-auto">
            "Partners in every adventure, collectors of moments that matter."
          </blockquote>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {gridItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-xl overflow-hidden shadow-xl group cursor-pointer ${item.gridClass}`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Media Container */}
              <div
                className="w-full h-full relative"
                style={{
                  filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                  transition: 'filter 0.3s ease-in-out',
                }}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                    playsInline
                    muted
                    loop
                    autoPlay
                    // Slow-motion effect via CSS (playbackRate would need JS)
                    onLoadedMetadata={(e) => {
                      // Slow-motion: 0.5x speed
                      const video = e.currentTarget;
                      video.playbackRate = 0.5;
                    }}
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <p className="text-white font-serif text-xs md:text-sm">{item.label}</p>
              </div>

              {/* Hover indicator */}
              <motion.div
                className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-full h-full rounded-full border-2 border-white/50" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Description Below Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 md:mt-16 space-y-6 max-w-2xl mx-auto"
        >
          <p className="text-base md:text-lg leading-8 text-slate-300 font-light">
            These are the moments that define us. The spontaneous trips, the late-night adventures, the quiet sitting-and-talking moments. Each snapshot, each video, each frame is a memory of us being exactly where we needed to be.
          </p>
          <p className="text-sm text-slate-400 italic">
            Hover over the grid to see the moments in full color.
          </p>
        </motion.div>
      </div>

      {/* Close Button */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-slate-300 hover:text-white transition-colors p-2"
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
