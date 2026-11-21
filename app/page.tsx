import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

// Regenerate the prerendered "This week" dates at least daily. The client
// still advances the clock after hydration, so a visitor isn't stuck on the
// previous day's HTML until the next revalidation.
export const revalidate = 86400;

const PAGE_TITLE = 'Fenris Gaming | Tabletop Gaming Hall in Hagerstown, MD';

/** 156 characters. Brand, place, and the offers already stated on the site. */
const HOME_DESCRIPTION =
  'Fenris Gaming is a community tabletop gaming hall in Hagerstown, Maryland, with events, open play, and great deals on new and used models and trading cards.';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: HOME_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['HobbyShop', 'Store', 'LocalBusiness'],
  name: 'Fenris Gaming Hall',
  url: 'https://fenrisgamingllc.com',
  logo: 'https://fenrisgamingllc.com/images/fenris-logo.jpg',
  image: 'https://fenrisgamingllc.com/images/war-gaming-01.jpg',
  telephone: '(240) 217-2784',
  email: 'fenrisgamingllc@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11375 Robinwood Drive, College Plaza',
    addressLocality: 'Hagerstown',
    addressRegion: 'MD',
    postalCode: '21742',
  },
  openingHours: ['Mo-Fr 12:00-21:00', 'Sa-Su 10:00-21:00'],
  sameAs: [
    'https://www.instagram.com/fenris_gaming_llc',
    'https://www.facebook.com/fenrisgamingllc',
    'https://discord.gg/AGnfaCStVA',
  ],
};

const businessJsonLdText = JSON.stringify(businessJsonLd);
JSON.parse(businessJsonLdText);

export default function Page() {
  const simulated = process.env['SIMULATE_NOW'];
  const initialNow = simulated || new Date().toISOString();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLdText }} />
      <HomePage initialNow={initialNow} />
    </>
  );
}
