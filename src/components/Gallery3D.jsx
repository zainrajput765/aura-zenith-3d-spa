import React, { useState } from 'react';
import { Eye, Sparkles, X, ChevronRight, Award } from 'lucide-react';

export const GALLERY_ITEMS = [
  {
    id: 'sanctuary',
    title: 'The Imperial Hydrotherapy Sanctuary',
    category: 'Architecture & Pools',
    image: '/images/hero_sanctuary.png',
    description: 'Submerged massage loungers immersed in 38°C thermal mineral water with floating wild rose petals and champagne illumination.'
  },
  {
    id: 'suite',
    title: 'Royal Botanical Treatment Suite',
    category: 'Massage Cabins',
    image: '/images/treatment_room.png',
    description: 'Private single or couples suite featuring heated basalt stone therapy tables, organic bamboo flora, and warm candle mist.'
  },
  {
    id: 'elixirs',
    title: '24K Gold Botanical Elixir Apothecary',
    category: 'Skincare & Oils',
    image: '/images/elixir_bottles.png',
    description: 'Hand-blown obsidian glass decanters containing pure 24K gold foil flakes and cold-pressed Egyptian jasmine oils.'
  },
  {
    id: 'salt',
    title: 'Himalayan Pink Salt Halotherapy Cave',
    category: 'Chambers',
    image: '/images/salt_cave.png',
    description: 'Constructed from 2,000kg of pure Himalayan salt blocks generating respiratory purifying micro-particles and zero-gravity comfort.'
  }
];

export default function Gallery3D({ onOpenBooking }) {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-24 bg-spa-bg relative overflow-hidden border-t border-spa-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Hyperrealistic Visual Showcase</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl font-normal mt-2">
            Sanctuary <span className="text-gold-gradient italic">3D Visual Gallery</span>
          </h2>
          <p className="text-xs sm:text-sm text-spa-muted mt-3">
            Preview our state-of-the-art architectural suites, thermal hydro-pools, and organic gold apothecaries.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="glass-card rounded-3xl overflow-hidden cursor-pointer group border border-spa-gold/30 hover:border-spa-gold hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-spa-bg via-transparent to-transparent opacity-80" />
                
                <div className="absolute top-3 left-3 bg-spa-bg/80 backdrop-blur px-2.5 py-1 rounded-full text-[10px] text-spa-gold font-semibold uppercase border border-spa-gold/30">
                  {item.category}
                </div>

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-gold-gradient text-spa-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-gold-glow">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif font-semibold text-lg text-spa-pearl group-hover:text-spa-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-spa-muted mt-2 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-bg/95 backdrop-blur-2xl animate-fadeIn">
            <div className="glass-card-gold rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-spa-gold/50 flex flex-col lg:flex-row">
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-spa-bg/80 text-spa-pearl hover:text-spa-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="lg:w-3/5 h-80 lg:h-auto relative">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:w-2/5 p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-spa-gold tracking-widest block">{activeImage.category}</span>
                  <h3 className="text-2xl font-serif font-bold text-spa-pearl mt-1">{activeImage.title}</h3>
                  <p className="text-xs text-spa-muted leading-relaxed mt-4">{activeImage.description}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveImage(null);
                    onOpenBooking();
                  }}
                  className="w-full py-3.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Reserve Sanctuary Experience</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
