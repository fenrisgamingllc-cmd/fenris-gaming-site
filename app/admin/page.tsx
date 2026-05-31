'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSiteContent, type SiteContent, type HeroButton, type Announcement, type ManagedEvent, generateId, getDefaultContent } from '@/lib/content';
import { toast } from 'sonner';
import { 
  Save, RotateCcw, Eye, LogOut, Plus, Trash2, ArrowUp, ArrowDown, 
  Home, User 
} from 'lucide-react';

const ADMIN_LOGGED_IN_KEY = 'fenris-admin-logged-in';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'fenris2026';

export default function AdminDashboard() {
  const { content, updateContent, resetContent } = useSiteContent();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginUsername, setLoginUsername] = useState('admin');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState<'hero' | 'trust' | 'buttons' | 'announcements' | 'events' | 'gallery' | 'settings'>('hero');

  // Local state for Announcements creation form
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem(ADMIN_LOGGED_IN_KEY);
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
      setIsLoggedIn(true);
      setLoginPassword('');
      toast.success('Welcome back, admin');
    } else {
      setLoginError('Invalid username or password');
      setLoginPassword('');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
    setIsLoggedIn(false);
    setLoginPassword('');
    setLoginError('');
    setActiveSection('hero');
    toast.info('Logged out');
  };

  const handleReset = () => {
    if (!confirm('Reset all content to defaults? This cannot be undone.')) return;
    
    resetContent();
    toast.success('Content reset to defaults');
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  // === HERO ===
  const updateHero = (field: 'headline' | 'tagline', value: string) => {
    updateContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
  };

  // === TRUST BAR ===
  const updateTrustSegment = (index: 0 | 1 | 2, value: string) => {
    updateContent((prev) => {
      const segments = [...prev.trustBarSegments] as SiteContent['trustBarSegments'];
      segments[index] = value;
      return { ...prev, trustBarSegments: segments };
    });
  };

  // === HERO BUTTONS ===
  const updateButton = (id: string, field: 'label' | 'url', value: string) => {
    updateContent((prev) => ({
      ...prev,
      heroButtons: prev.heroButtons.map((btn) =>
        btn.id === id ? { ...btn, [field]: value } : btn
      ),
    }));
  };

  const addHeroButton = () => {
    const newBtn: HeroButton = {
      id: generateId(),
      label: 'New Button',
      url: 'https://',
      isExternal: true,
    };
    updateContent((prev) => ({
      ...prev,
      heroButtons: [...prev.heroButtons, newBtn],
    }));
    toast.success('New button added');
  };

  const deleteHeroButton = (id: string) => {
    if (!confirm('Delete this button?')) return;
    updateContent((prev) => ({
      ...prev,
      heroButtons: prev.heroButtons.filter((b) => b.id !== id),
    }));
    toast.success('Button deleted');
  };

  const restoreDefaultHeroButtons = () => {
    if (!confirm('Restore the 5 official hero buttons (including TCG Player)? This will replace your current button list.')) return;
    updateContent((prev) => ({
      ...prev,
      heroButtons: getDefaultContent().heroButtons,
    }));
    toast.success('Default hero buttons restored (5 buttons)');
  };

  const moveHeroButton = (id: string, direction: -1 | 1) => {
    updateContent((prev) => {
      const buttons = [...prev.heroButtons];
      const index = buttons.findIndex(b => b.id === id);
      if (index === -1) return prev;

      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= buttons.length) return prev;

      // Swap positions
      [buttons[index], buttons[newIndex]] = [buttons[newIndex], buttons[index]];

      return {
        ...prev,
        heroButtons: buttons,
      };
    });
  };

  // === ANNOUNCEMENTS ===
  const addAnnouncement = () => {
    const text = newAnnouncementText.trim();
    if (!text) return;

    const newAnnouncement: Announcement = {
      id: generateId(),
      text,
      active: true,
    };
    updateContent((prev) => ({
      ...prev,
      announcements: [...prev.announcements, newAnnouncement],
    }));
    setNewAnnouncementText('');
    toast.success('Announcement added and set to live');
  };

  const updateAnnouncement = (id: string, field: 'text' | 'active', value: string | boolean) => {
    updateContent((prev) => ({
      ...prev,
      announcements: prev.announcements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  };

  const deleteAnnouncement = (id: string) => {
    updateContent((prev) => ({
      ...prev,
      announcements: prev.announcements.filter((a) => a.id !== id),
    }));
    toast.success('Announcement deleted');
  };

  // === EVENTS ===
  const addRecurringEvent = () => {
    const newEvent: ManagedEvent = {
      id: generateId(),
      title: 'New Weekly Event',
      isRecurring: true,
      dayOfWeek: 2, // Tuesday default
      time: '6:00 PM',
      description: 'Event description goes here.',
    };
    updateContent((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
    toast.success('New recurring event added');
  };

  const addSpecialEvent = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEvent: ManagedEvent = {
      id: generateId(),
      title: 'Special Event / Tournament',
      isRecurring: false,
      date: today,
      time: '6:00 PM',
      description: 'One-time event description.',
    };
    updateContent((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
    toast.success('New special event added');
  };

  const updateEvent = (id: string, field: keyof ManagedEvent, value: any) => {
    updateContent((prev) => ({
      ...prev,
      events: prev.events.map((ev) =>
        ev.id === id ? { ...ev, [field]: value } : ev
      ),
    }));
  };

  const deleteEvent = (id: string) => {
    if (!confirm('Delete this event?')) return;
    updateContent((prev) => ({
      ...prev,
      events: prev.events.filter((ev) => ev.id !== id),
    }));
    toast.success('Event deleted');
  };

  // === GALLERY ===
  const categories = Object.keys(content.homepageGallery);

  const addGalleryImage = (category: string) => {
    const url = prompt('Enter image path (e.g. /images/The Gaming Hall/new-photo.jpg) or external URL:');
    if (!url || !url.trim()) return;

    updateContent((prev) => ({
      ...prev,
      homepageGallery: {
        ...prev.homepageGallery,
        [category]: [...prev.homepageGallery[category], url.trim()],
      },
    }));
    toast.success('Image added to gallery');
  };

  const deleteGalleryImage = (category: string, index: number) => {
    if (!confirm('Remove this photo from the homepage gallery?')) return;

    updateContent((prev) => {
      const updated = [...prev.homepageGallery[category]];
      updated.splice(index, 1);
      return {
        ...prev,
        homepageGallery: {
          ...prev.homepageGallery,
          [category]: updated,
        },
      };
    });
    toast.success('Photo removed');
  };

  const moveGalleryImage = (category: string, index: number, direction: -1 | 1) => {
    updateContent((prev) => {
      const updated = [...prev.homepageGallery[category]];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= updated.length) return prev;

      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

      return {
        ...prev,
        homepageGallery: {
          ...prev.homepageGallery,
          [category]: updated,
        },
      };
    });
  };

  // === RENDER ===
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#05070f] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c5a46e] text-[#05070f] mb-4">
              <User size={32} />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter">Fenris Admin</h1>
            <p className="text-[#94a3b8] mt-2">Internal content management</p>
          </div>

          <div className="bg-[#0a0d18] border border-[#1f2535] rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Sign in to continue</h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#c5a46e] mb-2">Username</label>
                <input
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="input w-full"
                  autoComplete="username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#c5a46e] mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="input w-full"
                  autoComplete="current-password"
                  autoFocus
                  required
                />
              </div>

              {loginError && (
                <div className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-xl px-4 py-2.5">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full h-12 text-base mt-2"
              >
                Sign In
              </button>
            </form>

            <div className="text-center mt-6">
              <Link href="/" className="text-sm text-[#c5a46e] hover:text-white flex items-center justify-center gap-1.5">
                <Home size={15} /> Back to homepage
              </Link>
            </div>
          </div>

          <p className="text-[10px] text-[#64748b] mt-6 text-center">
            Session is stored locally in your browser. Log out to end it.
          </p>
        </div>
      </div>
    );
  }

  // === MAIN ADMIN UI ===
  return (
    <div className="min-h-screen bg-[#05070f] text-[#e2e8f0]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#05070f]/95 backdrop-blur-xl border-b border-[#1f2535]">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#c5a46e] flex items-center justify-center">
              <span className="text-[#05070f] font-bold text-sm">F</span>
            </div>
            <div>
              <div className="font-semibold tracking-tight">Fenris Admin</div>
              <div className="text-[10px] text-[#64748b] -mt-0.5">Content Dashboard</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePreview}
              className="flex items-center gap-2 px-4 h-9 rounded-xl border border-[#1f2535] hover:bg-[#0a0d18] text-sm"
            >
              <Eye size={16} /> Preview Site
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 h-9 rounded-xl border border-[#1f2535] hover:bg-[#0a0d18] text-sm text-[#f87171]"
            >
              <RotateCcw size={16} /> Reset All
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 h-9 rounded-xl bg-[#1f2535] hover:bg-[#272f42] text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
            <Link href="/" className="text-sm text-[#c5a46e] hover:text-white px-3">
              View Site →
            </Link>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="border-t border-[#1f2535] bg-[#0a0d18]">
          <div className="max-w-6xl mx-auto px-5 flex gap-1 overflow-x-auto">
            {[
              { id: 'hero', label: 'Hero' },
              { id: 'trust', label: 'Trust Bar' },
              { id: 'buttons', label: 'Hero Buttons' },
              { id: 'announcements', label: 'Announcements' },
              { id: 'events', label: 'Events' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === tab.id
                    ? 'border-[#c5a46e] text-white'
                    : 'border-transparent text-[#94a3b8] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* HERO SECTION */}
        {activeSection === 'hero' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Hero Section</h2>
              <p className="text-[#94a3b8] mt-1">Main headline and tagline on the homepage.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#c5a46e] mb-2">Headline</label>
                <input
                  type="text"
                  value={content.hero.headline}
                  onChange={(e) => updateHero('headline', e.target.value)}
                  className="input w-full text-2xl font-semibold tracking-[-1px] h-14"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#c5a46e] mb-2">Tagline</label>
                <input
                  type="text"
                  value={content.hero.tagline}
                  onChange={(e) => updateHero('tagline', e.target.value)}
                  className="input w-full text-lg h-12"
                />
              </div>

              <div className="pt-4 text-xs text-[#64748b]">
                Note: The top badge ("HAGERSTOWN, MARYLAND • EST. 2022") and game systems line are currently static.
              </div>
            </div>
          </div>
        )}

        {/* TRUST BAR */}
        {activeSection === 'trust' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Trust Bar</h2>
              <p className="text-[#94a3b8] mt-1">The three-part bar directly under the hero.</p>
            </div>

            <div className="space-y-5">
              {content.trustBarSegments.map((segment, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-[#c5a46e] mb-2">
                    Segment {index + 1}
                  </label>
                  <input
                    type="text"
                    value={segment}
                    onChange={(e) => updateTrustSegment(index as 0 | 1 | 2, e.target.value)}
                    className="input w-full"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#64748b]">
              These appear with vertical dividers on desktop. Keep them relatively short.
            </p>
          </div>
        )}

        {/* HERO BUTTONS */}
        {activeSection === 'buttons' && (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold tracking-tighter">Hero Buttons</h2>
                <p className="text-[#94a3b8] mt-1">Calls-to-action shown in the homepage hero. (Currently 5 official buttons including TCG Player)</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={addHeroButton} className="btn-primary flex items-center gap-2 px-5 h-10 text-sm">
                  <Plus size={16} /> Add Button
                </button>
                <button 
                  onClick={restoreDefaultHeroButtons} 
                  className="flex items-center gap-2 px-4 h-10 text-sm border border-[#1f2535] hover:bg-[#0a0d18] rounded-xl"
                >
                  Restore Defaults
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {content.heroButtons.map((button, idx) => (
                <div key={button.id} className="bg-[#0a0d18] border border-[#1f2535] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-[#c5a46e] font-medium tracking-wider">
                      BUTTON {idx + 1} {button.isExternal ? '• EXTERNAL' : '• INTERNAL'}
                    </div>
                    <div className="flex items-center gap-1">
                      {content.heroButtons.length > 1 && (
                        <>
                          <button
                            onClick={() => moveHeroButton(button.id, -1)}
                            disabled={idx === 0}
                            className="p-1 text-[#94a3b8] hover:text-white disabled:opacity-30"
                            aria-label="Move button up"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <button
                            onClick={() => moveHeroButton(button.id, 1)}
                            disabled={idx === content.heroButtons.length - 1}
                            className="p-1 text-[#94a3b8] hover:text-white disabled:opacity-30"
                            aria-label="Move button down"
                          >
                            <ArrowDown size={16} />
                          </button>
                          <button
                            onClick={() => deleteHeroButton(button.id)}
                            className="text-[#f87171] hover:text-red-400 p-1 ml-1"
                            aria-label="Delete button"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-[#94a3b8] block mb-1.5">Label</label>
                      <input
                        type="text"
                        value={button.label}
                        onChange={(e) => updateButton(button.id, 'label', e.target.value)}
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#94a3b8] block mb-1.5">URL</label>
                      <input
                        type="text"
                        value={button.url}
                        onChange={(e) => updateButton(button.id, 'url', e.target.value)}
                        className="input w-full font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-[#64748b]">
              There are currently 5 official buttons (including TCG Player). You can add more or delete any. The first button is treated as internal (uses Next.js Link). The others open in new tabs.
            </p>
          </div>
        )}

        {/* ANNOUNCEMENTS - Significantly improved UX */}
        {activeSection === 'announcements' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Announcements / News</h2>
              <p className="text-[#94a3b8] mt-1">Messages that appear as a bar near the top of the homepage when active.</p>
            </div>

            {/* Always-visible creation form */}
            <div className="bg-[#0a0d18] border border-[#1f2535] rounded-3xl p-6 mb-8">
              <div className="text-sm font-medium text-[#c5a46e] mb-3">Create New Announcement</div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newAnnouncementText}
                  onChange={(e) => setNewAnnouncementText(e.target.value)}
                  placeholder="e.g. Warhammer 40k tournament this Friday — sign up now!"
                  className="input flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newAnnouncementText.trim()) {
                      addAnnouncement();
                    }
                  }}
                />
                <button
                  onClick={addAnnouncement}
                  disabled={!newAnnouncementText.trim()}
                  className="btn-primary px-6 h-11 text-sm disabled:opacity-50"
                >
                  Add Announcement
                </button>
              </div>
              <p className="text-xs text-[#64748b] mt-2">New announcements are active by default.</p>
            </div>

            {/* List */}
            {content.announcements.length === 0 ? (
              <div className="border border-dashed border-[#1f2535] rounded-3xl p-10 text-center">
                <p className="text-[#94a3b8] mb-1">No announcements yet.</p>
                <p className="text-xs text-[#64748b]">Use the form above to create your first one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {content.announcements.map((ann, index) => (
                  <div key={ann.id} className="bg-[#0a0d18] border border-[#1f2535] rounded-2xl p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="text-xs text-[#64748b]">#{index + 1}</div>
                          <div className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${ann.active ? 'bg-emerald-900 text-emerald-300' : 'bg-zinc-800 text-zinc-400'}`}>
                            {ann.active ? 'LIVE ON SITE' : 'HIDDEN'}
                          </div>
                        </div>
                        <textarea
                          value={ann.text}
                          onChange={(e) => updateAnnouncement(ann.id, 'text', e.target.value)}
                          className="input w-full min-h-[60px] resize-y"
                          rows={2}
                        />
                      </div>

                      <div className="flex flex-col items-end gap-2 pt-1">
                        <button
                          onClick={() => updateAnnouncement(ann.id, 'active', !ann.active)}
                          className={`text-xs px-3 py-1.5 rounded-xl transition font-medium ${ann.active ? 'bg-emerald-800 hover:bg-emerald-700 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'}`}
                        >
                          {ann.active ? 'Hide' : 'Show on Site'}
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(ann.id)}
                          className="text-[#f87171] hover:text-red-400 p-2"
                          aria-label="Delete announcement"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EVENTS - New full management tab */}
        {activeSection === 'events' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Events</h2>
              <p className="text-[#94a3b8] mt-1">Manage weekly recurring events and one-time special events/tournaments.</p>
            </div>

            {/* RECURRING WEEKLY */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="uppercase text-xs tracking-[2px] text-[#c5a46e] font-semibold">WEEKLY RECURRING</div>
                  <h3 className="text-2xl font-semibold tracking-tighter">Recurring Events by Day</h3>
                </div>
                <button onClick={addRecurringEvent} className="btn-primary flex items-center gap-2 px-5 h-10 text-sm">
                  <Plus size={16} /> Add Recurring
                </button>
              </div>

              <div className="space-y-3">
                {content.events.filter(e => e.isRecurring).length === 0 ? (
                  <div className="text-sm text-[#64748b] italic pl-1">No recurring events yet.</div>
                ) : (
                  content.events
                    .filter(e => e.isRecurring)
                    .sort((a, b) => (a.dayOfWeek ?? 0) - (b.dayOfWeek ?? 0))
                    .map((ev) => (
                      <div key={ev.id} className="bg-[#0a0d18] border border-[#1f2535] rounded-2xl p-5">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-3 items-start">
                          {/* Day */}
                          <div className="md:col-span-2">
                            <label className="text-xs text-[#94a3b8] block mb-1">Day</label>
                            <select
                              value={ev.dayOfWeek ?? 0}
                              onChange={(e) => updateEvent(ev.id, 'dayOfWeek', parseInt(e.target.value))}
                              className="input w-full text-sm"
                            >
                              {['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d, i) => (
                                <option key={i} value={i}>{d}</option>
                              ))}
                            </select>
                          </div>

                          {/* Title */}
                          <div className="md:col-span-5">
                            <label className="text-xs text-[#94a3b8] block mb-1">Title</label>
                            <input
                              type="text"
                              value={ev.title}
                              onChange={(e) => updateEvent(ev.id, 'title', e.target.value)}
                              className="input w-full"
                            />
                          </div>

                          {/* Time */}
                          <div className="md:col-span-3">
                            <label className="text-xs text-[#94a3b8] block mb-1">Time</label>
                            <input
                              type="text"
                              value={ev.time}
                              onChange={(e) => updateEvent(ev.id, 'time', e.target.value)}
                              className="input w-full"
                              placeholder="6:00 PM or All Day"
                            />
                          </div>

                          {/* Price (optional) */}
                          <div className="md:col-span-2">
                            <label className="text-xs text-[#94a3b8] block mb-1">Price (opt)</label>
                            <input
                              type="text"
                              value={ev.price || ''}
                              onChange={(e) => updateEvent(ev.id, 'price', e.target.value || undefined)}
                              className="input w-full"
                              placeholder="$5"
                            />
                          </div>

                          {/* Description */}
                          <div className="md:col-span-12">
                            <label className="text-xs text-[#94a3b8] block mb-1">Description</label>
                            <textarea
                              value={ev.description}
                              onChange={(e) => updateEvent(ev.id, 'description', e.target.value)}
                              className="input w-full min-h-[52px]"
                              rows={2}
                            />
                          </div>

                          <div className="md:col-span-12 flex justify-end">
                            <button onClick={() => deleteEvent(ev.id)} className="text-xs text-[#f87171] hover:text-red-400 flex items-center gap-1">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* SPECIAL / ONE-OFF EVENTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="uppercase text-xs tracking-[2px] text-[#c5a46e] font-semibold">ONE-TIME / SPECIAL</div>
                  <h3 className="text-2xl font-semibold tracking-tighter">Special Events & Tournaments</h3>
                </div>
                <button onClick={addSpecialEvent} className="btn-primary flex items-center gap-2 px-5 h-10 text-sm">
                  <Plus size={16} /> Add Special Event
                </button>
              </div>

              <div className="space-y-3">
                {content.events.filter(e => !e.isRecurring).length === 0 ? (
                  <div className="text-sm text-[#64748b] italic pl-1">No special events yet.</div>
                ) : (
                  content.events
                    .filter(e => !e.isRecurring)
                    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
                    .map((ev) => (
                      <div key={ev.id} className="bg-[#0a0d18] border border-[#1f2535] rounded-2xl p-5">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-3 items-start">
                          {/* Date */}
                          <div className="md:col-span-3">
                            <label className="text-xs text-[#94a3b8] block mb-1">Date</label>
                            <input
                              type="date"
                              value={ev.date || ''}
                              onChange={(e) => updateEvent(ev.id, 'date', e.target.value)}
                              className="input w-full"
                            />
                          </div>

                          {/* Title */}
                          <div className="md:col-span-5">
                            <label className="text-xs text-[#94a3b8] block mb-1">Title</label>
                            <input
                              type="text"
                              value={ev.title}
                              onChange={(e) => updateEvent(ev.id, 'title', e.target.value)}
                              className="input w-full"
                            />
                          </div>

                          {/* Time */}
                          <div className="md:col-span-4">
                            <label className="text-xs text-[#94a3b8] block mb-1">Time</label>
                            <input
                              type="text"
                              value={ev.time}
                              onChange={(e) => updateEvent(ev.id, 'time', e.target.value)}
                              className="input w-full"
                            />
                          </div>

                          {/* Description */}
                          <div className="md:col-span-10">
                            <label className="text-xs text-[#94a3b8] block mb-1">Description</label>
                            <textarea
                              value={ev.description}
                              onChange={(e) => updateEvent(ev.id, 'description', e.target.value)}
                              className="input w-full min-h-[52px]"
                              rows={2}
                            />
                          </div>

                          {/* Price */}
                          <div className="md:col-span-2">
                            <label className="text-xs text-[#94a3b8] block mb-1">Price</label>
                            <input
                              type="text"
                              value={ev.price || ''}
                              onChange={(e) => updateEvent(ev.id, 'price', e.target.value || undefined)}
                              className="input w-full"
                            />
                          </div>

                          <div className="md:col-span-12 flex justify-end">
                            <button onClick={() => deleteEvent(ev.id)} className="text-xs text-[#f87171] hover:text-red-400 flex items-center gap-1">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            <p className="mt-8 text-xs text-[#64748b]">
              These events are stored locally. A future update can connect this data to the public Events page and homepage preview.
            </p>
          </div>
        )}

        {/* GALLERY */}
        {activeSection === 'gallery' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Homepage Gallery</h2>
              <p className="text-[#94a3b8] mt-1">Manage photos shown in the lightbox on the homepage.</p>
              <p className="text-xs text-[#f59e0b] mt-2">
                Note: You can only reference existing images in <code>/public/images</code> or external URLs. New image files must still be added manually to the project.
              </p>
            </div>

            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category} className="border border-[#1f2535] rounded-3xl overflow-hidden">
                  <div className="bg-[#0a0d18] px-5 py-3 flex items-center justify-between">
                    <div className="font-semibold">{category}</div>
                    <button
                      onClick={() => addGalleryImage(category)}
                      className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f2535] hover:bg-[#272f42]"
                    >
                      <Plus size={14} /> Add Photo
                    </button>
                  </div>

                  <div className="p-5">
                    {content.homepageGallery[category].length === 0 ? (
                      <div className="text-sm text-[#64748b] py-4">No photos in this category.</div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {content.homepageGallery[category].map((img, index) => (
                          <div key={index} className="group relative border border-[#1f2535] rounded-2xl overflow-hidden bg-[#05070f]">
                            <div className="aspect-video bg-black/40 flex items-center justify-center overflow-hidden">
                              <img 
                                src={img} 
                                alt="" 
                                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition" 
                                onError={(e) => (e.currentTarget.style.opacity = '0.3')}
                              />
                            </div>
                            <div className="p-3 text-[10px] font-mono text-[#64748b] truncate">{img}</div>

                            {/* Controls */}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                              <button
                                onClick={() => moveGalleryImage(category, index, -1)}
                                className="bg-black/70 hover:bg-black text-white p-1.5 rounded-lg"
                                disabled={index === 0}
                              >
                                <ArrowUp size={14} />
                              </button>
                              <button
                                onClick={() => moveGalleryImage(category, index, 1)}
                                className="bg-black/70 hover:bg-black text-white p-1.5 rounded-lg"
                                disabled={index === content.homepageGallery[category].length - 1}
                              >
                                <ArrowDown size={14} />
                              </button>
                              <button
                                onClick={() => deleteGalleryImage(category, index)}
                                className="bg-black/70 hover:bg-red-600 text-white p-1.5 rounded-lg"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeSection === 'settings' && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tighter">Settings</h2>
              <p className="text-[#94a3b8] mt-1">Account and future configuration options.</p>
            </div>

            <div className="space-y-6 max-w-xl">
              <div className="bg-[#0a0d18] border border-[#1f2535] rounded-3xl p-6">
                <div className="text-sm text-[#c5a46e] font-medium mb-1">Currently signed in as</div>
                <div className="text-2xl font-semibold tracking-tight">admin</div>
                <p className="text-sm text-[#64748b] mt-4">
                  Your session will remain active until you click Logout.
                </p>
              </div>

              <div className="bg-[#0a0d18] border border-[#1f2535] rounded-3xl p-6">
                <div className="text-sm text-[#c5a46e] font-medium mb-3">Change Password</div>
                <p className="text-[#94a3b8] text-sm mb-4">
                  Password change functionality will be added here in a future update.
                </p>
                <button
                  disabled
                  className="btn-secondary px-6 h-10 text-sm opacity-50 cursor-not-allowed"
                >
                  Change Password (Coming Soon)
                </button>
              </div>

              <div className="text-xs text-[#64748b] pt-2">
                All content changes are stored locally in this browser. A future version will support a real backend and password reset.
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer bar */}
      <div className="border-t border-[#1f2535] mt-12 py-6 text-center text-xs text-[#64748b]">
        Changes are saved automatically to your browser (localStorage). They only affect this device for now.
      </div>
    </div>
  );
}
