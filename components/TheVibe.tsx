'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaFrame } from '@/components/MediaFrame';
import { X } from 'lucide-react';

interface TheVibeProps {
  onClose?: () => void;
}

const vibePhotos = [
  {
    id: 'food-1',
    src: '/images/food-1.jpeg',
    caption: 'Pancakes',
    rotation: -12,
    x: -30,
    y: -20,
  },
  {
    id: 'food-1',
    src: '/images/foodie-2.jpeg',
    caption: 'Pancakes',
    rotation: -12,
    x: -30,
    y: -20,
  },
  {
    id: 'nature',
    src: '/images/nature.jpeg',
    caption: 'My Queen',
    rotation: 8,
    x: 20,
    y: 10,
  },
  {
    id: 'foodie-2',
    src: '/images/foodie-2.jpeg',
    caption: 'The Pasta',
    rotation: -5,
    x: 10,
    y: -10,
  },
  {
    id: 'afro',
    src: '/images/jesus_girl-1.jpeg',
    caption: 'The Pasta',
    rotation: -5,
    x: 10,
    y: -10,
  },
  {
    id: 'jesuslover',
    src: '/images/jesus_girl.jpeg',
    caption: 'My Girl!',
    rotation: -5,
    x: 10,
    y: -10,
  },
];

interface Photo {
  id: string;
  src: string;
  caption: string;
  rotation: number;
  x: number;
  y: number;
}

const PolaroidCard: React.FC<{
  photo: Photo;
  onExpand: () => void;
  zIndex: number;
}> = ({ photo, onExpand, zIndex }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onClick={onExpand}
      initial={{
        x: `${photo.x}%`,
        y: `${photo.y}%`,
        rotate: photo.rotation,
      }}
      whileHover={{
        scale: 1.08,
        zIndex: 50,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 60,
        cursor: 'grabbing',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="absolute w-48 h-64 md:w-56 md:h-72 bg-white rounded-md shadow-lg cursor-grab polaroid"
      style={{
        zIndex,
        transformOrigin: 'center',
      }}
    >
      {/* Image */}
      <div className="w-full h-52 md:h-60 overflow-hidden rounded-sm">
        <MediaFrame
          type="image"
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>

      {/* Polaroid caption area */}
      <div className="p-3 md:p-4 h-16 md:h-12 flex items-center justify-center">
        <p
          className="text-center text-sm md:text-base text-gray-800 font-medium"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
};

export const TheVibe: React.FC<TheVibeProps> = ({ onClose }) => {
  const [photoOrder, setPhotoOrder] = useState<string[]>(vibePhotos.map((p) => p.id));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const bringToFront = (photoId: string) => {
    setPhotoOrder((prev) => {
      const filtered = prev.filter((id) => id !== photoId);
      return [...filtered, photoId];
    });
  };

  const expandedPhoto = vibePhotos.find((p) => p.id === expandedId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-orange-50 flex items-center justify-center overflow-hidden px-4"
    >
      {/* Decorative accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/40 rounded-full blur-2xl opacity-30 pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 z-40 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-pink-700 font-semibold mb-2">
          Chapter Four
        </p>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-2">
          The Vibe
        </h1>
        <p className="text-sm md:text-base italic text-pink-900">
          Pancakes, Peace Signs, and Pasta
        </p>
      </motion.div>

      {/* Scattered Polaroids Container */}
      <div className="relative w-full h-screen md:min-h-screen flex items-center justify-center">
        {vibePhotos.map((photo, idx) => {
          const zIndex = photoOrder.indexOf(photo.id) + 1;
          return (
            <PolaroidCard
              key={photo.id}
              photo={photo}
              zIndex={zIndex}
              onExpand={() => {
                bringToFront(photo.id);
                setExpandedId(photo.id);
              }}
            />
          );
        })}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-center"
      >
        <p className="text-xs md:text-sm text-gray-600 font-light">
          Drag • Click to enlarge
        </p>
      </motion.div>

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

      {/* Expanded View Modal */}
      <AnimatePresence>
        {expandedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedId(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              <motion.button
                onClick={() => setExpandedId(null)}
                className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={24} className="text-gray-900" />
              </motion.button>

              {/* Image */}
              <div className="w-full aspect-video md:aspect-auto bg-gray-100">
                <MediaFrame
                  type="image"
                  src={expandedPhoto.src}
                  alt={expandedPhoto.caption}
                  className="w-full h-full"
                  objectFit="cover"
                />
              </div>

              {/* Caption */}
              <div className="p-6 md:p-8 bg-white">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                  {expandedPhoto.caption}
                </h3>
                <p className="text-gray-700 font-light leading-relaxed">
                  These simple, joyful moments are the threads that weave our story together.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
