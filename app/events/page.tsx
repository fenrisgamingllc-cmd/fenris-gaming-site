'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSiteContent } from '@/lib/content';
import EventModal from '@/components/EventModal';


export default function EventsPage() {
  const { content: siteContent } = useSiteContent();

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEvent = (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 180);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-1">THE HALL IS ALIVE</div>
          <h1 className="text-5xl font-bold tracking-tighter">Events &amp; Tournaments</h1>
          <p className="mt-2 text-[#9ca3af] max-w-md">
            Open Play is always free — no table fees. Only tournaments and special events have fees.
          </p>
          <p className="mt-1 text-sm text-[#c5a46e]">
            <a 
              href="https://www.facebook.com/photo/?fbid=963670186435987&set=a.123901053746242" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              View the current month’s full calendar on Facebook →
            </a>
          </p>
        </div>
        <div className="text-[#9ca3af] max-w-xs text-sm">
          New to the hobby? Most events welcome beginners. <Link href="/getting-started" className="text-[#c5a46e] hover:text-white underline underline-offset-2">Read the New Player Guide</Link> or just show up.
        </div>
      </div>

      {/* WEEKLY RECURRING SCHEDULE - driven by Admin */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-1">EVERY WEEK AT FENRIS</div>
            <h2 className="text-3xl font-bold tracking-tighter">Weekly Schedule</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { day: "Sunday", dayNum: 0 },
            { day: "Monday", dayNum: 1 },
            { day: "Tuesday", dayNum: 2 },
            { day: "Wednesday", dayNum: 3 },
            { day: "Thursday", dayNum: 4 },
            { day: "Friday", dayNum: 5 },
            { day: "Saturday", dayNum: 6 },
          ].map(({ day, dayNum }) => {
            const dayEvents = siteContent.events.filter(e => e.isRecurring && e.dayOfWeek === dayNum);
            if (dayEvents.length === 0) return null;

            return (
              <div key={day} className="card rounded-3xl p-5">
                <div className="font-bold text-lg mb-3 text-[#c5a46e]">{day}</div>
                <div className="space-y-3">
                  {dayEvents.map((event) => (
                    <div key={event.id} className="border-l-2 border-[#c5a46e] pl-3">
                      <div className="font-semibold text-sm leading-tight">{event.title}</div>
                      <div className="text-xs text-[#9ca3af] mt-0.5">{event.time}</div>
                      {event.description && (
                        <div className="text-xs text-[#cbd5e1] mt-1 leading-snug">{event.description}</div>
                      )}
                      {event.price && (
                        <div className="text-xs text-[#c5a46e] mt-1 font-medium">{event.price}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-[#6b7280]">
          Open Play is always free — no table fees. Only tournaments and special events have fees.
        </div>
      </div>

      {/* Professional note */}
      <div className="text-xs text-[#6b7280] mb-6">
        Open Play is always free — no table fees. Only tournaments and special events have fees.
      </div>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
