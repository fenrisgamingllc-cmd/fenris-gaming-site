# Fenris Gaming — Official Website

A modern, fast, community-focused marketing site for **Fenris Gaming Hall** (Hagerstown, MD).

Built with Next.js 15, TypeScript, Tailwind, and love for the local tabletop scene.

## Features

- Beautiful dark gaming aesthetic (Space Wolves / Fenris inspired)
- Home with hero + live upcoming events
- Full Events page with list + calendar views + category filters
- About the store and the four owners
- Community story / “third space” philosophy
- Contact page with a mailto form + Google Maps embed + hours
- Prominent links to Shopify store + TCGplayer (update the TCGplayer URL!)
- Mobile-first responsive nav
- Event detail modals with one-click Discord RSVP

## Quick Start (for developers / the team)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the dev server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

3. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Customization Checklist (very important)

### 1. TCGplayer Link
Updated to: https://fenrisgamingllc.tcgplayerpro.com/

Used in:
- `components/Navbar.tsx` (desktop + mobile)
- `app/page.tsx` (hero CTA)

### 2. Contact Form
The contact form at `/contact` validates the fields and opens a `mailto:` to the store email (`fenrisgamingllc@gmail.com`). It does not post to a form backend. A hosted inbox (Formspree or similar) needs a free account and a form id; don't commit that id as a secret.

### 3. Photos & Logo
Navbar and footer use the real Fenris wolf mark at `public/images/fenris-logo.jpg` (the same artwork as the Shopify theme logo). Favicons are `app/icon.png` and `app/apple-icon.png`. Social sharing uses `public/og-image.jpg`, the store's own logo card. `public/logo.svg` is an unused hand-drawn sketch and is not shown on the site.

### 4. Hours (if they change)
Update the hours arrays in:
- `components/Footer.tsx`
- `app/contact/page.tsx`

### 5. Events Data
All events live in `lib/events.ts`. Easy to edit/add/remove. Dates are calculated relative to today so the site always looks fresh.

### 6. Google Maps (optional polish)
The map embed in contact is a generic one. Replace the `src` with an embed generated from Google Maps for the exact address if you want a more precise pin.

## Deploy (recommended: Vercel — free & perfect)

1. Push this repo to GitHub
2. Go to https://vercel.com → Import Project → select the repo
3. Deploy (zero config needed)

Every push to `main` will redeploy automatically.

## Tech Notes

- No heavy state management — pure React + hooks
- Event modals and calendar are client-side only
- Very fast static generation where possible
- Easy to later add MDX blog, real calendar integration, or Shopify Hydrogen storefront

## Questions?

Reach out in the Fenris Discord or email fenrisgamingllc@gmail.com

---

**Built for the Hagerstown tabletop community. Roll dice, make friends.**
