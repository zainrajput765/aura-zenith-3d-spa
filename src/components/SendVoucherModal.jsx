import React, { useState } from 'react';
import { X, Mail, Share2, Copy, Check, Send, Phone, MessageSquare, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SendVoucherModal({ isOpen, onClose, voucherData }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [personalNote, setPersonalNote] = useState('Enclosed is your VIP Sanctuary Pass for Aura Zenith Spa.');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'whatsapp', 'link', 'sms'

  if (!isOpen || !voucherData) return null;

  const isGiftCard = voucherData.type === 'giftcard';
  const voucherCode = voucherData.code || 'AZ-VIP-' + Math.floor(100000 + Math.random() * 900000);
  const shareUrl = `${window.location.origin}/#pass?code=${voucherCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#10B981']
    });
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2500);
  };

  const handleWhatsAppSend = () => {
    const messageText = `✨ *Aura Zenith 3D Spa Sanctuary - VIP Pass* ✨\n\nDear Guest,\n${personalNote}\n\n*Pass Code:* ${voucherCode}\n*Details:* ${voucherData.title || voucherData.name || 'Sanctuary Experience'}\n\nAccess Digital Pass Here: ${shareUrl}`;
    const cleanPhone = recipientPhone.replace(/[^0-9]/g, '');
    const waUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`
      : `https://wa.me/?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-bg/90 backdrop-blur-xl animate-fadeIn">
      <div className="glass-card-gold rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative border border-spa-gold/40 text-spa-pearl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-spa-gold/20 flex items-center justify-between bg-spa-card/90">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-spa-bg flex items-center justify-center font-bold">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-brand text-[10px] uppercase tracking-widest text-spa-gold">VIP Dispatch Service</span>
              <h2 className="text-xl font-serif font-bold text-spa-pearl">
                Send Voucher / Pass to VIP Recipient
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-spa-muted hover:text-spa-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-spa-cardBorder bg-spa-softBg/40 text-xs">
          {[
            { id: 'email', label: 'Email Dispatch', icon: Mail },
            { id: 'whatsapp', label: 'WhatsApp Share', icon: MessageSquare },
            { id: 'link', label: 'Copy VIP Link', icon: Copy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 flex items-center justify-center space-x-2 font-medium transition-all ${
                  isActive
                    ? 'bg-spa-gold/20 text-spa-gold border-b-2 border-spa-gold font-semibold'
                    : 'text-spa-muted hover:text-spa-pearl'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {/* Card Preview Chip */}
          <div className="p-4 rounded-2xl bg-spa-card border border-spa-gold/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase text-spa-gold tracking-wider font-bold">Dispatching Item:</span>
              <p className="font-serif font-bold text-sm text-spa-pearl">{voucherData.title || voucherData.name || 'Sanctuary Voucher Pass'}</p>
              <span className="text-[11px] text-spa-muted font-mono">{voucherCode}</span>
            </div>
            <span className="text-lg font-serif font-bold text-spa-gold">${voucherData.amount || voucherData.price || 'VIP'}</span>
          </div>

          {/* TAB 1: EMAIL DISPATCH */}
          {activeTab === 'email' && (
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="text-xs text-spa-muted block mb-1">Recipient Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="vip.client@luxury-domain.com"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-xs text-spa-pearl outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Personal Greeting Note</label>
                <textarea
                  rows="3"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-xs text-spa-pearl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send VIP Digital Pass Email</span>
              </button>
            </form>
          )}

          {/* TAB 2: WHATSAPP SHARE */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-spa-muted block mb-1">Recipient Mobile Phone (Optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2831"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-xs text-spa-pearl outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Personal Message</label>
                <textarea
                  rows="3"
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-xs text-spa-pearl outline-none"
                />
              </div>

              <button
                onClick={handleWhatsAppSend}
                className="w-full py-3.5 rounded-full bg-emerald-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-emerald-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp & Send Pass</span>
              </button>
            </div>
          )}

          {/* TAB 3: COPY VIP LINK */}
          {activeTab === 'link' && (
            <div className="space-y-4 text-center">
              <p className="text-xs text-spa-muted">
                Copy this unique direct digital sanctuary link to share via SMS, Slack, AirDrop, or private message:
              </p>

              <div className="p-3 rounded-xl bg-spa-card border border-spa-gold/30 flex items-center justify-between text-xs">
                <span className="truncate text-spa-gold font-mono pr-2">{shareUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-lg bg-gold-gradient text-spa-bg font-bold flex-shrink-0 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {copied && (
                <p className="text-xs text-spa-emerald font-semibold animate-fadeIn">
                  ✨ VIP Pass link copied to clipboard!
                </p>
              )}
            </div>
          )}

          {sentSuccess && (
            <div className="p-3 rounded-xl bg-spa-emerald/20 border border-spa-emerald text-spa-emerald text-xs text-center font-semibold animate-fadeIn">
              ✨ Digital Pass Successfully Dispatched to Recipient!
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
