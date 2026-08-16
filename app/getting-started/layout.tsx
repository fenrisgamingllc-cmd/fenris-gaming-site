import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started & FAQ | Fenris Gaming Hall',
  description:
    'New player guide and FAQ for Fenris Gaming Hall in Hagerstown, MD. How to get started with Warhammer, Magic, Pokémon, and more.',
  alternates: {
    canonical: '/getting-started',
  },
};

export default function GettingStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
