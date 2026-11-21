'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useSiteContent } from '@/lib/content';

export default function ContactPage() {
  const { content: siteContent } = useSiteContent();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      toast.error('Please add your name, email, and a message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Same address already published in the footer, privacy policy, and store info.
    const to = siteContent.storeInfo.email.trim() || 'fenrisgamingllc@gmail.com';
    const body = [
      message,
      '',
      `From: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Website inquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    toast.success('Your email app should open with this message. Send it there to reach us.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { hours, phone, email } = siteContent.storeInfo;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="max-w-2xl mb-12">
        <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold">WE’D LOVE TO HEAR FROM YOU</div>
        <h1 className="text-5xl font-bold tracking-tighter mt-2">Come say hello.</h1>
        <p className="mt-3 text-lg text-[#9ca3af]">Questions about events, painting advice, or just want to say hi? Reach out anytime.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-x-10 gap-y-12">
        {/* Contact Info + Hours */}
        <div className="lg:col-span-2 space-y-9">
          <div>
            <div className="uppercase text-xs text-[#6b7280] tracking-widest mb-3">STORE LOCATION</div>
            <div className="font-medium text-lg">{siteContent.storeInfo.address.street}</div>
            <div className="text-[#9ca3af]">{siteContent.storeInfo.address.cityStateZip}</div>

            <a href={`https://maps.google.com/?q=${encodeURIComponent(siteContent.storeInfo.address.street + ', ' + siteContent.storeInfo.address.cityStateZip)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#c5a46e] mt-2 hover:underline">
              Get directions on Google Maps <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <div className="uppercase text-xs text-[#6b7280] tracking-widest mb-3">CONTACT</div>
            <div className="space-y-2 text-sm">
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="flex items-center gap-2 hover:text-[#c5a46e]"><Phone size={15} /> {phone}</a>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[#c5a46e]"><Mail size={15} /> {email}</a>
              <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#c5a46e]">Discord: discord.gg/AGnfaCStVA</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="uppercase text-xs text-[#6b7280] tracking-widest mb-3 flex items-center gap-2"><Clock size={14} /> STORE HOURS</div>
            <table className="hours-table w-full text-sm">
              <tbody>
                {hours.map((row, idx) => (
                  <tr key={idx} className="border-b border-[#1f2937] last:border-none">
                    <td className="py-1.5 pr-3 text-[#9ca3af]">{row.day}</td>
                    <td className="py-1.5 font-medium text-right">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-[11px] text-[#6b7280] mt-2">Hours can change for holidays or special events — call or check Discord to confirm.</div>
          </div>

          <div className="pt-4 border-t border-[#374151]">
            <div className="text-xs uppercase tracking-widest text-[#6b7280] mb-2">FOLLOW US</div>
            <div className="flex gap-4 text-sm">
              <a href="https://instagram.com/fenris_gaming_llc" target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a46e]">Instagram</a>
              <a href="https://facebook.com/fenrisgamingllc" target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a46e]">Facebook</a>
              <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a46e]">Discord</a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="card rounded-3xl p-8">
            <h3 className="font-semibold text-xl mb-1">Send us a message</h3>
            <p className="text-sm text-[#9ca3af] mb-6">We usually reply within 24 hours. For event signups, Discord is fastest.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input w-full px-4 h-12 rounded-2xl text-sm"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="input w-full px-4 h-12 rounded-2xl text-sm"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={handleChange}
                className="input w-full px-4 h-12 rounded-2xl text-sm"
              />
              <textarea
                name="message"
                required
                rows={6}
                placeholder="How can we help you? (Event question, painting advice, bulk order, etc.)"
                value={formData.message}
                onChange={handleChange}
                className="input w-full px-4 py-4 rounded-3xl text-sm resize-y"
              />

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-[#c5a46e] text-[#0a0f1a] font-semibold active:scale-[0.985] transition-all"
              >
                Email us
              </button>

              <p className="text-center text-[11px] text-[#6b7280]">
                This opens your email app. Nothing is sent until you send that email. Discord is fastest for event signups.
              </p>
            </form>
          </div>

          {/* Map Embed */}
          <div className="mt-6 rounded-3xl overflow-hidden border border-[#374151] aspect-video relative">
            <iframe
              src="https://www.google.com/maps?q=11375+Robinwood+Drive,+Hagerstown,+MD+21742&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fenris Gaming location map"
            />
            <div className="absolute bottom-3 right-3 bg-[#0a0f1a]/90 text-xs px-3 py-1 rounded-full border border-[#374151]">
              11375 Robinwood Drive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
