import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Sparkles, Check, Download, ShieldCheck, Wine, Heart, ChevronRight, ArrowLeft, Share2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPA_SERVICES } from './ServicesMenu';

export default function BookingModal({ isOpen, onClose, initialService, onAddReservation, onOpenSendVoucher, onOpenMyReservations }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || SPA_SERVICES[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2026-09-22');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [therapistPref, setTherapistPref] = useState('Any Master Therapist');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');

  // Reset booking wizard to Step 1 whenever modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedAddons([]);
      setConfirmationCode('');
      if (initialService) {
        setSelectedService(initialService);
      }
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const addons = [
    { id: 'champagne', name: 'Dom Pérignon Champagne & Strawberry Service', price: 95, icon: Wine },
    { id: 'cbd', name: 'Organic CBD Thermal Oil Infusion', price: 45, icon: Sparkles },
    { id: 'gold', name: '24K Pure Gold Leaf Temple Application', price: 65, icon: Heart },
    { id: 'hydro', name: '30-Minute Extra Hydro-Thermal Bath Session', price: 80, icon: Clock },
  ];

  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateTotal = () => {
    const base = parseInt(selectedService.price.replace('$', '')) || 0;
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const item = addons.find(a => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
    return base + addonsTotal;
  };

  const handleCompleteBooking = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const code = 'AZ-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    
    const newReservation = {
      code,
      serviceName: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      therapist: therapistPref,
      guestName: guestName || 'Valued VIP Guest',
      guestEmail: guestEmail || 'vip@guest.com',
      guestPhone: guestPhone || '+1 (555) 234-5678',
      price: '$' + calculateTotal(),
      status: 'Confirmed'
    };

    if (onAddReservation) {
      onAddReservation(newReservation);
    }

    setStep(4);
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F5E096', '#10B981', '#ffffff']
    });
  };

  const downloadCalendarFile = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aura Zenith 3D Spa Sanctuary//EN
