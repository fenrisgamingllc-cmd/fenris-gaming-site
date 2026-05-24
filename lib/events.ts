import { format } from 'date-fns';

export type EventCategory = 
  | 'mtg' 
  | 'warhammer' 
  | 'pokemon' 
  | 'one-piece' 
  | 'gundam' 
  | 'bolt-action' 
  | 'star-wars' 
  | 'open-play' 
  | 'other';

export interface RecurringEvent {
  id: number;
  title: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  time: string;
  endTime?: string;
  category: EventCategory;
  description?: string;
  price?: string;
  recurring: string; // e.g. "Every Sunday"
}

// Legacy type for existing components (list view + calendar)
export interface GameEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  endTime?: string;
  category: EventCategory;
  description: string;
  price?: string;
  spots?: string;
  recurring?: string;
}

export const recurringSchedule: RecurringEvent[] = [
  // Sunday
  {
    id: 1,
    title: "Commander & Coffee (Magic)",
    dayOfWeek: 0,
    time: "10:00 AM",
    category: "mtg",
    description: "Casual Magic Commander with coffee. New players welcome!",
    recurring: "Every Sunday",
  },
  {
    id: 2,
    title: "Roughbound",
    dayOfWeek: 0,
    time: "12:00 PM",
    category: "other",
    description: "Roughbound event.",
    recurring: "Every Sunday",
  },
  {
    id: 3,
    title: "One Piece TCG",
    dayOfWeek: 0,
    time: "5:00 PM",
    category: "one-piece",
    description: "One Piece TCG play and events.",
    recurring: "Every Sunday",
  },

  // Monday
  {
    id: 4,
    title: "Magic Commander",
    dayOfWeek: 1,
    time: "5:00 PM",
    category: "mtg",
    description: "Commander night for Magic: The Gathering.",
    recurring: "Every Monday",
  },

  // Tuesday
  {
    id: 5,
    title: "Tabletop Free Play",
    dayOfWeek: 2,
    time: "All Day",
    category: "open-play",
    description: "Open play for all tabletop games. No formal event — just show up and play.",
    recurring: "Every Tuesday",
  },

  // Wednesday
  {
    id: 6,
    title: "Hobby Night",
    dayOfWeek: 3,
    time: "6:00 PM",
    category: "other",
    description: "Painting, building, and hobby time with good lighting and tables.",
    recurring: "Every Wednesday",
  },
  {
    id: 7,
    title: "Star Wars Unlimited",
    dayOfWeek: 3,
    time: "6:00 PM",
    category: "star-wars",
    description: "Star Wars Unlimited play and events.",
    recurring: "Every Wednesday",
  },
  {
    id: 8,
    title: "Gundam Card Game",
    dayOfWeek: 3,
    time: "6:30 PM",
    category: "gundam",
    description: "Gundam Card Game events and play.",
    recurring: "Every Wednesday",
  },

  // Thursday
  {
    id: 9,
    title: "Warhammer Spearhead + Tabletop Free Play",
    dayOfWeek: 4,
    time: "All Day",
    category: "warhammer",
    description: "Warhammer Spearhead alongside open tabletop free play all day.",
    recurring: "Every Thursday",
  },

  // Friday
  {
    id: 10,
    title: "Warhammer",
    dayOfWeek: 5,
    time: "10:00 AM",
    category: "warhammer",
    description: "Warhammer games and events.",
    recurring: "Every Friday",
  },
  {
    id: 11,
    title: "Friday Night Magic",
    dayOfWeek: 5,
    time: "6:00 PM",
    category: "mtg",
    description: "Weekly Friday Night Magic — Standard or Commander. Prizing for top tables.",
    price: "$5 entry (tournaments)",
    recurring: "Every Friday",
  },

  // Saturday
  {
    id: 12,
    title: "Magic",
    dayOfWeek: 6,
    time: "12:00 PM",
    category: "mtg",
    description: "Magic: The Gathering play and events.",
    recurring: "Every Saturday",
  },
  {
    id: 13,
    title: "Pokémon",
    dayOfWeek: 6,
    time: "5:30 PM",
    category: "pokemon",
    description: "Pokémon TCG events and league play.",
    recurring: "Every Saturday",
  },
  {
    id: 14,
    title: "Tabletop Free Play",
    dayOfWeek: 6,
    time: "All Day",
    category: "open-play",
    description: "Open play for board games, minis, card games, and RPGs.",
    recurring: "Every Saturday",
  },
];

// Legacy support - generate upcoming instances for the old list/calendar views
export const events = recurringSchedule.map((event, index) => {
  const today = new Date();
  const currentDay = today.getDay();
  let daysUntil = (event.dayOfWeek - currentDay + 7) % 7;
  if (daysUntil === 0) daysUntil = 7;

  const eventDate = new Date(today);
  eventDate.setDate(today.getDate() + daysUntil);

  return {
    id: event.id,
    title: event.title,
    date: eventDate.toISOString().split('T')[0],
    time: event.time,
    endTime: undefined,
    category: event.category,
    description: event.description || "",
    price: event.price,
    spots: undefined,
    recurring: event.recurring,
  };
});

export const categoryLabels: Record<EventCategory, string> = {
  mtg: 'Magic: The Gathering',
  warhammer: 'Warhammer (40k / AoS / Heresy)',
  pokemon: 'Pokémon TCG',
  'one-piece': 'One Piece TCG',
  gundam: 'Gundam Card Game',
  'bolt-action': 'Bolt Action',
  'star-wars': 'Star Wars Unlimited',
  'open-play': 'Open Play',
  other: 'Special Event',
};

export const categoryColors: Record<EventCategory, string> = {
  mtg: 'badge-mtg',
  warhammer: 'badge-warhammer',
  pokemon: 'badge-pokemon',
  'one-piece': 'badge-onepiece',
  gundam: 'badge-gundam',
  'bolt-action': 'badge-boltaction',
  'star-wars': 'badge-starwars',
  'open-play': 'badge-open',
  other: 'badge-other',
};
