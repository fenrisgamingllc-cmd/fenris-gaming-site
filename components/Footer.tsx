'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { useSiteContent } from '@/lib/content';

export default function Footer() {
  const { content: siteContent } = useSiteContent();

  const quickHours = siteContent.storeInfo.hours.length > 0 
    ? [
        { day: 'Mon–Fri', hours: siteContent.storeInfo.hours[0].hours },
        { day: 'Sat–Sun', hours: siteContent.storeInfo.hours[5].hours },
      ]
    : [
        { day: 'Mon–Fri', hours: '12:00 PM – 9:00 PM' },
        { day: 'Sat–Sun', hours: '10:00 AM – 9:00 PM' },
      ];

  const { footer } = siteContent;

  return (
    <footer className="bg-[#0a0f1a] border-t border-[#374151] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-[#0a0f1a] text-lg font-bold">F</span>
              </div>
              <span className="font-bold text-lg tracking-tighter">FENRIS GAMING</span>
            </div>
            <p className="text-[#9ca3af] max-w-[220px]">
              A community-first tabletop gaming hall in Hagerstown, Maryland.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold mb-3 text-[#cbd5e1]">Explore</div>
            <div className="space-y-2 text-[#9ca3af]">
              <div><Link href="/about" className="hover:text-[#c5a46e] transition-colors">Our Story &amp; Team</Link></div>
              <div><Link href="/events" className="hover:text-[#c5a46e] transition-colors">This Week’s Events</Link></div>
              <div><Link href="/community" className="hover:text-[#c5a46e] transition-colors">The Gaming Hall</Link></div>
              <div><Link href="/contact" className="hover:text-[#c5a46e] transition-colors">Visit Us</Link></div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold mb-3 text-[#cbd5e1]">Get In Touch</div>
            <div className="space-y-2.5 text-[#9ca3af]">
              <a href="tel:+12402172784" className="flex items-center gap-2 hover:text-[#c5a46e] transition-colors">
                <Phone size={15} /><span>(240) 217-2784</span>
              </a>
              <a href="mailto:fenrisgamingllc@gmail.com" className="flex items-center gap-2 hover:text-[#c5a46e] transition-colors">
                <Mail size={15} /><span>fenrisgamingllc@gmail.com</span>
              </a>
              <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#c5a46e] transition-colors">
                Discord Community
              </a>
            </div>
          </div>

          {/* Hours & Location */}
          <div>
            <div className="font-semibold mb-3 text-[#cbd5e1] flex items-center gap-2">
              <Clock size={15} /><span>Hours</span>
            </div>
            <div className="text-[#9ca3af] space-y-1 mb-4">
              {quickHours.map((h, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span>{h.day}</span>
                  <span className="font-medium text-[#cbd5e1]">{h.hours}</span>
                </div>
              ))}
            </div>

            <div className="text-[#9ca3af]">
              <div className="font-medium text-[#cbd5e1] flex items-start gap-1.5 mb-0.5">
                <MapPin size={15} className="mt-px" /> 11375 Robinwood Drive
              </div>
              <div className="pl-5 text-xs">College Plaza, Hagerstown, MD 21742</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#374151] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6b7280]">
          <div>{footer.copyrightText.replace('{year}', new Date().getFullYear().toString())}</div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <a
              href={footer.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#9ca3af] hover:text-[#c5a46e] transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={footer.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#9ca3af] hover:text-[#c5a46e] transition-colors"
            >
              <Facebook size={18} />
            </a>

            <span className="hidden md:inline">•</span>

            <a href="https://fenrisgamingllc.com/collections/all" target="_blank" rel="noopener noreferrer" className="hover:text-[#9ca3af]">
              Shop on Shopify
            </a>
            <a href="/getting-started" className="hover:text-[#9ca3af]">
              Getting Started
            </a>
            <a href={footer.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="hover:text-[#9ca3af]">
              Join the Discord
            </a>
            <span className="hidden md:inline text-[#374151]">•</span>
            <Link href="/admin" className="hover:text-[#c5a46e] font-medium">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
