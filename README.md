# Nex — marketing site

One-page site for Nex, a software studio in Erbil, Kurdistan. The site
uses a fixed two-system brand rhythm: **Volt Ink** for dark product moments and
**Porcelain + Blueprint** for service, contact, and detail surfaces.

Geist type · volt `#7C5CFF` signal · blueprint `#2457FF` rules · Lenis smooth scroll.

## Run

```bash
npm install      # install deps
npm run dev      # dev server → http://localhost:5173
npm run build    # typecheck + production build to dist/
```

## Contact form

The contact form posts to [Web3Forms](https://web3forms.com) (no backend needed).
Copy `.env.example` to `.env` and paste your free access key:

```bash
VITE_WEB3FORMS_KEY=your-key-here
```

Without a key the form still works in the UI and simulates a successful send.

## Stack

| | |
|---|---|
| Build | Vite + React + TypeScript |
| Animation | Framer Motion (reveals) · Lenis (smooth scroll) |
| Fonts | Geist · Geist Mono |

## Structure

- `src/components/ServiceModal.tsx` — full-screen service detail (opened from Services + Work buttons).
- `src/components/Contact.tsx` — contact form (Web3Forms).
- `src/components/{Hero,Services,Projects,WhyNex,Footer,Nav,Reveal}.tsx` — page sections + scroll-reveal helper.
- `src/components/{Devices,screens}.tsx` — CSS device frames + realistic mock product UIs.
- `src/data/content.ts` — all copy + service/project data (single source of truth).
- `src/index.css` — Volt Ink and Porcelain + Blueprint tokens + film-grain texture.

## Notes

- Respects `prefers-reduced-motion` for section reveal animations.
- Brand reference and original launch assets live in `_design/`.
- Instagram rhythm: 6 Volt Ink posts, then 6 Porcelain + Blueprint posts, then repeat.
- Device screen visuals are pure CSS; drop real renders/screenshots into `public/media/` to replace them.
