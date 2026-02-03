'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  narrative: string;
  narrativeHighlight: string;
  index: number;
}

interface MemoryLaneProps {
  memories?: Memory[];
}

// Movie Poster Card - The Trigger
const MoviePosterCard: React.FC<{
  memory: Memory;
  isSelected: boolean;
  onClick: () => void;
}> = ({ memory, isSelected, onClick }) => {
  return (
    <motion.div
      layoutId={`movie-poster-${memory.id}`}
      onClick={onClick}
      className="group relative h-96 cursor-pointer overflow-hidden rounded-lg"
      whileHover={!isSelected ? { y: -12 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Movie poster image */}
      <motion.img
        src={memory.imageUrl}
        alt={memory.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1 }}
        whileHover={!isSelected ? { scale: 1.08 } : {}}
        transition={{ duration: 0.4 }}
      />

      {/* Cinematic dark overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
        initial={{ opacity: 0.6 }}
        whileHover={!isSelected ? { opacity: 0.75 } : {}}
      />

      {/* Text overlay at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 text-white"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: memory.index * 0.1, duration: 0.6 }}
      >
        <motion.p
          className="text-sm uppercase tracking-widest text-amber-300 font-semibold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: memory.index * 0.1 + 0.1 }}
        >
          {memory.subtitle}
        </motion.p>

        <motion.h3
          className="serif-headline text-3xl md:text-4xl leading-tight text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: memory.index * 0.1 + 0.2 }}
        >
          {memory.title}
        </motion.h3>
      </motion.div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 pointer-events-none"
        whileHover={!isSelected ? { opacity: 0.1 } : {}}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Deep Dive Expanded View - Full Screen Story
const DeepDiveStory: React.FC<{
  memory: Memory;
  onClose: () => void;
}> = ({ memory, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      >
        {/* Close button - subtle */}
        <motion.button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 text-white hover:text-amber-300 transition-colors p-2"
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={32} strokeWidth={1.5} />
        </motion.button>

        {/* Main expanded card */}
        <motion.div
          layoutId={`movie-poster-${memory.id}`}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-7xl bg-black rounded-xl overflow-hidden shadow-2xl"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Two-column layout: Image + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-screen lg:min-h-auto">
            {/* Left: Full-height hero image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative h-96 lg:h-full bg-slate-900 overflow-hidden group"
            >
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </motion.div>

            {/* Right: Scrollable narrative content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-b from-slate-900 to-black overflow-y-auto max-h-screen lg:max-h-none"
            >
              {/* Subtitle accent */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-4">
                  {memory.subtitle}
                </p>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-purple-500 mb-8" />
              </motion.div>

              {/* Main heading - Playfair Display serif */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="serif-headline text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight"
              >
                {memory.title}
              </motion.h1>

              {/* Highlight narrative - italicized, premium feel */}
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-lg md:text-xl italic text-amber-100 border-l-4 border-amber-400 pl-6 mb-8 py-4"
              >
                "{memory.narrativeHighlight}"
              </motion.blockquote>

              {/* Full narrative - premium body text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-base md:text-lg leading-8 text-slate-200 font-light mb-6 space-y-4">
                  {memory.narrative.split('\n\n').map((paragraph, idx) => (
                    <span key={idx} className="block">
                      {paragraph}
                    </span>
                  ))}
                </p>
              </motion.div>

              {/* Decorative footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-slate-700"
              >
                <p className="text-sm text-slate-400 italic">
                  A chapter in a story that continues to unfold.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const MemoryLane: React.FC<MemoryLaneProps> = ({
  memories = [
    {
      id: 'scientist',
      title: 'The Scientist',
      subtitle: 'Brilliance in Motion',
      imageUrl:
        'https://images.unsplash.com/photo-1530268729831-4be100a9f282?w=1200&h=800&fit=crop',
      narrativeHighlight:
        'Watching you in the lab, surrounded by curiosity and purpose, I see the future you\'re building.',
      narrative:
        'There\'s a particular kind of magic that happens when brilliant minds are at work—and you\'re proof of it.\n\nEvery discovery you make, every hypothesis you test, every late night spent in pursuit of knowledge—it all adds up to something extraordinary. You don\'t just do science; you live it. Your passion isn\'t confined to the lab; it radiates outward, inspiring everyone around you to think deeper, question more, and never settle for surface-level answers.\n\nYour impact extends far beyond papers and experiments. The way you approach problems with methodical precision, the way you communicate complex ideas with such clarity, the way you lift up others in your field—these are the marks of a true scientist. Not just someone with credentials, but someone with purpose.\n\nOn your birthday, we celebrate not just your achievements, but the relentless curiosity that drives you, the integrity that guides your work, and the brilliant mind that refuses to stop growing. The world needs more people like you.',
      index: 0,
    },
    {
      id: 'traveler',
      title: 'The World Traveler',
      subtitle: 'Where Dreams Take Flight',
      imageUrl:
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
      narrativeHighlight:
        'You don\'t just visit places; you experience the soul of every destination.',
      narrative:
        'Some people dream about travel. You live it.\n\nFrom the moment you step off the plane until the last sunset you chase, you approach each destination with the heart of a true explorer. You don\'t follow guidebooks blindly—you wander down cobblestone streets, strike up conversations with locals, taste unfamiliar foods, and let experiences reshape your perspective.\n\nThe world is vast, but you\'re not intimidated. You\'re inspired. Every border crossed, every language barrier overcome, every moment of uncertainty met with courage—these are the threads of an adventurer\'s story. You\'ve shown us that life is too short for safe choices, that growth happens outside comfort zones, and that the best souvenirs are stories.\n\nBut what\'s most beautiful is how you bring back more than just memories. You bring back wisdom, empathy, and a wider lens through which to see the world. You inspire us to be braver, to dream bigger, and to remember that the world is waiting to teach us something new.\n\nHere\'s to your next adventure. The world is lucky to have you exploring it.',
      index: 1,
    },
    {
      id: 'us',
      title: 'Us',
      subtitle: 'Partners in Every Adventure',
      imageUrl:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop',
      narrativeHighlight:
        'The moments we share aren\'t just memories—they\'re the foundation of everything that matters.',
      narrative:
        'Some friendships are easy. Ours is extraordinary.\n\nThere are moments that define a friendship, and I could fill volumes with ours. The late-night conversations that turn into sunrise talks. The inside jokes that only we understand. The times we\'ve shown up for each other, not with judgment, but with unwavering support. The adventures we\'ve planned, the dreams we\'ve shared, the fears we\'ve conquered together.\n\nYou\'re not just a friend—you\'re a mirror that reflects my best self, a compass that helps me navigate uncertainty, and a co-author in this ongoing story we\'re writing together. When I needed someone to believe in me, you were there. When you needed strength, I learned what it meant to truly show up. That\'s the magic of real partnership.\n\nThe silly moments matter. The serious conversations matter. The way you remember the small details that matter to me. The way you celebrate my wins like they\'re your own. The way you hold space for my struggles without trying to fix everything. That\'s love in its purest form.\n\nOn your birthday, I want you to know: I\'m grateful. For the memories we\'ve made, the ones we\'re making right now, and for all the chapters still to come. Thank you for being my partner in crime, my adventure buddy, my confidant, and my friend. Here\'s to us.',
      index: 2,
    },
    {
      id: 'visionary',
      title: 'The Visionary',
      subtitle: 'Future in the Making',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
      narrativeHighlight:
        'You don\'t just see the future—you\'re actively building it with intention and grace.',
      narrative:
        'There\'s a particular kind of power in knowing what you want and having the courage to pursue it.\n\nWatching you work toward your goals is like watching an artist with a clear vision. You don\'t get distracted by noise. You don\'t settle for compromises that chip away at your integrity. You hold space for your dreams while staying grounded in your values. That\'s rare. That\'s admirable. That\'s you.\n\nThe things you\'re building—whether they\'re personal projects, professional milestones, or contributions to causes you believe in—they all bear the mark of someone who thinks beyond themselves. Your vision extends to how you want to impact the world, and that\'s the kind of thinking that changes things.\n\nThis year holds so much potential for you. There are doors yet to open, mountains yet to climb, and chapters yet to write. And I have zero doubt that you\'ll meet them with the same brilliance, courage, and grace you bring to everything.\n\nOn your birthday, we celebrate not just who you are, but who you\'re becoming. The future is watching you. And so am I. Keep building, keep dreaming, keep being exactly who you are. The world needs it.',
      index: 3,
    },
  ],
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedMemory = memories.find((m) => m.id === selectedId);

  return (
    <div className="relative w-full py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Section Header - Cinema style */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-20 text-center max-w-3xl mx-auto"
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
          Life Chapters
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-lg md:text-xl font-light"
        >
          Click any chapter to dive deeper into the story
        </motion.p>
      </motion.div>

      {/* Movie Poster Grid - 4 columns, responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
        <AnimatePresence mode="wait">
          {memories.map((memory, idx) => (
            <motion.div
              key={memory.id}
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
            >
              <MoviePosterCard
                memory={{ ...memory, index: idx }}
                isSelected={selectedId === memory.id}
                onClick={() => setSelectedId(memory.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Deep dive expanded story overlay */}
      <AnimatePresence>
        {selectedMemory && (
          <DeepDiveStory
            memory={selectedMemory}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
