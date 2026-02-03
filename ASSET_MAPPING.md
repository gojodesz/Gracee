# 🎉 Birthday Gala - Asset Mapping & Content Guide

## Overview

This is an interactive birthday celebration website built with **Next.js 15**, **React 19**, **Framer Motion**, and **Tailwind CSS**. The site features four distinct chapters, each with unique layouts and media handling.

---

## 🎬 Asset Architecture

All media assets are located in the `/public/images/` directory and are hardcoded into the component structure.

### **MediaFrame Component**

The `MediaFrame` component intelligently renders `<video>` or `<img>` elements based on file type:

```tsx
interface MediaFrameProps {
  type: "image" | "video";
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
}
```

**Video Specifications** (Mobile Safari Compatibility):

- `playsInline`: Allows inline playback on iOS
- `muted`: Required for autoplay on most browsers
- `loop`: Continuous playback
- `autoPlay`: Automatic video start

---

## 📖 Chapter Breakdown

### **Chapter 1: The Scholar** (`Scholar.tsx`)

**Layout:** Full-height portrait hero with text overlay

| Property        | Value                                       |
| --------------- | ------------------------------------------- |
| **Hero Media**  | `/images/scientist-1.jpeg`                  |
| **Type**        | Image (portrait)                            |
| **Caption**     | "Beauty and Brains in perfect equilibrium." |
| **Palette**     | Clean white/green gradient                  |
| **Interaction** | Static showcase with vignette               |

**Component Structure:**

- Left side: Full-height portrait image with subtle vignette
- Right side: Serif title, italic caption, supporting narrative
- Responsive: Stack vertically on mobile

---

### **Chapter 2: The Explorer** (`Explorer.tsx`)

**Layout:** Interactive card stack (fan of cards)

| Property        | Value                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Media Stack** | 1. `/images/travel-1.jpeg` (Ocean view)<br/>2. `/images/travel-2.jpeg` (Namibia Hotel)<br/>3. `/images/travel-3.jpeg` (Lab coat/Braids) |
| **Type**        | All images (portrait)                                                                                                                   |
| **Caption**     | "From Swakopmund to the stars. May you never stop exploring."                                                                           |
| **Palette**     | Warm amber/orange gradient                                                                                                              |
| **Interaction** | Swipe/button navigation through cards with stacking effect                                                                              |

**Component Structure:**

- Interactive card carousel with fan-stacking visual effect
- Previous/Next buttons with dot indicators
- Counter showing position in stack
- Each card has a label at the bottom

---

### **Chapter 3: Day 1s** (`Day1s.tsx`)

**Layout:** Bento grid (hybrid video/photo mix)

| Grid Slot  | Media                    | Type  | Size         |
| ---------- | ------------------------ | ----- | ------------ |
| **Slot 1** | `/images/mall-2-vid.mp4` | Video | Large (2×2)  |
| **Slot 2** | `/images/mall-1.jpeg`    | Image | Normal (1×1) |
| **Slot 3** | `/images/cinema-3.mp4`   | Video | Large (2×2)  |
| **Slot 4** | `/images/cinema-1.jpeg`  | Image | Normal (1×1) |

**Visual Effects:**

- **Default State**: All media in grayscale with 0.5x slow-motion playback (videos only)
- **Hover State**: Entire grid transitions to full color when hovering over any item
- **Transition**: Smooth 0.3s ease-in-out filter change

**Video Playback Rate:**

```tsx
onLoadedMetadata={(e) => {
  e.currentTarget.playbackRate = 0.5; // Slow-motion effect
}}
```

**Component Structure:**

- 4-column responsive grid (2 columns on mobile)
- Large videos dominate the layout with auto-playing audio muted
- Grid-wide state for color/grayscale toggle on hover
- Labels on each item

---

### **Chapter 4: The Vibe** (`TheVibe.tsx`)

**Layout:** Scattered Polaroids (chaotic/playful layout)

| Property        | Value                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Media**       | 1. `/images/food-1.jpeg` (Pancakes)<br/>2. `/images/nature.jpeg` (Peace signs)<br/>3. `/images/foodie-2.jpeg` (Pasta) |
| **Type**        | All images                                                                                                            |
| **Caption**     | "Pancakes, Peace signs, and Pasta. The holy trinity."                                                                 |
| **Palette**     | Warm yellow/pink/orange gradient                                                                                      |
| **Interaction** | Draggable polaroid cards with click-to-expand modal                                                                   |

