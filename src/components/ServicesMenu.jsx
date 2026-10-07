import React, { useState } from 'react';
import { Clock, Sparkles, Shield, ChevronRight, CheckCircle2 } from 'lucide-react';

export const SPA_SERVICES = [
  {
    id: 'zenith-signature',
    category: 'massages',
    name: 'Aura Zenith Imperial 4-Hand Ritual',
    tagline: 'Synchronized dual-therapist holistic body restoration',
    duration: '90 Mins',
    price: '$450',
    popular: true,
    description: 'Two master therapists perform synchronized hot basalt stone massage, warm organic Jasmine oil infusion, and Tibetan sound bowl frequency alignment.',
    includes: ['Synchronized 4-hand massage', 'Warm organic Jasmine oil', '24K gold foil facial accent', 'Private hydrotherapy bath access']
  },
  {
    id: 'deep-tissue',
    category: 'massages',
    name: 'Volcanic Basalt Deep Muscle Sculpting',
    tagline: 'Targeted chronic tension & myofascial release',
    duration: '75 Mins',
    price: '$280',
    popular: false,
    description: 'Penetrating thermal basalt stones heated to 54°C combined with concentrated Arnica extracts to release muscular knots and restore mobility.',
    includes: ['Thermal volcanic basalt stones', 'Arnica & Chamomile oil blend', 'Acupressure trigger point therapy', 'Spinal column alignment']
  },
  {
    id: 'gold-facial',
    category: 'facials',
    name: '24K Gold Sovereignty Anti-Aging Facial',
    tagline: 'Pure gold leaf cellular rejuvenation & lymphatic lift',
    duration: '90 Mins',
    price: '$390',
    popular: true,
    description: 'Ultra-luxurious facial incorporating 99.9% pure 24K gold foil flakes, micro-current contour sculpting, and chilled rose quartz lymphatic drainage.',
    includes: ['24K pure gold leaf application', 'Cryo-jade roller drainage', 'Collagen peptide infusion', 'Red LED photon therapy']
  },
  {
    id: 'diamond-peel',
    category: 'facials',
    name: 'Diamond Micro-Dermabrasion & Oxygen Glow',
    tagline: 'Precision exfoliation with hyperbaric oxygen mist',
    duration: '60 Mins',
    price: '$260',
    popular: false,
    description: 'Laser-cut diamond tip dermabrasion followed by hyperbaric oxygen serum mist infusion for immediate radiant glass-skin texture.',
    includes: ['Diamond tip micro-exfoliation', '98% pure hyperbaric oxygen mist', 'Hyaluronic acid mask', 'UV defense shield']
  },
  {
    id: 'royal-hydro',
    category: 'hydrotherapy',
    name: 'Royal Botanical Thermal Hydro-Soak',
    tagline: 'Mineral rich thermal spring bath with fresh rose petals',
    duration: '60 Mins',
    price: '$220',
    popular: false,
    description: 'Private immersion in a hand-carved stone thermal tub infused with Dead Sea minerals, organic coconut milk, and fresh wild Damask rose petals.',
    includes: ['Private thermal stone tub', 'Dead Sea mineral bath salts', 'Complimentary Champagne & berries', 'Submerged hydro-jets']
  },
  {
    id: 'sound-bath',
    category: 'sound',
    name: 'Quartz Crystal Sound Bath & Energy Cleanse',
    tagline: 'Binaural acoustic frequency meditation',
    duration: '60 Mins',
    price: '$195',
    popular: false,
    description: 'Immersive sound therapy utilizing 14 pure quartz crystal singing bowls tuned to 432Hz to clear mental fog, release trauma, and induce theta brainwaves.',
    includes: ['432Hz quartz singing bowls', 'Zero-gravity memory lounger', 'Custom chakra aromatherapy', 'Acoustic resonance dome']
  }
];

export default function ServicesMenu({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Experiences' },
    { id: 'massages', label: 'Massages & Rituals' },
    { id: 'facials', label: 'Facials & Glow' },
    { id: 'hydrotherapy', label: 'Hydrotherapy' },
    { id: 'sound', label: 'Sound & Energy' },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SPA_SERVICES 
    : SPA_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="treatments" className="py-24 relative overflow-hidden bg-spa-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Bespoke Wellness Catalog</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl font-normal mt-2">
            Sanctuary <span className="text-gold-gradient italic">Treatment Rituals</span>
          </h2>
          <p className="text-spa-muted text-sm sm:text-base mt-4">
            Curated by international master therapists, each ritual harmonizes ancient healing wisdom with cutting-edge holistic wellness technology.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-spa-gold text-spa-bg font-bold shadow-gold-glow'
                    : 'glass-card text-spa-muted hover:text-spa-pearl hover:border-spa-gold/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:border-spa-gold/50 hover:shadow-2xl group relative"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-gold-gradient text-spa-bg text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full flex items-center space-x-1 shadow-gold-glow">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature Ritual</span>
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2 text-spa-gold text-xs font-semibold uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.duration}</span>
                </div>

                <h3 className="text-2xl font-serif text-spa-pearl group-hover:text-spa-gold transition-colors font-medium">
                  {service.name}
                </h3>
                
                <p className="text-xs text-spa-gold/90 font-medium italic mt-1">
                  "{service.tagline}"
                </p>

                <p className="text-xs text-spa-muted mt-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Ritual Highlights list */}
                <div className="mt-6 pt-6 border-t border-spa-gold/15 space-y-2">
                  <span className="text-[11px] uppercase tracking-wider text-spa-gold font-semibold block mb-2">Ritual Includes:</span>
                  {service.includes.map((inc, i) => (
                    <div key={i} className="flex items-center space-x-2 text-xs text-spa-pearl/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-spa-emerald flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Book Button Footer */}
              <div className="mt-8 pt-6 border-t border-spa-cardBorder flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-spa-muted block">Session Investment</span>
                  <span className="text-2xl font-serif font-bold text-spa-gold">{service.price}</span>
                </div>

                <button
                  onClick={() => onSelectService(service)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-spa-softBg hover:bg-gold-gradient text-spa-gold hover:text-spa-bg font-semibold text-xs tracking-wider uppercase transition-all duration-300 border border-spa-gold/30 hover:border-transparent group-hover:shadow-gold-glow"
                >
                  <span>Reserve</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
