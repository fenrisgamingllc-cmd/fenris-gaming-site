import { useState, useEffect } from 'react';

export interface HeroButton {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
}

export interface ManagedEvent {
  id: string;
  title: string;
  isRecurring: boolean;
  dayOfWeek?: number;   // 0=Sunday ... 6=Saturday (only for recurring)
  date?: string;        // YYYY-MM-DD (only for special/one-off events)
  time: string;         // e.g. "6:00 PM", "All Day", "10:00 AM – 9:00 PM"
  description: string;
  price?: string;
}

// Core hero buttons that must always exist in this order
export const CORE_HERO_BUTTON_IDS = ['btn-1', 'btn-2', 'btn-3', 'btn-4'];

export interface SiteContent {
  hero: {
    headline: string;
    tagline: string;
  };
  trustBarSegments: [string, string, string];
  heroButtons: HeroButton[];
  announcements: Announcement[];
  events: ManagedEvent[];
  homepageGallery: Record<string, string[]>;
}

// Default content that exactly matches the current live homepage
const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline: 'Fenris Gaming Hall',
    tagline: 'Your Table Awaits',
  },
  trustBarSegments: [
    '2,000+ sq ft of play space',
    'Open 7 days a week',
    'Warhammer 40k • Horus Heresy • MTG • Pokémon • One Piece • Gundam Card Game • Bolt Action • Star Wars Unlimited',
  ],
  heroButtons: [
    {
      id: 'btn-1',
      label: 'Explore Events',
      url: '/events',
      isExternal: false,
    },
    {
      id: 'btn-2',
      label: 'Shop Models',
      url: 'https://fenrisgaming.myshopify.com/collections/all',
      isExternal: true,
    },
    {
      id: 'btn-3',
      label: 'Shop Collectibles',
      url: 'https://fenrisgamingllc.com/collections/sideshow',
      isExternal: true,
    },
    {
      id: 'btn-4',
      label: 'TCG Player',
      url: 'https://fenrisgamingllc.tcgplayerpro.com/',
      isExternal: true,
    },
  ],
  announcements: [],
  events: [
    // Sunday
    { id: 'evt-1', title: "Commander & Coffee (Magic)", isRecurring: true, dayOfWeek: 0, time: "10:00 AM", description: "Casual Magic Commander with coffee. New players welcome!" },
    { id: 'evt-2', title: "Roughbound", isRecurring: true, dayOfWeek: 0, time: "12:00 PM", description: "Roughbound event." },
    { id: 'evt-3', title: "One Piece TCG", isRecurring: true, dayOfWeek: 0, time: "5:00 PM", description: "One Piece TCG play and events." },
    // Monday
    { id: 'evt-4', title: "Magic Commander", isRecurring: true, dayOfWeek: 1, time: "5:00 PM", description: "Commander night for Magic: The Gathering." },
    // Tuesday
    { id: 'evt-5', title: "Tabletop Free Play", isRecurring: true, dayOfWeek: 2, time: "All Day", description: "Open play for all tabletop games. No formal event — just show up and play." },
    // Wednesday
    { id: 'evt-6', title: "Hobby Night", isRecurring: true, dayOfWeek: 3, time: "6:00 PM", description: "Painting, building, and hobby time with good lighting and tables." },
    { id: 'evt-7', title: "Star Wars Unlimited", isRecurring: true, dayOfWeek: 3, time: "6:00 PM", description: "Star Wars Unlimited play and events." },
    { id: 'evt-8', title: "Gundam Card Game", isRecurring: true, dayOfWeek: 3, time: "6:30 PM", description: "Gundam Card Game events and play." },
    // Thursday
    { id: 'evt-9', title: "Warhammer Spearhead + Tabletop Free Play", isRecurring: true, dayOfWeek: 4, time: "All Day", description: "Warhammer Spearhead alongside open tabletop free play all day." },
    // Friday
    { id: 'evt-10', title: "Warhammer", isRecurring: true, dayOfWeek: 5, time: "10:00 AM", description: "Warhammer games and events." },
    { id: 'evt-11', title: "Friday Night Magic", isRecurring: true, dayOfWeek: 5, time: "6:00 PM", description: "Weekly Friday Night Magic — Standard or Commander. Prizing for top tables.", price: "$5 entry (tournaments)" },
    // Saturday
    { id: 'evt-12', title: "Magic", isRecurring: true, dayOfWeek: 6, time: "12:00 PM", description: "Magic: The Gathering play and events." },
    { id: 'evt-13', title: "Pokémon", isRecurring: true, dayOfWeek: 6, time: "5:30 PM", description: "Pokémon TCG events and league play." },
    { id: 'evt-14', title: "Tabletop Free Play", isRecurring: true, dayOfWeek: 6, time: "All Day", description: "Open play for board games, minis, card games, and RPGs." },
  ],
  homepageGallery: {
    'The Gaming Hall': [
      '/images/The Gaming Hall/IMG_0790.jpeg',
      '/images/The Gaming Hall/IMG_1280.jpeg',
      '/images/The Gaming Hall/IMG_9018.jpeg',
    ],
    'Warhammer 40K & Horus Heresy': [
      '/images/Warhammer 40K & Horus Heresy/IMG_0744.jpeg',
      '/images/Warhammer 40K & Horus Heresy/IMG_0753.jpeg',
      '/images/Warhammer 40K & Horus Heresy/IMG_8704.jpeg',
    ],
    'Community Nights': [
      '/images/Community Nights/20250517_131409.jpg',
      '/images/Community Nights/IMG_0078.jpeg',
      '/images/Community Nights/IMG_8712.jpeg',
    ],
    "D&D Nights": [
      '/images/D&D Nights/IMG_0074.jpeg',
      '/images/D&D Nights/IMG_1538.JPG',
      '/images/D&D Nights/IMG_2730.JPG',
    ],
    'Magic & Card Games': [
      '/images/Magic & Card Games/IMG_0757.jpeg',
      '/images/Magic & Card Games/IMG_8698.jpeg',
      '/images/Magic & Card Games/IMG_9054.jpeg',
    ],
    'Busy Nights': [
      '/images/Busy Nights/IMG_0077.jpeg',
      '/images/Busy Nights/IMG_8990.jpeg',
      '/images/Busy Nights/IMG_9546.jpeg',
    ],
  },
};

