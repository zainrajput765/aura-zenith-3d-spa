import React, { useState } from 'react';
import { Gift, Crown, Sparkles, Download, Check, Heart, ShieldCheck, Mail, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GiftCardDesigner({ onOpenSendVoucher }) {
  const [amount, setAmount] = useState(500);
  const [recipient, setRecipient] = useState('Lady Genevieve');
  const [sender, setSender] = useState('Lord Sterling');
  const [message, setMessage] = useState('Wishing you unforgettable sanctuary serenity and complete rejuvenation.');
  const [theme, setTheme] = useState('obsidian'); // obsidian, emerald, pearl
  const [seal, setSeal] = useState('lotus'); // lotus, crown, mandala
  const [issued, setIssued] = useState(false);

  const amounts = [250, 500, 1000, 2500];

  const handleIssueCard = (e) => {
    e.preventDefault();
    setIssued(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F5E096', '#10B981']
    });

    if (onOpenSendVoucher) {
      onOpenSendVoucher({
        type: 'giftcard',
        code: 'AZ-GIFT-' + Math.floor(100000 + Math.random() * 900000),
        title: `$${amount} Sovereign 24K Gift Card`,
        amount: amount,
        guestName: recipient,
        senderName: sender,
        message: message
      });
    }
  };

  return (
    <section className="py-24 relative bg-spa-bg overflow-hidden border-t border-spa-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Bespoke Gifting Service</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl font-normal mt-2">
            24K Gold <span className="text-gold-gradient italic">Sanctuary Gift Card</span>
          </h2>
          <p className="text-xs sm:text-sm text-spa-muted mt-3">
            Gift an unforgettable journey of holistic peace. Custom-embossed digital vouchers with wax seals & instant delivery to customers or VIPs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Card Preview Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className={`w-full max-w-md h-64 sm:h-72 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 shadow-2xl border ${
              theme === 'obsidian' 
                ? 'bg-gradient-to-br from-[#121820] via-[#090D10] to-[#1E2732] border-spa-gold/50 shadow-gold-glow'
                : theme === 'emerald'
                ? 'bg-gradient-to-br from-[#064E3B] via-[#0B1015] to-[#047857] border-spa-emerald/50 shadow-emerald-glow'
                : 'bg-gradient-to-br from-[#2D211A] via-[#120F0D] to-[#422D24] border-spa-gold/50 shadow-gold-glow'
            }`}>
              
              {/* Subtle Gold Foil Grid Background */}
              <div className="absolute inset-0 bg-gold-shimmer-bg opacity-20 pointer-events-none" />

              {/* Card Top Row */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full border border-spa-gold/50 flex items-center justify-center bg-spa-card/60">
                    <span className="text-sm">🌿</span>
                  </div>
                  <div>
                    <span className="font-brand text-sm font-bold tracking-widest text-spa-pearl block">
                      AURA ZENITH
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-spa-gold block">
                      Sovereign Gift Pass
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-spa-muted block">Value</span>
                  <span className="font-serif text-2xl font-bold text-spa-gold">${amount}</span>
                </div>
              </div>

              {/* Card Middle Message */}
              <div className="z-10 my-2">
                <p className="text-[11px] text-spa-pearl/90 italic line-clamp-2">
                  "{message || 'Wishing you deep tranquil peace and cellular restoration.'}"
                </p>
              </div>

              {/* Card Bottom Row */}
              <div className="flex justify-between items-end z-10 pt-4 border-t border-spa-gold/20">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-spa-muted block">Presented To</span>
                  <span className="font-serif font-semibold text-sm text-spa-pearl">{recipient || 'Valued Guest'}</span>
                  <span className="text-[9px] text-spa-gold block mt-0.5">From: {sender || 'Aura Zenith VIP'}</span>
                </div>

                {/* Simulated Gold Wax Seal Stamp */}
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-spa-bg flex items-center justify-center shadow-gold-glow border-2 border-spa-gold">
                  {seal === 'lotus' && <span className="text-lg">🪷</span>}
                  {seal === 'crown' && <Crown className="w-6 h-6 stroke-[2.5]" />}
                  {seal === 'mandala' && <Sparkles className="w-6 h-6 stroke-[2.5]" />}
                </div>
              </div>

            </div>
          </div>

          {/* Designer Controls Column */}
          <div className="lg:col-span-6 glass-card rounded-3xl p-8 border border-spa-gold/30 shadow-2xl space-y-6">
            
            <div>
              <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-2">
                Select Voucher Value:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {amounts.map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-2.5 rounded-xl font-serif text-sm font-bold border transition-all ${
                      amount === val
                        ? 'bg-spa-gold text-spa-bg border-spa-gold shadow-gold-glow'
                        : 'bg-spa-card border-spa-cardBorder hover:border-spa-gold/40 text-spa-pearl'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-spa-muted block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-2.5 text-xs text-spa-pearl outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Your Name (Sender)</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-2.5 text-xs text-spa-pearl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-spa-muted block mb-1">Personal Message</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-2.5 text-xs text-spa-pearl outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-spa-muted block mb-1">Card Finish Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-3 py-2 text-xs text-spa-pearl outline-none"
                >
                  <option value="obsidian">Obsidian Gold</option>
                  <option value="emerald">Imperial Emerald</option>
                  <option value="pearl">Rose Mahogany</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Gold Wax Seal Motif</label>
                <select
                  value={seal}
                  onChange={(e) => setSeal(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-3 py-2 text-xs text-spa-pearl outline-none"
                >
                  <option value="lotus">Sacred Lotus</option>
                  <option value="crown">Sovereign Crown</option>
                  <option value="mandala">Zen Mandala</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleIssueCard}
              className="w-full py-3.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Send Digital Voucher to Customer / VIP (${amount})</span>
            </button>

            {issued && (
              <p className="text-xs text-spa-emerald font-semibold text-center animate-fadeIn">
                ✨ Digital Voucher Created & Dispatched!
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