BEGIN:VEVENT
SUMMARY:Aura Zenith Sanctuary - ${selectedService.name}
DESCRIPTION:Reservation Pass: ${confirmationCode}. Service: ${selectedService.name}. Guest: ${guestName}.
DTSTART:20260922T143000Z
DTEND:20260922T160000Z
LOCATION:Aura Zenith Spa Sanctuary, Royal Sovereign Avenue
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aura_Zenith_Pass_${confirmationCode}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-bg/90 backdrop-blur-xl animate-fadeIn">
      <div className="glass-card-gold rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-spa-gold/40 text-spa-pearl max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-spa-gold/20 flex items-center justify-between bg-spa-card/80">
          <div>
            <span className="font-brand text-[10px] uppercase tracking-widest text-spa-gold">Aura Zenith VIP Booking</span>
            <h2 className="text-2xl font-serif font-bold text-spa-pearl">
              {step === 4 ? 'Reservation Confirmed' : 'Reserve Sanctuary Experience'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-spa-muted hover:text-spa-gold hover:bg-spa-gold/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="px-6 py-3 bg-spa-softBg/50 border-b border-spa-cardBorder flex items-center justify-between text-xs">
            <div className="flex items-center space-x-6">
              {[
                { num: 1, label: 'Ritual & Add-ons' },
                { num: 2, label: 'Date & Time' },
                { num: 3, label: 'Guest Info' },
              ].map((s) => (
                <div key={s.num} className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                    step >= s.num ? 'bg-spa-gold text-spa-bg' : 'bg-spa-cardBorder text-spa-muted'
                  }`}>
                    {s.num}
                  </div>
                  <span className={step === s.num ? 'text-spa-gold font-medium' : 'text-spa-muted'}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-spa-gold font-bold font-serif text-sm">
              Total: ${calculateTotal()}
            </span>
          </div>
        )}

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Select Service & Luxury Add-ons */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-3">
                  Select Sanctuary Ritual:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPA_SERVICES.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        selectedService.id === srv.id
                          ? 'bg-spa-gold/15 border-spa-gold text-spa-pearl shadow-gold-glow'
                          : 'bg-spa-card hover:bg-spa-cardBorder border-spa-cardBorder text-spa-muted'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-serif font-semibold text-sm text-spa-pearl">{srv.name}</span>
                        <span className="text-xs font-bold text-spa-gold">{srv.price}</span>
                      </div>
                      <span className="text-[11px] block mt-1 text-spa-muted">{srv.duration} • {srv.tagline}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Luxury Add-on Enhancements */}
              <div className="pt-4 border-t border-spa-gold/15">
                <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-3">
                  Bespoke Enhancements (Optional):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {addons.map((addon) => {
                    const Icon = addon.icon;
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl cursor-pointer border flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-spa-emerald/15 border-spa-emerald text-spa-pearl'
                            : 'bg-spa-card border-spa-cardBorder hover:border-spa-gold/30 text-spa-muted'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className={`w-4 h-4 ${isChecked ? 'text-spa-emerald' : 'text-spa-gold'}`} />
                          <div>
                            <p className="text-xs font-medium text-spa-pearl">{addon.name}</p>
                            <p className="text-[10px] text-spa-gold">+${addon.price}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                          isChecked ? 'bg-spa-emerald border-spa-emerald text-spa-bg' : 'border-spa-muted'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Date, Time & Therapist */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-2">
                    Select Reservation Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-2">
                    Therapist Preference:
                  </label>
                  <select
                    value={therapistPref}
                    onChange={(e) => setTherapistPref(e.target.value)}
                    className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                  >
                    <option>Any Master Therapist</option>
                    <option>Female Senior Master Specialist</option>
                    <option>Male Senior Master Specialist</option>
                    <option>Grand Master Practitioner VIP (+ $50)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-spa-gold font-semibold block mb-3">
                  Available Time Slots:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'].map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedTime === slot
                          ? 'bg-spa-gold text-spa-bg font-bold border-spa-gold shadow-gold-glow'
                          : 'bg-spa-card border-spa-cardBorder hover:border-spa-gold/50 text-spa-pearl'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-spa-muted block mb-1">Full Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Eleanor Vance"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-spa-muted block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="eleanor@luxury-vip.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Contact Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-spa-muted block mb-1">Special Preferences / Health Notes</label>
                <textarea
                  rows="3"
                  placeholder="Mention allergies, room temperature preferences, or anniversary celebrations..."
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  className="w-full bg-spa-card border border-spa-cardBorder focus:border-spa-gold rounded-xl px-4 py-3 text-sm text-spa-pearl outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-spa-gold/10 border border-spa-gold/30 text-xs text-spa-gold flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 flex-shrink-0 text-spa-gold" />
                <span>No advance payment required today. Pay upon arrival at the Sanctuary Concierge Desk. Free cancellation up to 4 hours prior.</span>
              </div>
            </form>
          )}

          {/* STEP 4: Digital Sanctuary QR Pass & Receipt */}
          {step === 4 && (
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-gradient text-spa-bg mx-auto flex items-center justify-center shadow-emerald-glow">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <span className="font-brand text-xs uppercase tracking-widest text-spa-gold">VIP Digital Pass Generated</span>
                <h3 className="text-3xl font-serif font-bold text-spa-pearl mt-1">
                  We Await Your Arrival, {guestName || 'Valued Guest'}
                </h3>
                <p className="text-xs text-spa-muted mt-2">
                  A confirmation pass has been created. Pass code: <span className="text-spa-gold font-semibold">{confirmationCode}</span>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="glass-card-gold rounded-2xl p-6 max-w-md mx-auto text-left space-y-4 border border-spa-gold/40">
                <div className="flex justify-between items-center pb-4 border-b border-spa-gold/20">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-spa-muted">Pass Code</span>
                    <p className="font-brand font-bold text-lg text-spa-gold">{confirmationCode}</p>
                  </div>
                  {/* Simulated QR Code SVG */}
                  <div className="w-14 h-14 bg-spa-pearl p-1 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-4 gap-0.5 w-full h-full">
                      {[1,0,1,1,0,1,0,1,1,1,0,0,0,1,1,1].map((bit, i) => (
                        <div key={i} className={bit ? 'bg-black' : 'bg-white'} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-spa-muted block text-[10px] uppercase">Ritual</span>
                    <span className="text-spa-pearl font-medium">{selectedService.name}</span>
                  </div>
                  <div>
                    <span className="text-spa-muted block text-[10px] uppercase">Date & Time</span>
                    <span className="text-spa-pearl font-medium">{selectedDate} @ {selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-spa-muted block text-[10px] uppercase">Therapist</span>
                    <span className="text-spa-pearl font-medium">{therapistPref}</span>
                  </div>
                  <div>
                    <span className="text-spa-muted block text-[10px] uppercase">Amount Due at Spa</span>
                    <span className="text-spa-gold font-bold text-sm">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSendVoucher({
                      code: confirmationCode,
                      title: selectedService.name,
                      amount: calculateTotal(),
                      guestName
                    });
                  }}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase shadow-gold-glow hover:scale-105 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Send Pass to Customer / VIP</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenMyReservations();
                  }}
                  className="flex items-center space-x-2 px-5 py-3 rounded-full bg-spa-card border border-spa-gold/40 text-spa-gold hover:bg-spa-cardBorder font-semibold text-xs uppercase"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Manage / Edit Passes</span>
                </button>

                <button
                  onClick={downloadCalendarFile}
                  className="flex items-center space-x-2 px-5 py-3 rounded-full bg-spa-softBg text-spa-pearl font-medium text-xs uppercase border border-spa-cardBorder"
                >
                  <Download className="w-4 h-4" />
                  <span>Save .ICS</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        {step < 4 && (
          <div className="p-6 border-t border-spa-gold/20 flex items-center justify-between bg-spa-card/80">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs text-spa-muted hover:text-spa-pearl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              onClick={() => {
                if (step === 3) {
                  handleCompleteBooking();
                } else {
                  setStep(step + 1);
                }
              }}
              className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-all"
            >
              <span>{step === 3 ? 'Confirm Sanctuary Pass' : 'Continue Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