const STORAGE_KEY = 'fenris-site-content';

export function getDefaultContent(): SiteContent {
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

export function loadContent(): SiteContent {
  if (typeof window === 'undefined') {
    return getDefaultContent();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultContent();

    const parsed = JSON.parse(stored) as Partial<SiteContent>;

    // Merge with defaults to handle future schema additions gracefully
    return {
      ...getDefaultContent(),
      ...parsed,
      hero: { ...getDefaultContent().hero, ...parsed.hero },
      heroButtons: (() => {
        const savedButtons: any[] = parsed.heroButtons || [];
        const defaults = getDefaultContent().heroButtons;

        // Create lookup for saved edits
        const savedById = new Map(savedButtons.map((b: any) => [b.id, b]));

        // Always enforce the exact core 4 buttons in the defined order.
        // Use saved data only for label/url overrides.
        const coreButtons = defaults.map((def) => {
          const saved = savedById.get(def.id);
          return saved ? { ...def, ...saved } : def;
        });

        // Allow extra user-added buttons after the core ones (optional future-proofing)
        const defaultIds = new Set(defaults.map((d) => d.id));
        const extraButtons = savedButtons.filter((b: any) => !defaultIds.has(b.id));

        return [...coreButtons, ...extraButtons];
      })(),
      announcements: parsed.announcements ?? [],
      events: parsed.events?.length ? parsed.events : getDefaultContent().events,
      homepageGallery: parsed.homepageGallery ?? getDefaultContent().homepageGallery,
    };
  } catch {
    return getDefaultContent();
  }
}

export function saveContent(content: SiteContent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetContent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// React hook for easy consumption in components
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(getDefaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadContent();
    setContent(loaded);
    setIsLoaded(true);
  }, []);

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      saveContent(next);
      return next;
    });
  };

  return { content, updateContent, isLoaded, resetContent };
}

// Helper to generate a simple id
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
