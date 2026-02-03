'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MediaFrame } from '@/components/MediaFrame';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  layout: 'dual-hero' | 'mosaic' | 'deck' | 'bento' | 'scattered';
  media: Array<{ type: 'image' | 'video'; src: string; label?: string }>;
}

const chapters: Chapter[] = [
  {
    id: 'scholar',
    title: 'The Scholar',
    subtitle: 'Chapter I',
    caption: 'Beauty and Brains in perfect equilibrium.',
    layout: 'dual-hero',
    media: [
      { type: 'image', src: '/images/scientist-1.jpeg', label: 'The Scholar' },
      { type: 'image', src: '/images/scientist-2.jpeg', label: 'Portrait' },
    ],
  },
  {
    id: 'explorer',
    title: 'The Explorer',
    subtitle: 'Chapter II',
    caption: 'From Swakopmund to the stars. May you never stop exploring.',
    layout: 'deck',
    media: [
      { type: 'image', src: '/images/travel-1.jpeg', label: 'Ocean view' },
      { type: 'image', src: '/images/travel-2.jpeg', label: 'Namibia Hotel' },
      { type: 'image', src: '/images/travel-3.jpeg', label: 'Lab coat/Braids' },
    ],
  },
  {
    id: 'day1s',
    title: 'Day 1s',
    subtitle: 'Chapter III',
    caption: 'Us. The Living Grid of memories and moments.',
    layout: 'bento',
    media: [
      { type: 'video', src: '/images/mall-2-vid.mp4', label: 'The mall vibe' },
      { type: 'image', src: '/images/mall-1.jpeg', label: 'The selfie' },
      { type: 'image', src: '/images/mall-3.jpeg', label: 'Mall moment' },
      { type: 'video', src: '/images/cinema-3.mp4', label: 'The cinema vibe' },
      { type: 'image', src: '/images/cinema-1.jpeg', label: 'The dark selfie' },
      { type: 'video', src: '/images/us-2.mp4', label: 'Extra moment' },
    ],
  },
  {
    id: 'vibe',
    title: 'The Vibe',
    subtitle: 'Chapter IV',
    caption: 'Pancakes, Peace signs, and Pasta. The holy trinity.',
    layout: 'scattered',
    media: [
      { type: 'image', src: '/images/food-1.jpeg', label: 'Pancakes' },
      { type: 'image', src: '/images/nature.jpeg', label: 'Peace signs' },
      { type: 'image', src: '/images/foodie-2.jpeg', label: 'The Pasta' },
      { type: 'image', src: '/images/nature-2.jpeg', label: 'Nature' },
    ],
  },
];

// Layout Components

