import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User } from 'lucide-react';

export default function ConciergeChat({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings. I am Aura, your personal Spa Sanctuary Concierge. How may I assist your relaxation journey today?'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const quickQuestions = [
    'What should I wear to hydrotherapy?',
    'What is the cancellation policy?',
    'Are gift certificates available?',
    'Can I book a private couples suite?'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate automated AI Concierge response
    setTimeout(() => {
      let replyText = "Thank you for inquiring. Our Sanctuary Concierge team ensures every detail of your visit is flawlessly prepared. Would you like me to reserve a session for you?";
      
      const lower = query.toLowerCase();
      if (lower.includes('wear') || lower.includes('dress') || lower.includes('attire')) {
        replyText = "We provide plush organic cotton robes, thermal slippers, and private lockers upon arrival. Swimwear is optional in private hydrotherapy suites.";
      } else if (lower.includes('cancellation') || lower.includes('cancel')) {
        replyText = "Reservations may be rescheduled or cancelled with zero penalty up to 4 hours prior to your scheduled arrival time.";
      } else if (lower.includes('gift') || lower.includes('certificate')) {
        replyText = "Yes! Digital & physical 24K Gold Embossed Sanctuary Gift Certificates are available for all rituals and custom monetary amounts.";
      } else if (lower.includes('couple') || lower.includes('private')) {
        replyText = "Our Royal Hydrotherapy Suites are specially designed for intimate couples retreats, featuring dual hydro tubs, champagne service, and private fireplace loungers.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
    }, 600);
  };

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase shadow-gold-glow hover:scale-105 transition-all duration-300"
        >
          <Bot className="w-5 h-5" />
          <span className="hidden sm:inline">Concierge Chat</span>
        </button>
      ) : (
        <div className="glass-card-gold rounded-3xl w-80 sm:w-96 shadow-2xl overflow-hidden border border-spa-gold/40 text-spa-pearl flex flex-col h-[460px] animate-fadeIn">
          {/* Header */}
          <div className="p-4 bg-spa-card/90 border-b border-spa-gold/20 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gold-gradient text-spa-bg flex items-center justify-center font-bold text-xs">
                ✨
              </div>
              <div>
                <h4 className="font-brand text-xs font-bold text-spa-gold tracking-wider uppercase">Aura Concierge</h4>
                <span className="text-[9px] text-spa-emerald flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-spa-emerald animate-ping" />
                  <span>Online & Ready</span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-spa-muted hover:text-spa-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-spa-gold text-spa-bg font-medium rounded-tr-none'
                      : 'bg-spa-softBg border border-spa-gold/20 text-spa-pearl rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-spa-bg/60 border-t border-spa-cardBorder flex gap-1.5 overflow-x-auto text-[10px]">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-spa-card border border-spa-gold/20 text-spa-muted hover:text-spa-gold whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-spa-card border-t border-spa-gold/20 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask Aura Concierge..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-spa-softBg border border-spa-cardBorder focus:border-spa-gold rounded-full px-4 py-2 text-xs text-spa-pearl outline-none"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-gold-gradient text-spa-bg hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
