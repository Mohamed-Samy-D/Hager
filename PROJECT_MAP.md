# PROJECT_MAP.md — Hager Love Website

## [TECH_STACK]

```
Runtime:     Node.js 22.x+ (Vite 8 requirement)
Bundler:     Vite 8.1.4 (Rolldown — Rust-based)
UI:          React 19.2.7 + TypeScript 5.8
Styling:     Tailwind CSS 4.3.2 (@tailwindcss/vite)
Animation:   Motion 12.42.2 (scroll, entrance, gestures)
Icons:       Lucide React 1.24.0
Fonts:       Google Fonts (Playfair Display + Inter + Amiri)
```

## [SYSTEM_FLOW]

```
index.html → main.tsx → App.tsx
  ├── Navbar        — sticky nav, scroll spy, dark cinematic style
  ├── Hero          — 0.mp4 video bg + cinematic name reveal
  ├── About         — 1.mp4 video bg + photo placeholder + text
  ├── Gallery       — 2.mp4 video bg + photo grid + lightbox
  ├── LoveStory     — 3.mp4 video bg + vertical timeline
  ├── Reasons       — dark gradient bg + glassmorphism cards
  ├── Letter        — last.mp4 video bg + love letter + Arabic poetry
  └── Footer        — canvas heart particles + credits
```

## [ARCHITECTURE]

```
Pattern:      Feature-based component folders (src/components/Name/Name.tsx)
Layout:       Presentation-style with CSS scroll-snap (each section = full-screen slide)
State:        Local (useState/useRef) — no global store
Animation:    Declarative via Motion (scroll-triggered, spring, fade)
Styling:      Utility-first (Tailwind 4) + CSS custom properties via @theme
Routing:      None — single page, scroll-snap navigation
Data:         Static constants in src/lib/constants.ts
Assets:       /public/ (0.mp4, 1.mp4, 2.mp4, 3.mp4, last.mp4), /public/images/ (user photos)
Hooks:        src/hooks/useScrollSpy.ts (IntersectionObserver-based)
```

## [FILE_MAP]

```
src/
├── main.tsx                         — React entry, renders <App />
├── App.tsx                          — Root layout, composes all sections
├── index.css                        — Tailwind v4 @import, @theme tokens, globals
├── vite-env.d.ts                    — Vite client type reference
├── lib/
│   └── constants.ts                 — All static data (nav, story, reasons, letter, gallery)
├── hooks/
│   └── useScrollSpy.ts             — IntersectionObserver scroll spy
└── components/
    ├── Navbar/Navbar.tsx            — Sticky nav + mobile menu + scroll spy
    ├── Hero/Hero.tsx                — Canvas particles + floating hearts + name animation
    ├── About/About.tsx              — Photo placeholder + about text
    ├── Gallery/Gallery.tsx          — Photo grid + lightbox modal
    ├── LoveStory/LoveStory.tsx      — Timeline with scroll-triggered nodes
    ├── Reasons/Reasons.tsx          — "Why I love you" reason cards
    ├── Letter/Letter.tsx            — Love letter with scroll reveal
    └── Footer/Footer.tsx            — Canvas hearts + credits
```

## [COMMANDS]

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## [ORPHANS & PENDING]

- [ ] Replace placeholder images in `public/images/` with Hager's actual photos
- [ ] Update `GALLERY_IMAGES` in `constants.ts` with real image paths
- [ ] Update `About.tsx` photo section with actual image
- [ ] Customize `STORY_MILESTONES` with real dates and events from your relationship
- [ ] Customize `REASONS` with your personal reasons
- [x] Customize `LETTER_TEXT` with love letter + Arabic poetry
- [ ] Adjust `NAV_LINKS` labels if needed
- [ ] Add Open Graph meta tags for social sharing
- [ ] Deploy to hosting (Vercel/Netlify/Cloudflare Pages)
