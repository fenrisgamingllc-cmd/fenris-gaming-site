'use client';

import React, { useState } from 'react';
import { Users, MessageCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

const categoryPhotos: Record<string, string[]> = {
  "The Gaming Hall": [
    "/images/The Gaming Hall/IMG_0790.jpeg",
    "/images/The Gaming Hall/IMG_1280.jpeg",
    "/images/The Gaming Hall/IMG_1311.jpeg",
    "/images/The Gaming Hall/IMG_1413.jpeg",
    "/images/The Gaming Hall/IMG_9018.jpeg",
    "/images/The Gaming Hall/IMG_9058.jpeg",
  ],
  "Warhammer 40K & Horus Heresy": [
    "/images/Warhammer 40K & Horus Heresy/20250517_131732.jpg",
    "/images/Warhammer 40K & Horus Heresy/IMG_0744.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_0746.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_0753.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_0754.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_0755.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_7999.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_8376.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_8704.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_8714.jpeg",
    "/images/Warhammer 40K & Horus Heresy/IMG_9548.jpeg",
  ],
  "Community Nights": [
    "/images/Community Nights/20250517_131409.jpg",
    "/images/Community Nights/IMG_0078 2.jpeg",
    "/images/Community Nights/IMG_0078.jpeg",
    "/images/Community Nights/IMG_0104.jpeg",
    "/images/Community Nights/IMG_0668.jpeg",
    "/images/Community Nights/IMG_5152.jpeg",
    "/images/Community Nights/IMG_5445.JPG",
    "/images/Community Nights/IMG_8712.jpeg",
    "/images/Community Nights/IMG_9056.jpeg",
  ],
  "D&D Nights": [
    "/images/D&D Nights/IMG_0074.jpeg",
    "/images/D&D Nights/IMG_0969.jpeg",
    "/images/D&D Nights/IMG_1538.JPG",
    "/images/D&D Nights/IMG_1972.JPG",
    "/images/D&D Nights/IMG_1988.JPG",
    "/images/D&D Nights/IMG_2730.JPG",
    "/images/D&D Nights/IMG_2919.JPG",
  ],
  "Magic & Card Games": [
    "/images/Magic & Card Games/IMG_0757.jpeg",
    "/images/Magic & Card Games/IMG_5182.JPG",
    "/images/Magic & Card Games/IMG_5270.JPG",
    "/images/Magic & Card Games/IMG_6333.JPG",
    "/images/Magic & Card Games/IMG_8698.jpeg",
    "/images/Magic & Card Games/IMG_8713.jpeg",
    "/images/Magic & Card Games/IMG_8920.jpeg",
    "/images/Magic & Card Games/IMG_9054.jpeg",
  ],
  "Busy Nights": [
    "/images/Busy Nights/IMG_0077.jpeg",
    "/images/Busy Nights/IMG_7651.jpeg",
    "/images/Busy Nights/IMG_8990.jpeg",
    "/images/Busy Nights/IMG_9546.jpeg",
  ],
};

export default function CommunityPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxCategory, setLightboxCategory] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (category: string) => {
    setLightboxCategory(category);
    setLightboxIndex(0);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrev = () => {
    const photos = categoryPhotos[lightboxCategory];
    if (!photos) return;
    setLightboxIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    const photos = categoryPhotos[lightboxCategory];
    if (!photos) return;
    setLightboxIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxCategory]);

  return (
    <div>
      {/* Hero section */}
      <div className="bg-[#111827] border-b border-[#374151] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="uppercase tracking-[3px] text-[#c5a46e] text-xs mb-3">THE THIRD SPACE</div>
          <h1 className="text-6xl font-bold tracking-tighter mb-4">More than a store.<br />A place to belong.</h1>
          <p className="text-xl text-[#9ca3af]">Fenris Gaming Hall was designed from day one to be the kind of place where you can walk in alone and leave with new friends and a great story.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Philosophy */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-semibold text-4xl tracking-tight mb-5">A gamer-designed layout</h2>
            <div className="space-y-4 text-[#cbd5e1]">
              <p>We built the hall with input from the very people who play here. Wide aisles. Plenty of natural light. Dedicated painting tables. Massive play surfaces with quality terrain for Warhammer 40k, Age of Sigmar, Horus Heresy and more. Comfortable seating for long Commander and other TCG nights.</p>
              <p>No one is ever “just a customer.” If you’re here, you’re part of the crew.</p>
            </div>
          </div>
          <div className="card rounded-3xl p-8 text-sm text-[#9ca3af]">
            “I started coming during the first week we opened. Within a month I had regular opponents for both 40k and Bolt Action, and now my kids play Pokémon here every Saturday. This place changed how I spend my free time — in the best way.”<br /><span className="text-[#c5a46e] mt-3 block">— Local dad &amp; new player</span>
          </div>
        </div>

        {/* What happens here */}
        <div>
          <div className="text-center mb-9">
            <h2 className="text-3xl font-semibold tracking-tight">What you’ll find at the hall</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Users />, title: "Open Play Every Day", desc: "Tables are almost always available. Bring a friend or find one here." },
              { icon: <MessageCircle />, title: "Active Discord", desc: "300+ members coordinating games, rides, and last-minute meetups." },
              { icon: <ImageIcon />, title: "Painting & Hobby", desc: "Dedicated hobby area + staff who actually know how to paint." },
              { icon: <Users />, title: "Events for All Levels", desc: "From absolute beginners to seasoned tournament players." },
            ].map((item, i) => (
              <div key={i} className="card p-6 rounded-3xl">
                <div className="text-[#c5a46e] mb-4">{item.icon}</div>
                <div className="font-semibold mb-1.5">{item.title}</div>
                <p className="text-sm text-[#9ca3af]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards - Click to open lightbox */}
        <div>
          <div className="text-center mb-10">
            <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-1.5">CAPTURED IN THE HALL</div>
            <h2 className="text-5xl font-black tracking-[-2.2px]">Moments from Fenris</h2>
            <p className="text-[#94a3b8] mt-3 max-w-lg mx-auto text-sm tracking-wide">Click any category to explore the photos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "The Gaming Hall",
                folder: "The Gaming Hall",
                thumbnail: "/images/The Gaming Hall/IMG_9018.jpeg",
                description: "The heart of the space — bright tables and welcoming energy."
              },
              {
                title: "Warhammer 40k and Horus Heresy",
                folder: "Warhammer 40K & Horus Heresy",
                thumbnail: "/images/Warhammer 40K & Horus Heresy/IMG_8704.jpeg",
                description: "Massive armies and epic narrative battles."
              },
              {
                title: "Community Nights",
                folder: "Community Nights",
                thumbnail: "/images/Community Nights/20250517_131409.jpg",
                description: "Friends, laughter, and good conversations."
              },
              {
                title: "D&D Nights",
                folder: "D&D Nights",
                thumbnail: "/images/D&D Nights/IMG_2730.JPG",
                description: "Deep storytelling and immersive campaigns."
              },
              {
                title: "Magic and Card Games",
                folder: "Magic & Card Games",
                thumbnail: "/images/Magic & Card Games/IMG_9054.jpeg",
                description: "Commander, drafts, and card game energy."
              },
              {
                title: "Busy Nights",
                folder: "Busy Nights",
                thumbnail: "/images/Busy Nights/IMG_8990.jpeg",
                description: "The hall at its most alive and electric."
              }
            ].map((category, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(category.folder)}
                className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#1f2535] cursor-pointer bg-[#0a0d18] transition-all hover:border-[#c5a46e]"
              >
                <img 
                  src={category.thumbnail} 
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white text-xl font-semibold tracking-tight mb-1">
                    {category.title}
                  </div>
                  <div className="text-[#c5a46e] text-sm">
                    {category.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && categoryPhotos[lightboxCategory] && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-6xl w-full"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-3xl transition-colors"
              >
                ✕
              </button>

              {/* Main Image */}
              <div className="relative flex items-center justify-center">
                <img
                  src={categoryPhotos[lightboxCategory][lightboxIndex]}
                  alt={`Photo ${lightboxIndex + 1} in ${lightboxCategory}`}
                  className="max-h-[80vh] w-full object-contain rounded-xl"
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-4xl px-4 py-2 rounded-full transition-colors"
              >
                ←
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-4xl px-4 py-2 rounded-full transition-colors"
              >
                →
              </button>

              {/* Counter */}
              <div className="text-center mt-4 text-white/70 text-sm">
                {lightboxIndex + 1} / {categoryPhotos[lightboxCategory].length} — {lightboxCategory}
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center bg-[#111827] border border-[#374151] rounded-3xl py-12 px-6">
          <h3 className="text-2xl font-semibold mb-3 tracking-tight">Come be part of something local and real.</h3>
          <p className="text-[#9ca3af] mb-7 max-w-md mx-auto">Whether you’ve never played a game in your life or you’re a 20-year veteran, the tables are waiting.</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#5865F2] text-white font-semibold hover:bg-[#4752C4]">
              Join the Discord Community
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full border border-[#374151] font-medium hover:bg-[#1f2937]">
              Plan Your First Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
