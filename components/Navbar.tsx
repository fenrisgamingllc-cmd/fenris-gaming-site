'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/community', label: 'Community' },
  { href: '/getting-started', label: 'Getting Started' },
  { href: '/contact', label: 'Contact' },
];

const shopLinks = [
  { href: 'https://fenrisgamingllc.com/collections/all', label: 'Shop Models' },
  { href: 'https://fenrisgamingllc.com/collections/sideshow', label: 'Collectibles' },
  { href: 'https://fenrisgamingllc.tcgplayerpro.com/', label: 'TCG Player' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-xl border-b border-[#1f2535]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Premium Logo — Replace /public/logo.svg with your real logo file */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" onClick={closeMenu}>
            {/* 
              REAL FENRIS LOGO
              Replace public/logo.png with your actual logo from the original site / Shopify.
              Transparent PNG recommended.
            */}
            {/* 
              Replace /public/logo.png (preferred) or /public/logo.svg 
              with your actual Fenris Gaming logo from Shopify or design files.
            */}
            <Image
              src="/images/fenris-logo.jpg"
              alt="Fenris Gaming Hall"
              width={0}
              height={0}
              unoptimized
              className="h-9 lg:h-10 w-auto object-contain invert transition-transform group-hover:scale-105"
            />
            <div className="leading-none">
              <div className="font-semibold text-2xl tracking-[-1.8px] text-white">FENRIS</div>
              <div className="hidden lg:block text-[10px] text-[#64748b] -mt-px font-medium tracking-[1.5px]">GAMING HALL</div>
            </div>
          </Link>

          {/* Desktop Navigation — Main Links (Left) */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[#cbd5e1] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side — Shop Group + Discord */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {/* Shop Group — Visually distinct cluster */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#c5a46e] text-[10px] font-semibold tracking-[2px] pr-1">SHOP</span>
              <div className="flex items-center gap-4 pl-3 border-l border-[#1f2535]">
                {shopLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-[#cbd5e1] hover:text-white text-xs lg:text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Discord CTA — Prominent */}
            <a
              href="https://discord.gg/AGnfaCStVA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-discord px-4 lg:px-5 py-2 text-xs lg:text-sm"
            >
              Join Discord
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-[#0f1320] text-[#cbd5e1] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — Premium Dark */}
      {isOpen && (
        <div className="md:hidden border-t border-[#1f2535] bg-[#05070f]">
          <div className="px-5 py-8 space-y-1 text-base">
            {/* Main Navigation */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block px-4 py-3.5 font-medium text-[#cbd5e1] hover:text-white hover:bg-[#0f1320] rounded-2xl transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Shop Group — Clearly separated */}
            <div className="pt-5 mt-5 border-t border-[#1f2535]">
              <div className="px-4 text-[#c5a46e] text-xs tracking-[2.5px] font-semibold mb-2">SHOP</div>
              <div className="space-y-1">
                <a
                  href="https://fenrisgamingllc.com/collections/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 font-medium text-[#cbd5e1] hover:text-white hover:bg-[#0f1320] rounded-2xl transition-colors"
                >
                  Shop Models
                </a>
                <a
                  href="https://fenrisgamingllc.com/collections/sideshow"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 font-medium text-[#cbd5e1] hover:text-white hover:bg-[#0f1320] rounded-2xl transition-colors"
                >
                  Collectibles
                </a>
                <a
                  href="https://fenrisgamingllc.tcgplayerpro.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block px-4 py-3 font-medium text-[#cbd5e1] hover:text-white hover:bg-[#0f1320] rounded-2xl transition-colors"
                >
                  TCG Player Store
                </a>
              </div>
            </div>

            {/* Discord CTA */}
            <div className="pt-6 mt-5 border-t border-[#1f2535]">
              <a
                href="https://discord.gg/AGnfaCStVA"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="btn-discord w-full py-3 text-sm justify-center"
              >
                Join the Discord
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
