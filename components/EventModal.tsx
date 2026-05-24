'use client';

import { GameEvent, categoryLabels, categoryColors } from '@/lib/events';
import { X, Calendar, Clock, Users, DollarSign, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface EventModalProps {
  event: GameEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!isOpen || !event) return null;

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM d, yyyy');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="modal bg-[#111827] border border-[#374151] rounded-3xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4 border-b border-[#374151]">
          <div>
            <span className={`badge ${categoryColors[event.category]} mb-3`}>
              {categoryLabels[event.category]}
            </span>
            <h2 className="text-2xl font-semibold leading-tight pr-8">{event.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#1f2937] text-[#9ca3af] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-xl bg-[#1f2937]">
                <Calendar className="w-5 h-5 text-[#c5a46e]" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#9ca3af]">DATE</div>
                <div className="font-medium">{formattedDate}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 p-2 rounded-xl bg-[#1f2937]">
                <Clock className="w-5 h-5 text-[#c5a46e]" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#9ca3af]">TIME</div>
                <div className="font-medium">
                  {event.time} {event.endTime && `– ${event.endTime}`}
                </div>
              </div>
            </div>
          </div>

          {/* Details row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-y border-[#374151] py-4">
            {event.price && (
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-[#9ca3af]" />
                <span>{event.price}</span>
              </div>
            )}
            {event.spots && (
              <div className="flex items-center gap-2">
                <Users size={16} className="text-[#9ca3af]" />
                <span>{event.spots}</span>
              </div>
            )}
            {event.recurring && (
              <div className="text-[#c5a46e] font-medium">{event.recurring}</div>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="text-xs uppercase tracking-widest text-[#9ca3af] mb-1.5">ABOUT THIS EVENT</div>
            <p className="text-[#cbd5e1] leading-relaxed">{event.description}</p>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <a
              href="https://discord.gg/AGnfaCStVA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] active:bg-[#3c45a3] transition-colors text-white font-semibold py-3.5 rounded-2xl text-sm"
            >
              RSVP ON DISCORD <ExternalLink size={16} />
            </a>
            <p className="text-center text-[11px] text-[#6b7280] mt-2.5">
              Fastest way to reserve your seat or ask questions
            </p>
          </div>
        </div>

        <div className="bg-[#0a0f1a] px-6 py-4 text-xs text-center text-[#6b7280] border-t border-[#374151]">
          New to the game? Come anyway — our community loves helping new players.
        </div>
      </div>
    </div>
  );
}
