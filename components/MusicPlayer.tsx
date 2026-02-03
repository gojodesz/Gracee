'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  audioSrc: string;
  isPlaying: boolean;
  onPlayChange: (playing: boolean) => void;
  trackTitle?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  audioSrc,
  isPlaying,
  onPlayChange,
  trackTitle = 'Background Music',
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented, user interaction required
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Update time display
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlayPause = () => {
    onPlayChange(!isPlaying);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        onPlay={() => onPlayChange(true)}
        onPause={() => onPlayChange(false)}
      />

      {/* Music Player Controls - Fixed Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 z-50 flex gap-3"
      >
        {/* Now Playing Label */}
        {showLabel && isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 px-4 py-3 rounded-full flex items-center gap-2 hidden md:flex"
          >
            <Music className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="text-xs text-white/70 font-light">{trackTitle}</span>
          </motion.div>
        )}

        {/* Mute Toggle */}
        <motion.button
          onClick={toggleMute}
          className="backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-full hover:bg-white/20 transition-all glow-effect-sm"
          aria-label="Toggle mute"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-amber-300" />
          ) : (
            <Volume2 className="w-5 h-5 text-amber-300" />
          )}
        </motion.button>

        {/* Play/Pause Toggle */}
        <motion.button
          onClick={togglePlayPause}
          className="backdrop-blur-md bg-gradient-to-r from-amber-400 to-purple-500 border border-white/20 p-3 rounded-full hover:shadow-lg transition-all glow-effect"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-white text-lg">
            {isPlaying ? '⏸' : '▶'}
          </span>
        </motion.button>
      </motion.div>

      {/* Mini Progress Bar - Bottom of screen */}
      {isPlaying && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-purple-500 z-40"
          style={{
            width: `${progress}%`,
            transformOrigin: 'left',
          }}
        />
      )}
    </>
  );
};
