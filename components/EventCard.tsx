'use client';

import { GameEvent, categoryLabels, categoryColors } from '@/lib/events';
import { Calendar, Clock, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: GameEvent;
  onClick: (event: GameEvent) => void;
  compact?: boolean;
}

export default function EventCard({ event, onClick, compact = false }: EventCardProps) {
  const eventDate = new Date(event.date);
  const dayOfWeek = format(eventDate, 'EEE');
  const monthDay = format(eventDate, 'MMM d');

  return (
    <div
      onClick={() => onClick(event)}
      className="card group cursor-pointer rounded-3xl p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-xs uppercase tracking-[1px] text-[#9ca3af] font-medium">
            {dayOfWeek} • {monthDay}
          </div>
          <h3 className="font-semibold text-lg leading-tight mt-0.5 group-hover:text-[#c5a46e] transition-colors pr-2">
            {event.title}
          </h3>
        </div>
        <span className={`badge ${categoryColors[event.category]} shrink-0`}>
          {categoryLabels[event.category].split(' ')[0]}
        </span>
      </div>

      <div className="mt-auto space-y-2 text-sm text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-[#c5a46e]" />
          <span>
            {event.time} {event.endTime && `– ${event.endTime}`}
          </span>
        </div>

        {!compact && event.description && (
          <p className="line-clamp-2 text-xs pt-1 text-[#cbd5e1]">{event.description}</p>
        )}

        <div className="flex items-center gap-4 pt-1 text-xs">
          {event.price && (
            <span className="flex items-center gap-1">
              <DollarSign size={14} /> {event.price}
            </span>
          )}
          {event.spots && (
            <span className="flex items-center gap-1">
              <Users size={14} /> {event.spots}
            </span>
          )}
        </div>

        {event.recurring && (
          <div className="text-[11px] font-medium text-[#c5a46e]/80 pt-0.5">
            {event.recurring}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-[#1f2535] text-xs text-[#c5a46e] font-medium group-hover:text-white transition-colors">
        View details &amp; RSVP →
      </div>
    </div>
  );
}
