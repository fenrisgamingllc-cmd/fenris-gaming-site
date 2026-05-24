import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started at Fenris | New Player Guide',
  description: 'New to tabletop gaming? Accurate guide to Warhammer 40k, Age of Sigmar, Horus Heresy, Magic: The Gathering, Pokémon TCG, One Piece TCG, Gundam Card Game, Bolt Action, Star Wars Unlimited, used models & cards at great prices, and more at Fenris Gaming Hall.',
};

const gettingStartedContent = [
  {
    title: "Warhammer 40k, Age of Sigmar & Horus Heresy",
    description: "Our core miniature wargaming communities.",
    content: "We run events and have strong communities for Warhammer 40,000, Age of Sigmar, and Horus Heresy. Whether you play large battles, narrative campaigns, or smaller games, we have tables and terrain ready. Open play is always free — just show up with your army.",
  },
  {
    title: "Magic: The Gathering",
    description: "The world’s most popular trading card game.",
    content: "Magic is a strategy card game where players build decks and battle using creatures, spells, and clever tactics. The most popular casual format is Commander (EDH). We run weekly Friday Night Magic and have a very welcoming Commander community. You can start with a preconstructed deck and upgrade over time.",
  },
  {
    title: "Pokémon, One Piece & Gundam TCG",
    description: "Popular and growing trading card games.",
    content: "We support Pokémon TCG (sold at MSRP), One Piece TCG, and Gundam Card Game. Regular events and leagues for all three. Great for both competitive players and collectors. New players are always welcome.",
  },
  {
    title: "Bolt Action & Star Wars Miniatures",
    description: "Historical and licensed miniature games.",
    content: "We carry and run events for Bolt Action (WWII) and Star Wars Unlimited. These are excellent for players who enjoy historical or themed skirmish and larger games. Open play and dedicated nights available.",
  },
  {
    title: "Dungeons & Dragons & RPGs",
    description: "Collaborative storytelling and adventure.",
    content: "D&D is our most popular RPG, with multiple nights per week including beginner-friendly tables. We also support other systems. Many people find their regular group just by showing up and playing with different people until they click.",
  },
  {
    title: "Board Games",
    description: "Casual and strategy board games for everyone.",
    content: "We have a large and growing selection of board games. Open play nights are perfect for trying new games or finding people who already play what you like. No experience needed — just ask and someone will teach you.",
  },
  {
    title: "Used Models & Trading Cards",
    description: "Great deals and affordable entry points.",
    content: "We actively buy and sell used models and trading cards at good discounts. This makes getting into the hobby much more affordable for new players and gives experienced players excellent deals on expanding their collections. Ask us about current used inventory when you visit.",
  },
];

