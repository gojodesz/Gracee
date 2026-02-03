# 🎂 Grace's Birthday Celebration Site

An interactive, beautifully animated Next.js web experience celebrating Grace's birthday with 5 immersive story chapters, video gallery, and Bruno Mars soundtrack.

## ✨ Features

- **5 Story Chapters** - The Scholar, Believer, Explorer, Day 1s, The Vibe
- **Multiple Layouts** - Hero, Diptych, Deck, Bento Grid, Scattered Polaroids
- **Rich Media** - Images (JPEG) and videos (MP4) with smooth autoplay
- **Dynamic Color Themes** - Each chapter has a unique gradient aesthetic
- **Persistent Music** - Bruno Mars "Just the Way You Are" with controls
- **Smooth Animations** - Framer Motion throughout for fluid interactions
- **Fully Responsive** - Optimized for desktop, tablet, and mobile
- **Type-Safe** - Built with TypeScript for reliability

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.11
- **React:** 19.0.0
- **Styling:** Tailwind CSS 3.4.0
- **Animations:** Framer Motion 11.0.0
- **Icons:** Lucide React 0.408.0
- **Effects:** Canvas Confetti 1.9.0
- **Language:** TypeScript 5.3.0

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
next-birthday/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with hero and cake
│   └── globals.css         # Global styles
├── components/
│   ├── Scholar.tsx         # Chapter 1: The Scholar
│   ├── Believer.tsx        # Chapter 2: The Believer
│   ├── Explorer.tsx        # Chapter 3: The Explorer
│   ├── Day1s.tsx           # Chapter 4: Day 1s
│   ├── TheVibe.tsx         # Chapter 5: The Vibe
│   ├── ChaptersGallery.tsx # Chapter navigation
│   ├── Cake.tsx            # Interactive cake section
│   ├── MusicPlayer.tsx     # Music player controls
│   ├── MediaFrame.tsx      # Image/Video renderer
│   ├── Candle.tsx          # Candle animation
│   ├── Gate.tsx            # Gate decoration
│   ├── MemoryLane.tsx      # Memory section
│   └── ScatterGallery.tsx  # Alternative gallery layout
├── public/
│   ├── images/             # All chapter images & videos
│   └── music/              # Bruno Mars audio
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Chapters Overview

### Chapter 1: The Scholar
- **Images:** scientist-1.jpeg, scientist-2.jpeg (side-by-side)
- **Layout:** Dual portrait with text content
- **Theme:** Clean, white/green palette
- **Vibe:** Academic elegance

### Chapter 2: The Believer
- **Images:** jesus_girl.jpeg, jesus_girl-1.jpeg
- **Layout:** Diptych (overlapping cards)
- **Theme:** Warm gold/amber glow
- **Vibe:** Spiritual light

### Chapter 3: The Explorer
- **Images:** travel-1.jpeg, travel-2.jpeg, travel-3.jpeg
- **Layout:** Interactive fan-stack (swipeable)
- **Theme:** Ocean blue
- **Vibe:** Wanderlust and discovery

### Chapter 4: Day 1s (Us)
- **Media:** Videos & photos from mall, cinema, and moments
- **Layout:** Bento grid (6 slots mixed media)
- **Theme:** Deep purple/velvet
- **Vibe:** Intimate shared memories

### Chapter 5: The Vibe
- **Images:** food-1.jpeg, nature.jpeg, foodie-2.jpeg, nature-2.jpeg
- **Layout:** Scattered polaroids (chaos)
- **Theme:** Purple/indigo
- **Vibe:** Carefree joy and simplicity

## 🎵 Music Integration

- **Track:** "Just the Way You Are" by Bruno Mars
- **Location:** `/public/music/song.mp3`
- **Player:** Bottom-right glassmorphic widget
- **Controls:** Play/Pause, Mute, Progress display
- **Auto-start:** Only after "Enter Celebration" click

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)
1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Deploy (automatic)

### Deploy to GitHub Pages
1. Update `next.config.js` with `output: 'export'`
2. Run `npm run deploy`
3. Enable GitHub Pages in repository settings

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 📊 Performance

- **Bundle Size:** ~51 kB
- **First Load JS:** 153 kB
- **Build Time:** ~18-23 seconds
- **Optimization:** Next.js automatic code splitting

## 🎯 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive breakpoints for all screen sizes
- Touch-friendly interactions
- Mobile Safari video autoplay support
- Optimized animations for mobile performance

## 🔧 Development

### TypeScript Checking
```bash
npx tsc --noEmit
```

### Build Verification
```bash
npm run build
```

### Format Code (if configured)
```bash
npm run format
```

## 📝 Environment Variables

Optional `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🐛 Known Issues & Fixes

### Hydration Warning
- Caused by browser extensions
- Fixed by `suppressHydrationWarning` on body tag
- Safe to ignore in development

### Music Not Playing Immediately
- Browser autoplay policies require user interaction
- Click "Enter Celebration" to start playback
- Works in all modern browsers

### Mobile Safari Video
- `playsInline`, `muted`, `loop` attributes ensure compatibility
- Mobile autoplay requires muted attribute

## 🎁 Customization

### Change Colors
Edit chapter color themes in `components/ScatterGallery.tsx`

### Update Images
Replace files in `public/images/` (maintain same filenames)

### Change Music
Replace `/public/music/song.mp3` with your track

### Modify Text
Update captions and content in individual chapter components

## 📞 Support & Feedback

For questions or suggestions, check the deployment guide or review the Next.js documentation.

---

**Made with 💜 for Grace's Birthday** | 🎂 2026
