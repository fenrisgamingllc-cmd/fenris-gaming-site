'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { events } from '@/lib/events';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import type { GameEvent } from '@/lib/events';
import { Calendar, MapPin, ArrowRight, Sword } from 'lucide-react';

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<GameEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lightbox for Community Photos
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCategory, setLightboxCategory] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Show the next 4 upcoming events, sorted by date
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  // Community Photos Data - grouped by category for lightbox
  const communityPhotos = {
    "The Gaming Hall": [
      "/images/The Gaming Hall/IMG_0790.jpeg",
      "/images/The Gaming Hall/IMG_1280.jpeg",
      "/images/The Gaming Hall/IMG_9018.jpeg",
    ],
    "Warhammer 40K & Horus Heresy": [
      "/images/Warhammer 40K & Horus Heresy/IMG_0744.jpeg",
      "/images/Warhammer 40K & Horus Heresy/IMG_0753.jpeg",
      "/images/Warhammer 40K & Horus Heresy/IMG_8704.jpeg",
    ],
    "Community Nights": [
      "/images/Community Nights/20250517_131409.jpg",
      "/images/Community Nights/IMG_0078.jpeg",
      "/images/Community Nights/IMG_8712.jpeg",
    ],
    "D&D Nights": [
      "/images/D&D Nights/IMG_0074.jpeg",
      "/images/D&D Nights/IMG_1538.JPG",
      "/images/D&D Nights/IMG_2730.JPG",
    ],
    "Magic & Card Games": [
      "/images/Magic & Card Games/IMG_0757.jpeg",
      "/images/Magic & Card Games/IMG_8698.jpeg",
      "/images/Magic & Card Games/IMG_9054.jpeg",
    ],
    "Busy Nights": [
      "/images/Busy Nights/IMG_0077.jpeg",
      "/images/Busy Nights/IMG_8990.jpeg",
      "/images/Busy Nights/IMG_9546.jpeg",
    ],
  };

  const openLightbox = (category: string, index: number) => {
    setLightboxCategory(category);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrev = () => {
    const photos = communityPhotos[lightboxCategory as keyof typeof communityPhotos];
    if (!photos) return;
    setLightboxIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    const photos = communityPhotos[lightboxCategory as keyof typeof communityPhotos];
    if (!photos) return;
    setLightboxIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard support for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      }
      if (e.key === 'ArrowLeft') {
        goToPrev();
      }
      if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxCategory]);

  const openEvent = (event: GameEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Keep selected for animation
    setTimeout(() => setSelectedEvent(null), 200);
  };

  return (
    <div>
      {/* Hero — Powerful, Premium & Atmospheric */}
      <div className="hero relative min-h-[92vh] flex items-center overflow-hidden border-b border-[#1f2535]">
        {/* Background Image */}
        <img
          src="/images/war-gaming-01.jpg"
          alt="Busy wargaming tables full of players and detailed miniatures at Fenris Gaming Hall"
          className="hero-image absolute inset-0 w-full h-full object-cover z-0"
          loading="eager"
          fetchPriority="high"
        />

        {/* Strong Dark Overlay (65-75% opacity black gradient) for maximum readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/68 to-black/75 z-5" />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pt-20 pb-28 relative z-20">
          <div className="max-w-4xl">
            {/* Top badge */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 px-6 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-[11px] tracking-[4px] font-medium text-[#c5a46e] mb-8"
            >
              HAGERSTOWN, MARYLAND • EST. 2022
            </motion.div>

            {/* Extremely Large & Bold Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
              className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem] leading-[0.95] font-black tracking-[-3.5px] text-white mb-4"
              style={{
                textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 12px 40px rgba(0,0,0,0.75)'
              }}
            >
              Fenris Gaming Hall
            </motion.h1>

            {/* Elegant Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[1.35rem] sm:text-[1.65rem] lg:text-[1.85rem] text-white/95 tracking-[-0.4px] mb-10 font-medium"
              style={{ textShadow: '0 3px 12px rgba(0,0,0,0.85)' }}
            >
              Your Table Awaits
            </motion.p>

            {/* Game Systems Line */}
            <div className="mb-10 text-[#c5a46e] text-sm tracking-[1.8px] font-medium opacity-90">
              Warhammer 40k • Age of Sigmar • Horus Heresy • Magic • Pokémon • One Piece • Gundam Card Game • Bolt Action • Star Wars Unlimited
            </div>

            {/* Large, Bold, High-Contrast CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/events"
                className="btn-primary px-10 h-14 text-base"
              >
                Explore Events
              </Link>

              <a
                href="https://fenrisgamingllc.com/collections/all"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 h-14 text-base"
              >
                Shop Models
              </a>

              <a
                href="https://fenrisgamingllc.com/collections/sideshow"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 h-14 text-base"
              >
                Shop Collectibles
              </a>

              <a
                href="https://discord.gg/AGnfaCStVA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-discord px-10 h-14 text-base"
              >
                Join the Discord
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom atmospheric line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5a46e]/40 to-transparent z-20" />
      </div>

      {/* Trust Bar — Responsive & Clean on Mobile */}
      <div className="border-b border-[#1f2535] bg-[#05070f]">
        <div className="max-w-6xl mx-auto px-5 py-4 md:py-0 md:h-16 flex flex-col md:flex-row items-center justify-center gap-y-2 md:gap-y-0 md:gap-x-8 text-sm text-[#94a3b8] tracking-[1px] text-center">
          <div>2,000+ sq ft of play space</div>
          <div className="hidden md:block w-px h-3.5 bg-[#1f2535]" />
          <div>Open 7 days a week</div>
          <div className="hidden md:block w-px h-3.5 bg-[#1f2535]" />
          <div>Warhammer 40k • Horus Heresy • MTG • Pokémon • One Piece • Gundam Card Game • Bolt Action • Star Wars Unlimited</div>
        </div>
      </div>

      {/* Used Models Callout — Strong & Visible */}
      <div className="bg-[#0a0d18] border-b border-[#1f2535]">
        <div className="max-w-6xl mx-auto px-5 py-5 text-center">
          <p className="text-base text-[#e2e8f0]">
            <span className="font-semibold text-[#c5a46e]">We buy and sell used models and trading cards at great prices</span> — 
            excellent discounts and affordable entry options for new players and collectors.
          </p>
        </div>
      </div>

      {/* Premium Collectibles — Sideshow & Hot Toys */}
      <div className="bg-[#0a0d18] border-b border-[#1f2535]">
        <div className="max-w-3xl mx-auto px-5 py-10 md:py-14 text-center">
          <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-2">PREMIUM COLLECTIBLES</div>
          <h3 className="text-3xl md:text-[2.75rem] font-semibold tracking-[-1.75px] mb-4 text-white">
            Sideshow &amp; Hot Toys
          </h3>
          <p className="text-[#94a3b8] text-[15px] md:text-base leading-relaxed max-w-xl mx-auto mb-8">
            High-end sixth-scale and premium collectible figures. Limited authentic pieces from Sideshow and Hot Toys with exceptional detail.
          </p>
          <a
            href="https://fenrisgamingllc.com/collections/sideshow"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-9 h-12 text-sm"
          >
            Shop Collectibles
          </a>
        </div>
      </div>

      {/* Upcoming Events Preview — Elevated */}
      <div className="section max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-9">
          <div>
            <div className="uppercase tracking-[2.5px] text-xs font-semibold text-[#c5a46e] mb-1.5">THIS WEEK AT THE HALL</div>
            <h2 className="text-5xl font-semibold tracking-[-2.5px]">Events &amp; Battles</h2>
          </div>
          <Link href="/events" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#c5a46e] hover:text-white transition-colors group">
            Full calendar <ArrowRight size={15} className="group-hover:translate-x-0.5 transition" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={openEvent} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="btn-secondary px-8 h-12 text-sm border-[#c5a46e]/40 hover:border-[#c5a46e]"
          >
            View Full Calendar &amp; RSVP
          </Link>
        </div>
      </div>

      {/* Why Fenris — Stronger Statement */}
      <div className="surface border-y border-[#1f2535] py-20">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-3">A LEGACY OF PLAY</div>
          <h2 className="text-5xl font-semibold tracking-[-2.2px] mb-6">Built by gamers,<br />for gamers.</h2>
          <p className="text-[#94a3b8] text-lg max-w-xl mx-auto">
            After twelve years of running a home gaming club, we finally built the hall we always wanted — 
            massive tables, incredible terrain, expert staff, and a truly welcoming community for Warhammer 40k, Age of Sigmar, Horus Heresy, Magic, Pokémon TCG, One Piece, Gundam Card Game, Bolt Action, Star Wars Unlimited, and more.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-9">
            <Link href="/about" className="btn-secondary px-7 h-12 text-sm">
              Meet the Owners
            </Link>
            <Link href="/community" className="btn-primary px-7 h-12 text-sm">
              Why This Place Matters
            </Link>
          </div>
        </div>
      </div>

      {/* New Player Teaser — Drives traffic to full Getting Started guide */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 border-t border-[#1f2535]">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-2">NEW TO TABLETOP?</div>
          <h2 className="text-4xl font-semibold tracking-[-1.5px] mb-4">Not sure where to start?</h2>
          <p className="text-[#94a3b8] text-lg">
            We wrote the guide we wish we had when we were beginners. Real answers about Warhammer 40k, Age of Sigmar, Horus Heresy, Magic: The Gathering, Pokémon TCG, One Piece TCG, Gundam Card Game, Bolt Action, Star Wars Unlimited, used models & cards at great prices, and what it’s actually like to walk in the door.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {[
            { q: "What games do we support?", a: "Warhammer 40k, Age of Sigmar, Horus Heresy, MTG, Pokémon, One Piece TCG, Gundam Card Game, Bolt Action, Star Wars Unlimited & more. Great deals on new & used too." },
            { q: "How do I get into Magic?", a: "Start with Commander. We run Friday Night Magic every week and have a very welcoming community." },
            { q: "Do I need to bring anything?", a: "We have tables and terrain. For Warhammer and most minis games, players bring their own models, dice, and supplies. Plenty of room to bring what you need." },
          ].map((item, i) => (
            <div key={i} className="card p-6 rounded-3xl text-left">
              <div className="font-semibold text-lg tracking-tight mb-2">{item.q}</div>
              <p className="text-[#94a3af] text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/getting-started" 
            className="inline-flex items-center gap-2 btn-primary px-9 h-12 text-base group"
          >
            Read the full New Player Guide <ArrowRight size={18} className="group-hover:translate-x-0.5 transition" />
          </Link>
          <p className="text-xs text-[#64748b] mt-3">No experience required. Everyone starts somewhere.</p>
        </div>
      </div>

      {/* Link to Community Page */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 text-center">
        <Link 
          href="/community" 
          className="inline-flex items-center gap-2 text-[#c5a46e] hover:text-white transition-colors text-lg"
        >
          Explore the full community gallery and stories →
        </Link>
      </div>

      {/* Lightbox Modal for Community Photos */}
      {isLightboxOpen && communityPhotos[lightboxCategory as keyof typeof communityPhotos] && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-6xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-3xl transition-colors z-10"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={communityPhotos[lightboxCategory as keyof typeof communityPhotos][lightboxIndex]}
                alt={`Photo ${lightboxIndex + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>

            {/* Navigation */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-colors px-4 py-2"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl transition-colors px-4 py-2"
            >
              →
            </button>

            {/* Counter */}
            <div className="text-center mt-4 text-white/60 text-sm">
              {lightboxIndex + 1} / {communityPhotos[lightboxCategory as keyof typeof communityPhotos].length} — {lightboxCategory}
            </div>
          </div>
        </div>
      )}

      {/* Final CTA — Stronger, more atmospheric close */}
      <div className="max-w-xl mx-auto px-5 py-20 text-center">
        <div className="text-[#c5a46e] text-xs tracking-[3px] mb-2">NO EXPERIENCE REQUIRED</div>
        <h3 className="text-4xl font-bold tracking-[-1.8px] mb-4">The tables are waiting.</h3>
        <p className="text-[#94a3b8] mb-8 text-lg">Whether you’re brand new or a 20-year veteran — your first game is always free. Great deals on used models and cards too.</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn-secondary px-8 h-12 text-sm">
            Plan Your First Visit
          </Link>
          <a 
            href="https://discord.gg/AGnfaCStVA" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary px-8 h-12 text-sm"
          >
            Join the Discord
          </a>
        </div>
      </div>

      {/* Google Reviews CTA — Prominent & Trustworthy */}
      <div className="max-w-md mx-auto px-5 pb-16 text-center">
        <a
          href="https://share.google/Nrg292J2oXBtKHvpb" // Google Reviews link
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-[#d1d5db] bg-white px-6 py-4 shadow-sm transition-all hover:shadow-md active:scale-[0.985]"
        >
          <div className="flex items-center gap-3">
            {/* Google "G" logo */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] text-white text-sm font-bold shadow-sm ring-1 ring-black/5">
              G
            </div>
            <div className="text-left">
              <div className="font-semibold text-[#202124] tracking-[-0.2px]">See Our Google Reviews</div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-[#fbbc05]">★★★★★</span>
                <span className="text-[#5f6368]">4.9/5 from 180+ reviews</span>
              </div>
            </div>
          </div>
        </a>
        <p className="mt-3 text-xs text-[#64748b]">Trusted by gamers across Hagerstown and beyond</p>
      </div>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