const DualHeroLayout: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-screen">
      {chapter.media.map((media, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: idx === 0 ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: idx * 0.2 }}
          className="relative h-96 md:h-full rounded-lg overflow-hidden shadow-2xl"
        >
          <MediaFrame
            type={media.type}
            src={media.src}
            className="w-full h-full"
            objectFit="cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

const MosaicLayout: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-screen items-center">
      {chapter.media.map((media, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: idx * 0.15 }}
          className={`relative overflow-hidden rounded-2xl shadow-xl ${
            idx === 0 ? 'h-96 md:h-full' : 'h-80 md:h-96'
          }`}
        >
          <MediaFrame
            type={media.type}
            src={media.src}
            className="w-full h-full"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white font-serif text-sm md:text-lg">{media.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const DeckLayout: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % chapter.media.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + chapter.media.length) % chapter.media.length);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-screen">
      <div className="relative w-full md:w-1/2 h-96 md:h-full perspective">
        <AnimatePresence mode="wait">
          {chapter.media.map((media, idx) => {
            const distance = (idx - currentIdx + chapter.media.length) % chapter.media.length;
            const isVisible = distance < 3;
            const rotation = distance * 6;
            const yOffset = distance * 12;
            const zIndex = 10 - distance;

            return (
              isVisible && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 - distance * 0.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-xl bg-white"
                  style={{
                    rotate: rotation,
                    y: yOffset,
                    zIndex,
                  }}
                >
                  <MediaFrame
                    type={media.type}
                    src={media.src}
                    className="w-full h-full"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-serif text-sm">{media.label}</p>
                  </div>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-6 md:w-1/2">
        <p className="text-sm text-gray-400">
          {currentIdx + 1} of {chapter.media.length}
        </p>
        <div className="flex gap-4">
          <motion.button
            onClick={handlePrev}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </div>
        <div className="flex gap-2">
          {chapter.media.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-2 rounded-full ${
                idx === currentIdx ? 'bg-amber-600 w-6' : 'bg-amber-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BentoLayout: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-screen items-center justify-center p-6 md:p-12"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {chapter.media.map((media, idx) => (
        <motion.div
          key={idx}
          onMouseEnter={() => setHoveredIdx(idx)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group ${
            media.type === 'video'
              ? 'md:col-span-2 md:row-span-2 h-80 md:h-96'
              : 'h-64 md:h-48'
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <MediaFrame
            type={media.type}
            src={media.src}
            className="w-full h-full"
            objectFit="cover"
          />

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ opacity: hoveredIdx === idx ? 1 : 0 }}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-serif text-xs md:text-sm">{media.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const ScatteredLayout: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const positions = [
    { x: -20, y: -15, rotation: -8 },
    { x: 25, y: 5, rotation: 12 },
    { x: -5, y: 20, rotation: -4 },
    { x: 20, y: -25, rotation: 6 },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {chapter.media.map((media, idx) => (
        <motion.div
          key={idx}
          initial={{
            x: `${positions[idx]?.x || 0}%`,
            y: `${positions[idx]?.y || 0}%`,
            rotate: positions[idx]?.rotation || 0,
          }}
          animate={{
            x: `${positions[idx]?.x || 0}%`,
            y: `${positions[idx]?.y || 0}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="absolute w-40 h-52 md:w-48 md:h-64 bg-white rounded-lg shadow-lg overflow-hidden"
          whileHover={{ scale: 1.1, zIndex: 50 }}
        >
          <MediaFrame
            type={media.type}
            src={media.src}
            className="w-full h-4/5"
            objectFit="cover"
          />
          <div className="p-3 h-1/5 flex items-center justify-center">
            <p
              className="text-center text-xs text-gray-700 font-medium"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              {media.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const ScatterGallery: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const selectedChapter = chapters.find((ch) => ch.id === selectedChapterId);

  const renderLayout = (chapter: Chapter) => {
    switch (chapter.layout) {
      case 'dual-hero':
        return <DualHeroLayout chapter={chapter} />;
      case 'mosaic':
        return <MosaicLayout chapter={chapter} />;
      case 'deck':
        return <DeckLayout chapter={chapter} />;
      case 'bento':
        return <BentoLayout chapter={chapter} />;
      case 'scattered':
        return <ScatteredLayout chapter={chapter} />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {selectedChapterId && selectedChapter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black overflow-y-auto"
            onClick={() => setSelectedChapterId(null)}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedChapterId(null);
              }}
              className="fixed top-6 right-6 z-[51] text-white hover:text-gray-300 transition-colors p-2"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={32} strokeWidth={1.5} />
            </motion.button>

            <div className="fixed top-8 left-1/2 -translate-x-1/2 text-center z-[51]">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                {selectedChapter.subtitle}
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-2">
                {selectedChapter.title}
              </h2>
            </div>

            <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {renderLayout(selectedChapter)}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center text-xl md:text-2xl italic text-white/80 max-w-3xl mx-auto"
              >
                "{selectedChapter.caption}"
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-4">
            The Story
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Five Chapters of Grace
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light">
            Click any chapter to explore the moments that shaped you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {chapters.map((chapter, idx) => (
            <motion.button
              key={chapter.id}
              onClick={() => setSelectedChapterId(chapter.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                type: 'spring',
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-80 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 group text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-slate-900/50 group-hover:opacity-70 transition-all" />

              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-gray-300">
                  {chapter.subtitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
                  {chapter.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2">{chapter.caption}</p>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
              />
            </motion.button>
          ))}
        </div>

        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl opacity-30 pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl opacity-20 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </section>
    </>
  );
};
