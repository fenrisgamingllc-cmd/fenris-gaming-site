'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // For production: Replace the Formspree endpoint below with your own (free at formspree.io)
    // Example: https://formspree.io/f/YOUR_UNIQUE_ID
    try {
      const response = await fetch('https://formspree.io/f/PLACEHOLDER', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Message sent! We’ll get back to you within a day or two.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        // Fallback: open email client
        window.location.href = `mailto:fenrisgamingllc@gmail.com?subject=Website Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}`;
        toast.info('Opening your email app...');
      }
    } catch {
      // Offline / no network — graceful fallback
      window.location.href = `mailto:fenrisgamingllc@gmail.com?subject=Website Inquiry&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      toast.info('Opening email client as fallback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fullHours = [
    { day: 'Monday', hours: '12:00 PM – 9:00 PM' },
    { day: 'Tuesday', hours: '12:00 PM – 9:00 PM' },
    { day: 'Wednesday', hours: '12:00 PM – 9:00 PM' },
    { day: 'Thursday', hours: '12:00 PM – 9:00 PM' },
    { day: 'Friday', hours: '12:00 PM – 9:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Sunday', hours: '10:00 AM – 9:00 PM' },
  ];

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
            <div className="font-medium text-lg">11375 Robinwood Drive</div>
            <div className="text-[#9ca3af]">College Plaza, Hagerstown, MD 21742</div>

            <a href="https://maps.google.com/?q=11375+Robinwood+Drive,+Hagerstown,+MD+21742" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#c5a46e] mt-2 hover:underline">
              Get directions on Google Maps <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <div className="uppercase text-xs text-[#6b7280] tracking-widest mb-3">CONTACT</div>
            <div className="space-y-2 text-sm">
              <a href="tel:+12402172784" className="flex items-center gap-2 hover:text-[#c5a46e]"><Phone size={15} /> (240) 217-2784</a>
              <a href="mailto:fenrisgamingllc@gmail.com" className="flex items-center gap-2 hover:text-[#c5a46e]"><Mail size={15} /> fenrisgamingllc@gmail.com</a>
              <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#c5a46e]">Discord: discord.gg/AGnfaCStVA</a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="uppercase text-xs text-[#6b7280] tracking-widest mb-3 flex items-center gap-2"><Clock size={14} /> STORE HOURS</div>
            <table className="hours-table w-full text-sm">
              <tbody>
                {fullHours.map((row, idx) => (
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
                disabled={isSubmitting}
                className="w-full h-12 rounded-2xl bg-[#c5a46e] text-[#0a0f1a] font-semibold disabled:opacity-60 active:scale-[0.985] transition-all"
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>

              <p className="text-center text-[11px] text-[#6b7280]">
                This form uses Formspree. You can also reach us instantly on Discord.
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
