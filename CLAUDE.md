# Viveo Client

Cameo-like platforma za personalizovane video poruke od srpskih zvezda. Ovo je glavni frontend.

## Tech Stack
- Next.js 16.1.6 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (custom theme u globals.css: primary=purple, secondary=amber, accent=emerald)
- Framer Motion za animacije, Embla Carousel
- Nema external UI library — sve komponente su custom

## Projekat struktura
- `src/app/` — App Router stranice (srpski URL-ovi: /zvezde, /zvezda/[slug], /naruci/[slug], /zvezda-panel, /moje-porudzbine, /prijava, /registracija, /postani-zvezda, /kategorija/[slug], /o-nama, /kontakt)
- `src/components/` — auth, catalog, dashboard (zvezda), fan-dashboard, landing, layout, order, profile, ui
- `src/lib/api/` — API client (client.ts), auth.ts, celebrities.ts, dashboard.ts, orders.ts, reviews.ts, applications.ts
- `src/lib/types.ts` — svi TypeScript tipovi
- `src/lib/utils.ts` — cn(), formatPrice(), getPlaceholderImage(), truncate()
- `src/context/AuthContext.tsx` — auth state (localStorage: viveo_access_token, viveo_user)

## Povezani projekti
- **viveo-backend** (`../viveo-backend`) — Express 5 API na portu 3001
- **viveo-admin** (`../viveo-admin`) — Admin panel (zasebna Next.js app)

## API
- Backend: `NEXT_PUBLIC_API_URL=http://localhost:3001/api`
- Production backend: `viveo-backend-production.up.railway.app`
- Production frontend: `viveo-client.vercel.app`

## Git
- Grana `development` je radna grana, `main` je production
- Uvek radi na `development` pa merge u `main`

## Važne napomene
- Srpski jezik svuda (UI, URL-ovi, metadata)
- Auth: Supabase Auth sa JWT tokenima, 3 uloge: fan, star, admin
- Nema payment integracije (Stripe ne radi u Srbiji, rešava se lokalno)
- SEO: sitemap.ts, robots.ts, JSON-LD za Organization, Celebrity, CategoryItemList
- Video upload: Supabase Storage (bucket "videos"), signed URL za playback
- Email: Resend (backend šalje, free tier: samo na registrovani email milanjulinac996@gmail.com dok nema verified domain)
