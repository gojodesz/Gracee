# Deployment Guide: Birthday Site

This guide covers deploying your Next.js birthday site to **GitHub Pages** and **Vercel**.

---

## 🚀 Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the creator of Next.js and provides seamless deployment with zero configuration.

### Step 1: Push to GitHub
```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/next-birthday.git

# Rename branch to main (optional but recommended)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository (`next-birthday`)
4. Vercel will auto-detect it's a Next.js project
5. Click **"Deploy"**
6. Your site will be live at `https://your-project.vercel.app`

### Step 3: Custom Domain (Optional)
1. In Vercel Dashboard, go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records with Vercel's nameservers

**Advantages:**
- ✅ One-click deployment
- ✅ Automatic builds on push
- ✅ Preview deployments
- ✅ Edge functions support
- ✅ Environment variables easy to manage

---

## 📘 Option 2: Deploy to GitHub Pages

GitHub Pages hosts static sites directly from your repository.

### Step 1: Update next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '', // Leave empty for user/org pages, or '/repo-name' for project pages
};

module.exports = nextConfig;
```

### Step 2: Add .gitignore entries
```
.next/
out/
```

### Step 3: Add deployment script to package.json
```json
{
  "scripts": {
    "build": "next build",
    "export": "next build && next export",
    "deploy": "npm run export && gh-pages -d out"
  }
}
```

### Step 4: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 5: Create GitHub Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/next-birthday.git
git branch -M main
git push -u origin main
```

### Step 6: Configure GitHub Pages
1. Go to your repository **Settings → Pages**
2. Under **Source**, select `gh-pages` branch
3. Click **Save**

### Step 7: Deploy
```bash
npm run deploy
```

Your site will be live at `https://YOUR_USERNAME.github.io/next-birthday`

---

## 🔄 Continuous Deployment

### With Vercel (Automatic):
- Every push to `main` automatically deploys
- Pull requests get preview deployments
- Automatic rollback available

### With GitHub Pages (Manual):
```bash
npm run deploy  # Run this after each update
```

Or set up GitHub Actions for automatic deployment:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run export
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## 📋 Environment Setup

### For Vercel:
1. Create `.env.local` in root:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

2. In Vercel Dashboard, go to **Settings → Environment Variables** and add:
```
NEXT_PUBLIC_SITE_URL: https://your-domain.com
```

### For GitHub Pages:
Add to next.config.js if using subdirectory:
```javascript
const basePath = process.env.NODE_ENV === 'production' ? '/next-birthday' : '';
```

---

## ✅ Pre-Deployment Checklist

- [x] Build passes locally: `npm run build`
- [x] No TypeScript errors: `npx tsc --noEmit`
- [x] All images loading correctly
- [x] Music file path correct (`/music/song.mp3`)
- [x] Git initialized and committed
- [x] README.md created (optional)

---

## 🚨 Troubleshooting

### Images Not Loading After Deployment
- Ensure all image paths are absolute: `/images/file.jpeg`
- Check public folder is included in deployment
- Verify case sensitivity in filenames

### Music Not Playing
- Check browser autoplay policy (might need user interaction)
- Ensure `/music/song.mp3` exists in public folder
- Test in incognito mode (no extensions blocking)

### Hydration Errors on Deploy
- These are usually from browser extensions
- Add `suppressHydrationWarning` to `<body>` tag (already done)
- Clear browser cache

---

## 📈 Monitoring

### Vercel Analytics:
- Dashboard shows real-time metrics
- View deploy logs, edge function calls
- Set up error tracking

### GitHub Pages:
- No built-in analytics
- Use Google Analytics or similar
- Check deployment status in Actions tab

---

## Next Steps

1. **Choose your platform** (Vercel recommended)
2. **Follow the deployment steps**
3. **Test your live site**
4. **Share with Grace!** 🎂✨

---

## Support

For issues:
- **Vercel:** [Vercel Docs](https://vercel.com/docs)
- **GitHub Pages:** [GitHub Docs](https://docs.github.com/en/pages)
- **Next.js:** [Next.js Docs](https://nextjs.org/docs)
