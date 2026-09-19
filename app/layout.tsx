import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const GOOGLE_ADS_ID = 'AW-18461862581';

export const metadata: Metadata = {
  metadataBase: new URL('https://fenrisgamingllc.com'),
  title: 'Fenris Gaming | Tabletop Gaming Hall in Hagerstown, MD',
  description: 'Your premier destination for Warhammer 40k, Age of Sigmar, Horus Heresy, Magic: The Gathering, Pokémon TCG, One Piece TCG, Gundam Card Game, Bolt Action, and more. A welcoming community gaming hall in Hagerstown, Maryland with events, open play, and great deals on new & used models and trading cards.',
  icons: {
    icon: [
      { url: '/icon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Fenris Gaming Hall | Hagerstown, MD',
    description: 'Community-first tabletop gaming hall in Hagerstown, MD. Events and product for Warhammer 40k, Age of Sigmar, Horus Heresy, MTG, Pokémon TCG, One Piece TCG, Gundam TCG, Bolt Action & more. We buy and sell used models and trading cards at great prices.',
    images: [{ url: '/og-image.jpg' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#05070f] text-[#e2e8f0]">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
