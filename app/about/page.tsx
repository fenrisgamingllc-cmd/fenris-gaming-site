import { Users, Award, Heart } from 'lucide-react';
import { AboutHeroText, AboutGrandOpeningText } from './AboutDynamicContent';

export default function AboutPage() {
  const owners = [
    {
      name: "Adam & Pamela Francis",
      role: "Co-owners",
      bio: [
        "Adam (Co-owner & President) is a 20+ year law enforcement veteran and lifelong hobbyist. His grandmother introduced him to Warhammer 40,000 as a child. Twelve years ago he started a small gaming club in his home that grew into the Fenris community. He brings discipline, leadership, and a deep love for the hobby to everything we do.",
        "Pamela (Co-owner) is the organizational backbone and marketing mind behind Fenris. She keeps the business running smoothly while helping shape the long-term vision. Her attention to detail and dedication to the community is a cornerstone of our success.",
      ],
      image: "/images/adam-and-pam.jpg",
    },
    {
      name: "Jonathan Blank",
      role: "Co-owner & General Manager",
      bio: "Grew up in the height of the Pokémon craze and never looked back. Competitive Magic player for years, now deeply passionate about Age of Sigmar and Warhammer systems. Jon believes gaming is community first, and works every day to make sure every visitor feels welcome.",
    },
    {
      name: "James Cuff",
      role: "Co-owner",
      bio: "U.S. Army veteran whose love of strategy games began during his service. Active player of Warhammer 40k, Age of Sigmar, Horus Heresy, Bolt Action, and more. James brings a grounded, friendly presence and is regularly at the tables playing alongside the community.",
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-[#0a0d18] border-b border-[#1f2535] py-20">
        <div className="max-w-4xl mx-auto px-5">
          <div className="uppercase text-xs tracking-[3px] text-[#c5a46e] font-semibold mb-3">OUR STORY</div>
          <h1 className="text-6xl font-semibold tracking-[-3px] mb-5">Twelve years<br />in the making.</h1>
          <AboutHeroText />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Grand Opening highlight */}
        <div className="bg-[#11151f] border border-[#1f2535] rounded-3xl p-8 md:p-10">
          <div className="uppercase tracking-widest text-xs text-[#c5a46e] mb-2">OCTOBER 31, 2025</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Grand Opening at Our New Home</h2>
          
          {/* Real photo from the October 31, 2025 grand opening ribbon cutting */}
          <div className="my-6 overflow-hidden rounded-2xl border border-[#1f2535]">
            <img 
              src="/images/ribbon-cutting.jpg" 
              alt="Community at the grand opening of Fenris Gaming Hall" 
              className="w-full object-cover" 
            />
            <div className="bg-[#0f1320] px-4 py-3 text-sm text-[#94a3b8]">
              Ribbon cutting — New location, October 31, 2025
            </div>
          </div>

          <AboutGrandOpeningText />
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Users className="w-6 h-6" />, title: "Community First", text: "Every decision starts with: does this make the hall better for the people who play here?" },
            { icon: <Award className="w-6 h-6" />, title: "Expert Staff", text: "Our team paints, plays competitively, and knows the games inside out. We’re here to help you build, paint, and win." },
            { icon: <Heart className="w-6 h-6" />, title: "Inclusive by Design", text: "Casual players, competitive tournament grinders, kids, parents, and everyone in between are welcome at our tables." },
          ].map((v, i) => (
            <div key={i} className="card rounded-3xl p-7">
              <div className="text-[#c5a46e] mb-4">{v.icon}</div>
              <div className="font-semibold text-xl mb-2">{v.title}</div>
              <p className="text-[#94a3b8] text-sm">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Owners */}
        <div>
          <div className="text-center mb-10">
            <div className="uppercase text-xs tracking-[2.5px] text-[#c5a46e] mb-1">THE TEAM</div>
            <h2 className="text-4xl font-semibold tracking-[-1.5px]">Meet the owners</h2>
          </div>

          <div className="space-y-6">
            {owners.map((owner, index) => (
              <div key={index} className="card rounded-3xl p-8 md:flex gap-8">
                {/* Left column: Name + Role + Photo (if exists) */}
                <div className="md:w-72 shrink-0 mb-6 md:mb-0">
                  <div className="font-semibold text-2xl tracking-tight">{owner.name}</div>
                  <div className="text-[#c5a46e] text-sm mt-0.5 mb-4">{owner.role}</div>
                  {owner.image && (
                    <img 
                      src={owner.image} 
                      alt={`${owner.name}, co-owners of Fenris Gaming Hall`} 
                      className="w-full rounded-2xl object-cover aspect-[4/3]" 
                    />
                  )}
                </div>

                {/* Right column: Bio */}
                <div className="flex-1">
                  {Array.isArray(owner.bio) ? (
                    owner.bio.map((paragraph, i) => (
                      <p key={i} className="text-[#cbd5e1] leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-[#cbd5e1] leading-relaxed">{owner.bio}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 text-center text-sm text-[#64748b] border-t border-[#1f2535]">
          We’re not just a store. We’re the place you come to roll dice with friends, paint your first model, or find your next opponent.
        </div>

      </div>
    </div>
  );
}
