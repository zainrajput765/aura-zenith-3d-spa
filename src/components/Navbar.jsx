import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Ticket } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenSound, isMuted, setIsMuted, onOpenMyReservations, reservationCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '3D Sanctuary', href: '#hero' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'Body Map', href: '#bodymap' },
    { name: '3D Suites', href: '#suites' },
    { name: 'Elixirs', href: '#elixirs' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'VIP Tiers', href: '#memberships' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-2 sm:px-4 pt-3 pointer-events-none">
      
      {/* Floating Glass Island Container */}
      <div className={`pointer-events-auto max-w-[1400px] mx-auto rounded-full transition-all duration-500 border overflow-hidden ${
        scrolled
          ? 'bg-spa-card/95 backdrop-blur-2xl border-spa-gold/40 shadow-2xl py-2 px-3 sm:px-5 shadow-gold-glow'
          : 'bg-spa-bg/85 backdrop-blur-xl border-spa-gold/30 py-2.5 px-3 sm:px-5'
      }`}>
        <div className="flex items-center justify-between w-full">
          
          {/* Brand Logo Crest */}
          <a href="#hero" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-spa-gold/60 flex items-center justify-center bg-gradient-to-br from-spa-card via-spa-bg to-spa-cardGroup group-hover:border-spa-gold transition-all duration-300 shadow-gold-glow">
              <span className="text-base sm:text-lg">🌿</span>
            </div>
            <div>
              <span className="font-brand text-sm sm:text-base font-bold tracking-[0.15em] text-gold-gradient block">
                AURA ZENITH
              </span>
              <span className="block text-[7.5px] uppercase tracking-[0.25em] text-spa-gold/90 font-semibold -mt-1">
                3D Spa Sanctuary
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Only visible on 2xl screens to leave 100% room for action buttons on normal laptops) */}
          <nav className="hidden 2xl:flex items-center space-x-1 bg-spa-softBg/60 px-3 py-1 rounded-full border border-spa-gold/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[10.5px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full text-spa-pearl/80 hover:text-spa-bg hover:bg-gold-gradient transition-all duration-300 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            
            {/* My Passes Pill Button */}
            <button
              onClick={onOpenMyReservations}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-spa-emerald/50 bg-spa-emerald/10 text-spa-emerald hover:bg-spa-emerald hover:text-spa-bg transition-all text-xs font-bold shadow-emerald-glow whitespace-nowrap"
              title="Manage Active Sanctuary Passes"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Passes</span>
              <span className="w-4 h-4 rounded-full bg-spa-emerald text-spa-bg text-[10px] font-bold flex items-center justify-center">
                {reservationCount}
              </span>
            </button>

            {/* Book Sanctuary Primary Button - Fits 100% inside container without any overflow! */}
            <button
              onClick={onOpenBooking}
              className="flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-full bg-gold-gradient text-spa-bg font-extrabold text-xs tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap flex-shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Sanctuary</span>
            </button>

            {/* Mobile / Laptop Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="2xl:hidden p-1.5 rounded-full bg-spa-card border border-spa-gold/40 text-spa-gold hover:text-spa-pearl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Dropdown Menu Overlay for Nav Links */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto max-w-7xl mx-auto mt-2 glass-card-gold rounded-3xl p-4 shadow-2xl border border-spa-gold/40 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xs uppercase tracking-wider font-semibold p-2.5 rounded-xl bg-spa-card border border-spa-gold/20 text-spa-pearl hover:text-spa-gold hover:border-spa-gold transition-colors text-center"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
