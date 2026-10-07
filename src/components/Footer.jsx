import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer({ onOpenBooking }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-spa-bg border-t border-spa-gold/20 text-spa-pearl pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-16 border-b border-spa-gold/15">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full border border-spa-gold/50 flex items-center justify-center bg-spa-card">
                <span>🌿</span>
              </div>
              <span className="font-brand text-xl font-bold tracking-widest text-spa-pearl">
                AURA ZENITH
              </span>
            </div>

            <p className="text-xs text-spa-muted leading-relaxed">
              Ultra-luxury 3D Spa & Wellness Sanctuary dedicated to body longevity, mental quietude, and holistic sensory restoration.
            </p>

            <div className="flex space-x-3 pt-2">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-spa-gold hover:bg-spa-gold hover:text-spa-bg transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Location & Hours */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold text-spa-gold tracking-widest uppercase">Sanctuary Hours & Location</h4>
            
            <div className="space-y-2 text-xs text-spa-muted">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-spa-gold flex-shrink-0 mt-0.5" />
                <span>100 Royal Sovereign Blvd, Suite 800, Beverly Luxury Haven</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-spa-gold flex-shrink-0" />
                <span>Mon – Sun: 08:00 AM – 10:00 PM</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-spa-gold flex-shrink-0" />
                <span>+1 (800) 888-AURA / Concierge VIP</span>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-spa-gold flex-shrink-0" />
                <span>concierge@aurazenith-spa.com</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold text-spa-gold tracking-widest uppercase">Experiences</h4>
            <ul className="space-y-2 text-xs text-spa-muted">
              <li><a href="#hero" className="hover:text-spa-gold transition-colors">3D Sanctuary Visualizer</a></li>
              <li><a href="#treatments" className="hover:text-spa-gold transition-colors">Imperial 4-Hand Massages</a></li>
              <li><a href="#bodymap" className="hover:text-spa-gold transition-colors">3D Body Tension Consultation</a></li>
              <li><a href="#suites" className="hover:text-spa-gold transition-colors">Himalayan Salt & Hydro Suites</a></li>
              <li><a href="#memberships" className="hover:text-spa-gold transition-colors">Sovereign VIP Tiers</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-brand text-xs font-bold text-spa-gold tracking-widest uppercase">The Zenith Dispatch</h4>
            <p className="text-xs text-spa-muted">
              Subscribe to receive exclusive invitation-only wellness retreat passes and secret seasonal elixir releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-spa-softBg border border-spa-gold/30 focus:border-spa-gold rounded-full px-4 py-2.5 text-xs text-spa-pearl outline-none pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gold-gradient text-spa-bg"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-spa-emerald font-semibold animate-fadeIn">
                  ✨ Welcome to the Zenith Dispatch circle!
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-spa-muted space-y-4 sm:space-y-0">
          <p>© 2026 AURA ZENITH 3D SPA & WELLNESS SANCTUARY. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-spa-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-spa-gold transition-colors">Terms of Hospitality</a>
            <a href="#" className="hover:text-spa-gold transition-colors">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
