'use client';

import { useSiteContent } from '@/lib/content';

export function AboutHeroText() {
  const { content: siteContent } = useSiteContent();

  return (
    <p className="max-w-xl text-xl text-[#94a3b8]">
      {siteContent.about?.introText || 
        'What began as a small group of friends in a living room has become Western Maryland’s premier tabletop gaming destination.'}
    </p>
  );
}

export function AboutGrandOpeningText() {
  const { content: siteContent } = useSiteContent();

  return (
    <p className="text-[#94a3b8] max-w-3xl">
      {siteContent.about?.grandOpeningText || 
        'On Halloween 2025 we cut the ribbon at 11375 Robinwood Drive. Surrounded by family, friends, and the entire local gaming community, we officially opened the space we had dreamed of for over a decade. The hall was designed by gamers, for gamers — with room for large Warhammer tables, comfortable seating, and a true “third space” feel for players of 40k, Horus Heresy, MTG, Pokémon, One Piece, Gundam Card Game, Bolt Action, Star Wars Unlimited, and more.'}
    </p>
  );
}
