'use client';

import React from 'react';

interface MediaFrameProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * MediaFrame - Intelligently renders <video> or <img> based on file extension.
 * For videos: playsInline, muted, loop, autoPlay for mobile Safari compatibility.
 */
export const MediaFrame: React.FC<MediaFrameProps> = ({
  type,
  src,
  alt = 'Media content',
  className = 'w-full h-full',
  containerClassName = 'w-full h-full',
  objectFit = 'cover',
}) => {
  // Infer type from file extension if not explicitly provided
  const inferredType = type || (src.endsWith('.mp4') ? 'video' : 'image');

  if (inferredType === 'video') {
    return (
      <div className={containerClassName}>
        <video
          src={src}
          className={className}
          style={{ objectFit }}
          playsInline
          muted
          loop
          autoPlay
        />
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ objectFit }}
        draggable={false}
      />
    </div>
  );
};
