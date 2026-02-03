'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scholar } from '@/components/Scholar';
import { Explorer } from '@/components/Explorer';
import { Day1s } from '@/components/Day1s';
import { TheVibe } from '@/components/TheVibe';

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  component: React.ComponentType<{ onClose?: () => void }>;
  coverColor: string;
  accentColor: string;
}

const chapters: Chapter[] = [
  {
    id: 'scholar',
    title: 'The Scholar',
    subtitle: 'Chapter I',
    component: Scholar,
    coverColor: 'from-green-100 to-green-50',
    accentColor: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: 'explorer',
    title: 'The Explorer',
    subtitle: 'Chapter II',
    component: Explorer,
    coverColor: 'from-amber-100 to-orange-50',
    accentColor: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'day1s',
    title: 'Day 1s',
    subtitle: 'Chapter III',
    component: Day1s,
    coverColor: 'from-purple-900 to-slate-900',
    accentColor: 'bg-purple-600 hover:bg-purple-700',
  },
  {
    id: 'vibe',
    title: 'The Vibe',
    subtitle: 'Chapter IV',
    component: TheVibe,
    coverColor: 'from-yellow-100 to-pink-50',
    accentColor: 'bg-pink-600 hover:bg-pink-700',
  },
];

export const ChaptersGallery: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const selectedChapter = chapters.find((ch) => ch.id === selectedChapterId);
  const SelectedComponent = selectedChapter?.component;

  return (
    <>
      {/* Full-screen chapter view */}
      <AnimatePresence>
        {selectedChapterId && SelectedComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black overflow-y-auto"
          >
            <SelectedComponent
              onClose={() => setSelectedChapterId(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Grid View */}
      <section className="relative w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-4"
          >
            The Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="serif-headline text-5xl md:text-7xl text-white mb-6 leading-tight"
          >
            Your Story in Four Acts
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-300 text-lg md:text-xl font-light"
          >
            Click any chapter to dive into the moments that make you, you.
          </motion.p>
        </motion.div>

        {/* Chapter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
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
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl text-left bg-gradient-to-br cursor-pointer"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${chapter.coverColor} transition-all group-hover:scale-110 duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-end">
                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.12 + 0.1 }}
                    className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-gray-700"
                  >
                    {chapter.subtitle}
                  </motion.p>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12 + 0.15 }}
                    className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3 leading-tight"
                  >
                    {chapter.title}
                  </motion.h3>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 + 0.2 }}
                    className="flex items-center gap-2 text-gray-700 font-semibold"
                  >
                    <span>Read More</span>
                    <motion.span
                      className="transition-transform duration-300 group-hover:translate-x-1 inline-block"
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* Hover shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl opacity-30 pointer-events-none"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl opacity-20 pointer-events-none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </section>
    </>
  );
};
