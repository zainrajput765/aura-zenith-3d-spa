import React, { useState } from 'react';
import { Crown, CheckCircle2, Sparkles, Star, Calculator, ArrowRight } from 'lucide-react';

export default function Memberships({ onOpenBooking }) {
  const [visitsPerYear, setVisitsPerYear] = useState(12);

  const tiers = [
    {
      name: 'Bronze Lotus',
      badge: 'Essential Sanctuary Access',
      price: '$290',
      period: '/month',
      perks: [
        '1 Signature Massage or Facial monthly (60m)',
        '10% off all additional spa treatments',
        'Access to Zen hydrotherapy thermal pool',
        'Complimentary sound bath meditation session'
      ],
      highlight: false,
    },
    {
      name: 'Gold Aura Sovereign',
      badge: 'Most Popular VIP Privilege',
      price: '$590',
      period: '/month',
      perks: [
        '2 Imperial 4-Hand Massages or Facials monthly (90m)',
        'Unlimited access to Himalayan Pink Salt Sanctuary',
        'Private Hydro-suite upgrade on birthdays',
        '20% discount on all spa elixirs & product boutique',
        'Priority weekend booking & dedicated concierge line'
      ],
      highlight: true,
    },
    {
      name: 'Diamond Zenith Club',
      badge: 'Ultra-Luxury Unlimited VIP',
      price: '$1,290',
      period: '/month',
      perks: [
        'Unlimited Monthly Massages, Facials & Sound Baths',
        'Private Sanctuary Suite reservation for up to 4 guests',
        'Dom Pérignon Champagne service with every visit',
        'Custom 24K Gold luxury skincare care hamper quarterly',
        '24/7 Personal Wellness Concierge chauffeur option'
      ],
      highlight: false,
    }
  ];

  // Dynamic Savings Calculation Formula
  const calculateSavings = () => {
    const avgVisitRetail = 450; // $450 average retail value per visit
    const totalRetailValue = visitsPerYear * avgVisitRetail;
    const goldAnnualCost = 590 * 12;
    const netSavings = Math.max(0, totalRetailValue - goldAnnualCost);
    return { totalRetailValue, goldAnnualCost, netSavings };
  };

  const { totalRetailValue, goldAnnualCost, netSavings } = calculateSavings();

  return (
    <section id="memberships" className="py-24 relative bg-spa-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Exclusive Sovereign Tiers</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl font-normal mt-2">
            Sanctuary <span className="text-gold-gradient italic">VIP Memberships</span>
          </h2>
          <p className="text-spa-muted text-xs sm:text-sm mt-3">
            Elevate your wellness lifestyle with recurring priority privileges, complimentary private suite access, and bespoke luxury amenities.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.highlight
                  ? 'glass-card-gold border-spa-gold shadow-gold-glow scale-105 z-20'
                  : 'glass-card border-spa-cardBorder hover:border-spa-gold/40'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-spa-bg font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-gold-glow flex items-center space-x-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>VIP Sovereign Choice</span>
                </div>
              )}

              <div>
                <div className="text-xs uppercase tracking-wider text-spa-gold font-semibold">
                  {tier.badge}
                </div>
                <h3 className="text-2xl font-serif font-bold text-spa-pearl mt-1">
                  {tier.name}
                </h3>

                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-serif font-bold text-spa-gold">{tier.price}</span>
                  <span className="text-xs text-spa-muted ml-1">{tier.period}</span>
                </div>

                <div className="mt-8 pt-6 border-t border-spa-gold/15 space-y-3">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start space-x-3 text-xs text-spa-pearl/90">
                      <CheckCircle2 className="w-4 h-4 text-spa-gold flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    tier.highlight
                      ? 'bg-gold-gradient text-spa-bg shadow-gold-glow hover:scale-105'
                      : 'bg-spa-softBg text-spa-gold border border-spa-gold/30 hover:bg-spa-gold hover:text-spa-bg'
                  }`}
                >
                  Join Sovereign Club
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Annual VIP Savings Calculator */}
        <div className="mt-20 glass-card-gold rounded-3xl p-8 max-w-4xl mx-auto border border-spa-gold/40 shadow-2xl">
          <div className="flex items-center space-x-3 text-spa-gold mb-4">
            <Calculator className="w-5 h-5" />
            <h4 className="font-brand text-xs font-bold uppercase tracking-widest text-spa-gold">
              Interactive Sovereign VIP Savings Calculator
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-spa-pearl font-semibold">
                <span>Planned Visits Per Year:</span>
                <span className="text-spa-gold font-bold">{visitsPerYear} Visits / Year</span>
              </div>

              <input
                type="range"
                min="6"
                max="24"
                step="1"
                value={visitsPerYear}
                onChange={(e) => setVisitsPerYear(parseInt(e.target.value))}
                className="w-full h-2 bg-spa-cardBorder rounded-lg appearance-none cursor-pointer accent-spa-gold"
              />

              <div className="flex justify-between text-[10px] text-spa-muted">
                <span>6 Visits (Bi-Monthly)</span>
                <span>12 Visits (Monthly)</span>
                <span>24 Visits (Twice Monthly)</span>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-spa-gold/25 space-y-3">
              <div className="flex justify-between text-xs text-spa-muted">
                <span>Retail Treatment Value:</span>
                <span className="text-spa-pearl font-semibold">${totalRetailValue.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-xs text-spa-muted">
                <span>Gold Sovereign Membership Cost:</span>
                <span className="text-spa-pearl font-semibold">${goldAnnualCost.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-spa-gold/20 flex justify-between items-baseline">
                <span className="text-xs uppercase font-bold text-spa-gold tracking-wider">Estimated Annual Savings:</span>
                <span className="text-2xl font-serif font-bold text-spa-emerald">${netSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