const faqs = [
  {
    question: "What kind of products do you sell?",
    answer: "We run events and sell product for Warhammer 40k, Age of Sigmar, Horus Heresy, Magic: The Gathering, Pokémon TCG, One Piece TCG, Gundam Card Game, Bolt Action, and Star Wars Unlimited. We also actively buy and sell used models and trading cards at good discounts, with affordable entry options for new players and collectors looking for great deals.",
  },
  {
    question: "What Warhammer systems do you support?",
    answer: "We run events and have active communities for Warhammer 40k, Age of Sigmar, and Horus Heresy. Open play is always free with tables and terrain available. We also support Bolt Action and Star Wars Unlimited.",
  },
  {
    question: "How do I get into Magic: The Gathering?",
    answer: "The easiest way for most people is the Commander format. It’s casual and social. We run Friday Night Magic every week and have a very welcoming community. You can start with a preconstructed Commander deck and we’re happy to help you choose one that fits your style.",
  },
  {
    question: "How do I find a D&D group?",
    answer: "The best way is to come to one of our regular D&D nights or post in the Discord looking for a table. We have both beginner-friendly games and more experienced campaigns running. A lot of people find their regular group just by showing up consistently.",
  },
  {
    question: "Do you sell Pokémon at market price?",
    answer: "No. We sell all new Pokémon TCG sealed product at MSRP. We believe in keeping the hobby accessible and fair.",
  },
  {
    question: "What’s the difference between Open Play and Events?",
    answer: "Open Play is always free — just show up and play whatever you want. Events and tournaments usually have an entry fee and prizes, but they’re still very beginner-friendly in most cases.",
  },
  {
    question: "Can I just come in to paint and hang out?",
    answer: "Absolutely. Many people treat Fenris as their regular hobby space. We have dedicated painting tables and good lighting. Some nights it’s packed with events, other nights it’s just groups of friends painting and talking. The hall has become a real third space for a lot of people.",
  },
  {
    question: "Do I need to bring anything?",
    answer: "We have plenty of tables and terrain available. For games like Warhammer, players bring their own models, dice, and supplies. If you need something specific, there’s plenty of room to bring it in — just let us know when you arrive.",
  },
  {
    question: "Is it okay if I’ve never played before?",
    answer: "Yes. One of our core values is being beginner friendly. Whether you’ve never touched a game or you’re coming back after years away, you’ll find people excited to teach and play with you.",
  },
  {
    question: "What’s a typical first visit like?",
    answer: "You walk in, say hi, and we’ll show you around. Most nights there are people playing or painting. If you want to try something, just ask — someone will teach you or point you to the right table. No pressure, no cost for open play. A lot of people come back the next week and find their regular crew.",
  },
  {
    question: "Do I have to play games to hang out?",
    answer: "Not at all. Plenty of people treat Fenris as their regular hobby space — they come to paint, build, talk, or just exist in a room full of cool stuff and friendly faces. It’s become a real third space for a lot of folks in Hagerstown.",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="uppercase tracking-[3px] text-[#c5a46e] text-xs mb-3">NEW TO TABLETOP GAMING?</div>
        <h1 className="text-6xl font-semibold tracking-[-3px] mb-4">Getting Started at Fenris</h1>
        <p className="text-xl text-[#94a3af] max-w-3xl mx-auto">
          Whether you’ve never played a game in your life or you’re looking for your next crew, this is the place to begin.
        </p>
      </div>

      {/* What is Fenris */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">What is Fenris Gaming Hall?</h2>
        <p className="text-[#cbd5e1] text-lg leading-relaxed">
          We’re a community-first tabletop gaming hall in Hagerstown, Maryland. We run events and sell product for Warhammer 40k, Age of Sigmar, Horus Heresy, Magic: The Gathering, Pokémon TCG, One Piece TCG, Gundam Card Game, Bolt Action, Star Wars Unlimited, and more. We buy and sell used models and trading cards at good discounts with affordable entry options. Some come just to paint and hobby with friends. Others treat it as their regular hangout — a real <span className="text-[#c5a46e]">third space</span>.
        </p>
      </div>

      {/* What We Offer */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-8 text-center">What Can You Do Here?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Play Games", desc: "Warhammer 40k, Age of Sigmar, Horus Heresy, MTG, Pokémon, One Piece, Gundam, Bolt Action, Star Wars minis & more." },
            { title: "Join Events", desc: "Tournaments, leagues, campaigns, and casual events almost every night." },
            { title: "Paint & Hobby", desc: "Dedicated painting tables with good lighting. Many people come just to hobby with friends." },
            { title: "Find Your Crew", desc: "Regulars are genuinely welcoming. A lot of people find their long-term gaming group here." },
            { title: "Shop New & Used", desc: "New releases + used models and trading cards at good discounts. Affordable entry options." },
            { title: "Just Hang Out", desc: "The hall has become a real third space for hundreds of people in the area." },
          ].map((item, i) => (
            <div key={i} className="card p-6 rounded-3xl">
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-[#94a3af]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Game Guides */}
      <div className="space-y-16 mb-20">
        {gettingStartedContent.map((section, index) => (
          <div key={index}>
            <h2 className="text-3xl font-semibold tracking-tight mb-4">{section.title}</h2>
            <p className="text-[#c5a46e] mb-3">{section.description}</p>
            <p className="text-[#cbd5e1] leading-relaxed max-w-3xl">{section.content}</p>
          </div>
        ))}
      </div>

      {/* What Do We Sell */}
      <div className="mb-20">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">What Kind of Products Do We Sell?</h2>
        <div className="card p-8 rounded-3xl">
          <p className="text-[#cbd5e1] mb-6">
            We stock the full range of games and supplies people actually play and collect here in the hall:
          </p>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-[#e2e8f0]">
            <li>• Warhammer 40k, Age of Sigmar &amp; Horus Heresy</li>
            <li>• Magic: The Gathering (singles &amp; sealed)</li>
            <li>• Pokémon TCG, One Piece TCG &amp; Gundam TCG</li>
            <li>• Bolt Action &amp; Star Wars Miniatures</li>
            <li>• Dungeons &amp; Dragons &amp; other RPGs</li>
            <li>• Board Games</li>
            <li>• Painting supplies &amp; hobby tools</li>
            <li>• Premium Collectibles (Sideshow, Hot Toys, etc.)</li>
            <li>• Terrain &amp; gaming accessories</li>
            <li>• <strong>Used Models &amp; Trading Cards</strong> — We buy &amp; sell at good discounts</li>
          </ul>
          <p className="text-[#94a3af] mt-6 text-sm">
            We focus on making the hobby accessible. We sell many new TCG products at MSRP and offer excellent deals on used models and trading cards. Great discounts and affordable entry options for new players and collectors looking for deals.
          </p>
        </div>
      </div>

      {/* The Third Space */}
      <div className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-10 mb-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">This is a Real Third Space</h2>
        <p className="text-[#cbd5e1] text-lg max-w-2xl mx-auto">
          Some nights the hall is packed with tournaments. Other nights it’s quiet groups of friends painting, talking, and just being together. That’s what Fenris has become for hundreds of people — a place that isn’t home and isn’t work, but somewhere you belong.
        </p>
      </div>

      {/* Common Questions */}
      <div>
        <div className="text-center mb-10">
          <div className="text-[#c5a46e] text-xs tracking-[3px] font-semibold mb-2">STILL HAVE QUESTIONS?</div>
          <h2 className="text-4xl font-semibold tracking-tighter">Common Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="group card rounded-3xl p-6 open:bg-[#11151f] transition-all cursor-pointer">
              <summary className="font-semibold text-lg tracking-tight list-none flex justify-between items-center">
                {faq.question}
                <span className="text-[#c5a46e] group-open:rotate-45 text-2xl leading-none ml-4 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-[#cbd5e1] leading-relaxed pr-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-20 text-center">
        <p className="text-[#94a3af] mb-6 text-lg">Still not sure where to start?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://discord.gg/AGnfaCStVA" target="_blank" rel="noopener noreferrer" className="btn-primary px-10 h-14 text-base">
            Join the Discord
          </a>
          <a href="/contact" className="btn-secondary px-10 h-14 text-base">
            Plan Your First Visit
          </a>
        </div>
        <p className="text-xs text-[#64748b] mt-6">No experience required. Just show up.</p>
      </div>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
