import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export default function Testimonials() {
  const pressQuotes = [
    { outlet: 'VOGUE LUXURY', quote: 'Aura Zenith sets the global gold standard for 3D digital wellness sanctuaries and immersive holistic spa therapy.' },
    { outlet: 'ELLE BEAUTY', quote: 'The 24K Gold Imperial 4-Hand Ritual is quite simply the single most transformative wellness experience in the world.' },
    { outlet: 'HARPER’S BAZAAR', quote: 'Breathtaking 3D visual serenity married with master-level therapeutic craftsmanship.' },
  ];

  const guestReviews = [
    {
      name: 'Princess Sophia K.',
      role: 'VIP Sovereign Member',
      rating: 5,
      comment: 'The Himalayan Salt Sanctuary and Hydrotherapy thermal baths provided me with unmatched peace. The therapist’s attention to detail was royal standard.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Dr. Alexander Vance',
      role: 'Verified Guest',
      rating: 5,
      comment: 'As a surgeon suffering from severe shoulder strain, the 3D Body Focus consultation accurately targeted my cervical tension points. Miraculous results.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      name: 'Camilla & Julian Croft',
      role: 'Couples Hydro Retreat',
      rating: 5,
      comment: 'The sound bath meditation in 432Hz combined with champagne service in our private suite made our anniversary unforgettable. 10/10.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <section id="reviews" className="py-24 bg-spa-softBg/30 relative border-t border-spa-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Accolades Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pressQuotes.map((p, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 border border-spa-gold/20 text-center">
              <span className="font-brand text-xs tracking-widest text-spa-gold uppercase font-bold">{p.outlet}</span>
              <p className="text-xs text-spa-pearl/90 italic mt-2">"{p.quote}"</p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Verified Guest Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-spa-pearl font-normal mt-2">
            Voices of <span className="text-gold-gradient italic">Sanctuary Peace</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guestReviews.map((rev, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-8 flex flex-col justify-between border border-spa-gold/20 hover:border-spa-gold/50 transition-all duration-300">
              <div>
                <div className="flex items-center space-x-1 text-spa-gold mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-spa-gold text-spa-gold" />
                  ))}
                </div>

                <p className="text-xs text-spa-pearl/90 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-spa-gold/15 flex items-center space-x-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-spa-gold/40"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-semibold text-spa-pearl">{rev.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-spa-emerald" />
                  </div>
                  <span className="text-[10px] text-spa-gold block">{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