**Component Structure:**

- Polaroid-style cards scattered across viewport with random rotation (-12° to 8°)
- Drag to reposition (momentum-based physics)
- Hover to bring to front
- Click to expand into fullscreen modal
- Modal shows image + caption with close button

---

## 🔧 Technical Implementation

### File Extensions Handling

The MediaFrame component automatically detects media type by extension:

```tsx
// Automatic detection
const inferredType = src.endsWith(".mp4") ? "video" : "image";
```

**Supported Formats:**

- **Images**: `.jpeg`, `.png`, `.gif`, `.webp`
- **Videos**: `.mp4`

---

### Page Flow

1. **Intro Animation** → Kinetic hero with hold-to-celebrate button
2. **Main Hero** → "Happy Birthday Grace" section with scroll prompt
3. **Chapters Gallery** → Grid of 4 chapter cards (Scholar, Explorer, Day 1s, The Vibe)
4. **Cake Ritual** → Interactive candle with microphone-based blow-out
5. **Marquee Footer** → Scrolling credits with replay button

---

## 🎨 Design System

### Color Palettes by Chapter

| Chapter      | Primary    | Secondary | Palette                        |
| ------------ | ---------- | --------- | ------------------------------ |
| **Scholar**  | Green-600  | White     | `from-green-100 to-green-50`   |
| **Explorer** | Amber-600  | Orange    | `from-amber-100 to-orange-50`  |
| **Day 1s**   | Purple-600 | Pink      | `from-purple-900 to-slate-900` |
| **The Vibe** | Pink-600   | Yellow    | `from-yellow-100 to-pink-50`   |

### Typography

- **Headlines**: `font-serif` (serif-headline class) — Large, bold, leading
- **Captions**: Italic body text with accent colors
- **Labels**: Monospace details for section markers

---

## 📱 Responsive Design

All chapters are fully responsive:

- **Mobile** (< 768px): Single-column layouts, smaller media, touch-friendly interactions
- **Tablet** (768px - 1024px): Two-column grids, medium spacing
- **Desktop** (> 1024px): Full layouts with generous spacing and hover effects

---

## 🎥 Video Specifications

All videos must meet these requirements for optimal playback:

- **Codec**: H.264 video, AAC audio (MP4 container)
- **Autoplay**: Requires `muted` attribute
- **Mobile**: Use `playsInline` for iOS inline playback
- **Format**: `.mp4` only
- **Size**: Recommended < 10MB per video

**Example Usage:**

```tsx
<video
  src="/images/mall-2-vid.mp4"
  playsInline
  muted
  loop
  autoPlay
  onLoadedMetadata={(e) => {
    e.currentTarget.playbackRate = 0.5;
  }}
/>
```

---

## 🚀 Development & Deployment

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
# Opens at http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

### Type Checking

```bash
npx tsc --noEmit
```

---

## ✨ Features

- ✅ Mobile-optimized video playback (iOS Safari compatible)
- ✅ Responsive Bento grid with hover effects
- ✅ Draggable polaroid cards
- ✅ Smooth Framer Motion animations
- ✅ Confetti celebrations
- ✅ Microphone-based candle blow-out (with fallback)
- ✅ Full TypeScript support
- ✅ Tailwind CSS styling with custom gradients

---

## 🐛 Troubleshooting

### Videos not playing

- Ensure `muted` attribute is present
- Check video format is `.mp4` (H.264 codec)
- Verify file exists in `/public/images/`

### Images showing as placeholder

- Check image path matches exactly (case-sensitive on Linux)
- Ensure JPEG format: `.jpeg` (not `.jpg`)
- Verify dimensions for optimal display

### Grayscale effect not working on mobile

- Some browsers disable CSS filters on video
- Fallback to opacity or brightness adjustments for compatibility

---

## 📝 Content Mapping Summary

| Chapter  | Type   | Layout        | File Count | Interaction   |
| -------- | ------ | ------------- | ---------- | ------------- |
| Scholar  | Image  | Hero Portrait | 1          | Scroll        |
| Explorer | Images | Card Stack    | 3          | Prev/Next     |
| Day 1s   | Mixed  | Bento Grid    | 4          | Hover + Zoom  |
| The Vibe | Images | Scattered     | 3          | Drag + Expand |

---

**Built with ♥ for Grace | February 2026**
