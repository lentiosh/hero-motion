# hero-motion

> Instagram promotional & marketing video templates built with [Remotion](https://remotion.dev).

## Compositions

| ID | Format | Size | Duration | Theme |
|----|--------|------|----------|-------|
| `InstagramStory` | Story / Reel | 1080×1920 (9:16) | 15s | Neon |
| `InstagramStory_Gold` | Story / Reel | 1080×1920 (9:16) | 15s | Gold / Luxury |
| `InstagramReel` | Reel | 1080×1920 (9:16) | 5s | Sunset |
| `InstagramPost` | Post | 1080×1080 (1:1) | 8s | Ocean / Tech |
| `InstagramPost_Forest` | Post | 1080×1080 (1:1) | 8s | Forest / Eco |
| `PromoVideo` | Story / Reel | 1080×1920 (9:16) | 7s | Neon (4-scene promo with countdown) |
| `SaleAnnouncement` | Post | 1080×1080 (1:1) | 6s | Sunset (animated discount counter) |

## Color Palettes

| Name | Feel | Use for |
|------|------|---------|
| `neon` | Purple to pink | Youth, streetwear, tech startups |
| `sunset` | Red to orange | Lifestyle, food, beauty |
| `ocean` | Dark blue to indigo | SaaS, finance, tech |
| `forest` | Deep green | Eco, health, wellness |
| `gold` | Black to dark gold | Luxury, fashion, premium |

## Local development

```bash
npm install
npm run start          # Opens Remotion Studio at http://localhost:3000
```

## Render a video locally

```bash
# Single composition
npm run render:story
npm run render:reel
npm run render:post
npm run render:promo

# All compositions at once
npm run render:all
```

Rendered files are saved to `out/`.

## GitHub Actions — Cloud rendering

Every push to `main` automatically:
1. Renders all 7 compositions as MP4 files
2. Uploads them as a build artifact (retained 30 days)
3. Creates a GitHub Release with the MP4s attached

You can also trigger a single composition via **Actions → Render Instagram Videos → Run workflow** and fill in the composition ID.

## GitHub Pages — Live preview

After enabling GitHub Pages (Settings → Pages → Source: GitHub Actions), every push to `main` deploys an interactive Remotion Player where you can preview all compositions in your browser — no downloads required.

## Customising a template

All compositions accept props. For example:

```tsx
// src/Root.tsx — edit defaultProps for any composition
<Composition
  id="InstagramStory"
  defaultProps={{
    brandName: "YourBrand",
    headline: "Your Headline Here",
    ctaText: "Swipe Up",
    paletteName: "gold",   // neon | sunset | ocean | forest | gold
  }}
/>
```

## Project structure

```
hero-motion/
├── src/
│   ├── index.ts                    Entry point
│   ├── Root.tsx                    All composition registrations
│   ├── compositions/
│   │   ├── InstagramStory.tsx      9:16 story template
│   │   ├── InstagramReel.tsx       9:16 multi-scene reel
│   │   ├── InstagramPost.tsx       1:1 post with progress bars
│   │   ├── PromoVideo.tsx          4-scene full promo video
│   │   └── SaleAnnouncement.tsx    Animated sale/discount post
│   ├── components/
│   │   ├── Background.tsx          Animated gradient orbs + grid
│   │   ├── AnimatedTitle.tsx       Word-by-word spring title
│   │   ├── AnimatedSubtitle.tsx    Fade-in subtitle
│   │   ├── CallToAction.tsx        Pulsing CTA button
│   │   ├── LogoReveal.tsx          Brand icon + name reveal
│   │   ├── AnimatedBadge.tsx       Glowing label badge
│   │   ├── CountdownTimer.tsx      Live countdown (DD:HH:MM:SS)
│   │   ├── StatCard.tsx            Animated metric card
│   │   └── ProgressBar.tsx         Animated fill bar
│   └── helpers/
│       ├── animations.ts           Spring/interpolate helpers
│       └── colors.ts               Color palette definitions
├── .github/workflows/
│   ├── render.yml                  Cloud render + GitHub Release
│   └── deploy-preview.yml          GitHub Pages player deploy
├── remotion.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT © Lentio Sechou
