import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroZenScene from './components/3d/HeroZenScene';
import BodyMap3D, { BODY_NODES } from './components/3d/BodyMap3D';
import RoomExplorer3D, { SPA_SUITES } from './components/3d/RoomExplorer3D';
import ElixirShowcase3D, { ELIXIR_PRODUCTS } from './components/3d/ElixirShowcase3D';
import ServicesMenu, { SPA_SERVICES } from './components/ServicesMenu';
import Gallery3D from './components/Gallery3D';
import ConsultationQuiz from './components/ConsultationQuiz';
import Memberships from './components/Memberships';
import GiftCardDesigner from './components/GiftCardDesigner';
import Testimonials from './components/Testimonials';
import SoundscapePlayer from './components/SoundscapePlayer';
import ConciergeChat from './components/ConciergeChat';
import BookingModal from './components/BookingModal';
import MyReservationsModal from './components/MyReservationsModal';
import SendVoucherModal from './components/SendVoucherModal';
import Footer from './components/Footer';

import { Sparkles, Calendar, ArrowRight, ShieldCheck, Heart, Droplets, Volume2, Award, Gift, Eye } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingService, setSelectedBookingService] = useState(SPA_SERVICES[0]);
  
  // Audio soundscape states
  const [isSoundOpen, setIsSoundOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Active 3D canvas states
  const [activeBodyNode, setActiveBodyNode] = useState(BODY_NODES[0]);
  const [activeSuiteId, setActiveSuiteId] = useState('hydro');
  const [activeElixirId, setActiveElixirId] = useState('gold-jasmine');

  // Reservations State Management
  const [reservations, setReservations] = useState([
    {
      code: 'AZ-748921',
      serviceName: 'Aura Zenith Imperial 4-Hand Ritual',
      date: '2026-09-22',
      time: '14:30 PM',
      therapist: 'Female Senior Master Specialist',
      guestName: 'Lady Eleanor Vance',
      guestEmail: 'eleanor@luxury-vip.com',
      price: '$450',
      status: 'Confirmed'
    }
  ]);
  const [isMyReservationsOpen, setIsMyReservationsOpen] = useState(false);

  // Send Voucher Modal State
  const [isSendVoucherOpen, setIsSendVoucherOpen] = useState(false);
  const [currentVoucherData, setCurrentVoucherData] = useState(null);

  const openBookingForService = (service) => {
    setSelectedBookingService(service || SPA_SERVICES[0]);
    setIsBookingOpen(true);
  };

  const handleAddReservation = (newRes) => {
    setReservations((prev) => [newRes, ...prev]);
  };

  const handleEditReservation = (resCode, updatedFields) => {
    setReservations((prev) =>
      prev.map((r) => (r.code === resCode ? { ...r, ...updatedFields } : r))
    );
  };

  const handleCancelReservation = (resCode) => {
    setReservations((prev) => prev.filter((r) => r.code !== resCode));
  };

  const handleOpenSendVoucher = (voucher) => {
    setCurrentVoucherData(voucher);
    setIsSendVoucherOpen(true);
  };

  return (
    <div className="min-h-screen bg-spa-bg text-spa-pearl selection:bg-spa-gold selection:text-spa-bg">
      
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={() => openBookingForService(SPA_SERVICES[0])}
        onOpenSound={() => setIsSoundOpen(!isSoundOpen)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
        reservationCount={reservations.length}
      />

      {/* HERO SECTION WITH 3D CANVAS & HIGH-RES BACKGROUND */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        
        {/* High-Res Hero Sanctuary Render Texture Overlay */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img src="/images/hero_sanctuary.png" alt="Hero background" className="w-full h-full object-cover filter blur-sm" />
        </div>

        {/* Ambient Gold Radial Glow Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-glow pointer-events-none opacity-85 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-spa-gold/30 bg-spa-card/80 backdrop-blur shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5 text-spa-gold animate-pulse" />
              <span className="font-brand text-[11px] uppercase tracking-widest text-spa-gold font-bold">
                The World's Premier 3D Spa Sanctuary
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-spa-pearl font-normal leading-[1.15]">
              Sanctuary of <br />
              <span className="text-gold-gradient italic font-normal">Pure Zen & Vitality</span>
            </h1>

            <p className="text-sm sm:text-base text-spa-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Immerse your senses in custom hydrotherapeutics, 24K gold leaf botanical facials, binaural sound baths, and bespoke holistic treatments tailored to your body's precise energy points.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openBookingForService(SPA_SERVICES[0])}
                className="flex items-center space-x-3 px-8 py-4 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-widest shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Sanctuary Pass</span>
              </button>

              <button
                onClick={() => setIsMyReservationsOpen(true)}
                className="flex items-center space-x-2 px-6 py-4 rounded-full glass-card hover:border-spa-gold/50 text-spa-pearl font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <Eye className="w-4 h-4 text-spa-gold" />
                <span>Manage My Passes ({reservations.length})</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-spa-gold/15 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-spa-muted">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-spa-gold" />
                <span>100% Organic Botanical Extracts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-spa-emerald" />
                <span>5-Star Global Spa Excellence Award</span>
              </div>
            </div>
          </div>

          {/* Right Interactive 3D Canvas Column */}
          <div className="lg:col-span-6 h-[480px] sm:h-[560px] relative rounded-3xl overflow-hidden glass-card border border-spa-gold/30 shadow-2xl animate-shimmer-border">
            <HeroZenScene />
            <div className="absolute top-4 right-4 bg-spa-bg/80 backdrop-blur border border-spa-gold/30 px-3 py-1.5 rounded-full text-[10px] text-spa-gold uppercase tracking-wider flex items-center space-x-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-spa-gold animate-ping" />
              <span>Interactive 3D Zen Model</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-spa-bg/75 backdrop-blur border border-spa-gold/20 p-3 rounded-2xl text-center pointer-events-none">
              <p className="text-[11px] text-spa-pearl/90">
                ✨ Move cursor or drag canvas to rotate 3D Zen Balance Stones & Water Lotus
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATS BANNER */}
      <section className="py-10 bg-spa-softBg/40 border-y border-spa-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: '99.8%', label: 'Guest Serenity Rating' },
            { value: '14+', label: 'Master International Therapists' },
            { value: '432Hz', label: 'Acoustic Sound Bath Tuning' },
            { value: '12,000+', label: 'Sovereign Members Served' },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-spa-gold">{stat.value}</p>
              <p className="text-xs uppercase tracking-wider text-spa-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE 3D BODY FOCUS MAP */}
      <section id="bodymap" className="py-24 relative bg-spa-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Visual Body Ergonomics</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl mt-2">
              3D Interactive <span className="text-gold-gradient italic">Tension Focus Selector</span>
            </h2>
            <p className="text-xs sm:text-sm text-spa-muted mt-3">
              Click any highlighted body node point on the 3D silhouette model to view its targeted therapeutic solution.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3D Body Map Canvas */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-4 border border-spa-gold/25 shadow-2xl relative">
              <BodyMap3D
                activeNode={activeBodyNode}
                onSelectNode={(node) => setActiveBodyNode(node)}
              />
              <div className="absolute top-4 left-4 bg-spa-bg/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-spa-gold uppercase border border-spa-gold/20">
                Interactive 3D Body Node Hotspots
              </div>
            </div>

            {/* Recommended Treatment Card for Selected Body Node */}
            <div className="lg:col-span-5 glass-card-gold rounded-3xl p-8 border border-spa-gold/40 shadow-2xl space-y-6">
              <div className="flex items-center space-x-2 text-spa-gold text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Selected Focus Area</span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-spa-pearl">
                  {activeBodyNode.label}
                </h3>
                <span className="text-xs text-spa-emerald font-semibold block mt-1">
                  Target Remedy: {activeBodyNode.treatment}
                </span>
              </div>

              <p className="text-xs text-spa-muted leading-relaxed">
                {activeBodyNode.description}
              </p>

              <div className="pt-4 border-t border-spa-gold/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-spa-muted block uppercase">Session Duration</span>
                  <span className="text-sm font-semibold text-spa-pearl">{activeBodyNode.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-spa-muted block uppercase">Investment</span>
                  <span className="text-xl font-serif font-bold text-spa-gold">{activeBodyNode.price}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const matchedService = SPA_SERVICES.find(s => s.name.includes(activeBodyNode.treatment.slice(0, 10))) || SPA_SERVICES[0];
                  openBookingForService(matchedService);
                }}
                className="w-full py-3.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <span>Reserve This Focus Remedy</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* TREATMENTS CATALOG */}
      <ServicesMenu onSelectService={(service) => openBookingForService(service)} />

      {/* INTERACTIVE 3D ROOM SANCTUARY EXPLORER */}
      <section id="suites" className="py-24 bg-spa-softBg/30 border-t border-spa-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Virtual Sanctuary Tour</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl mt-2">
              Explore Our <span className="text-gold-gradient italic">3D Spa Sanctuary Suites</span>
            </h2>
            <p className="text-xs sm:text-sm text-spa-muted mt-3">
              Switch between our world-class hydrotherapy thermal pools, Himalayan pink salt caves, and sound bath chambers.
            </p>

            {/* Suite Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {SPA_SUITES.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setActiveSuiteId(suite.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    activeSuiteId === suite.id
                      ? 'bg-spa-gold text-spa-bg font-bold shadow-gold-glow'
                      : 'glass-card text-spa-muted hover:text-spa-pearl'
                  }`}
                >
                  {suite.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Suite Viewer Canvas */}
            <div className="lg:col-span-7">
              <RoomExplorer3D activeSuiteId={activeSuiteId} />
            </div>

            {/* Suite Details Card */}
            {(() => {
              const currentSuite = SPA_SUITES.find(s => s.id === activeSuiteId) || SPA_SUITES[0];
              return (
                <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-spa-gold/30 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-spa-gold font-bold">Suite Details</span>
                    <h3 className="text-2xl font-serif font-bold text-spa-pearl mt-1">{currentSuite.name}</h3>
                    <p className="text-xs text-spa-gold/80 italic mt-1">{currentSuite.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-spa-card border border-spa-cardBorder">
                      <span className="text-spa-muted block text-[10px] uppercase">Climate</span>
                      <span className="text-spa-pearl font-semibold">{currentSuite.temp}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-spa-card border border-spa-cardBorder">
                      <span className="text-spa-muted block text-[10px] uppercase">Occupancy</span>
                      <span className="text-spa-pearl font-semibold">{currentSuite.capacity}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-spa-gold font-semibold block">Suite Amenities:</span>
                    {currentSuite.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-spa-pearl/90">
                        <Droplets className="w-3.5 h-3.5 text-spa-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openBookingForService(SPA_SERVICES[0])}
                    className="w-full py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
                  >
                    Reserve Private Suite Session
                  </button>
                </div>
              );
            })()}
          </div>

        </div>
      </section>

      {/* HIGH-RES 3D VISUAL GALLERY */}
      <section id="gallery">
        <Gallery3D onOpenBooking={() => openBookingForService(SPA_SERVICES[0])} />
      </section>

      {/* INTERACTIVE 3D ELIXIR & SPA PRODUCTS SHOWCASE */}
      <section id="elixirs" className="py-24 bg-spa-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">Apothecary & Oils</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-spa-pearl mt-2">
              3D Organic <span className="text-gold-gradient italic">Spa Elixir Boutique</span>
            </h2>
            <p className="text-xs sm:text-sm text-spa-muted mt-3">
              Explore 3D models of our hand-formulated organic botanical oils and serum elixirs infused with 24K gold and rare flower essences.
            </p>

            {/* Elixir Selection Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {ELIXIR_PRODUCTS.map((elixir) => (
                <button
                  key={elixir.id}
                  onClick={() => setActiveElixirId(elixir.id)}
                  className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                    activeElixirId === elixir.id
                      ? 'bg-spa-gold text-spa-bg font-bold shadow-gold-glow'
                      : 'glass-card text-spa-muted hover:text-spa-pearl'
                  }`}
                >
                  {elixir.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3D Elixir Bottle Canvas */}
            <div className="lg:col-span-6 glass-card rounded-3xl p-6 border border-spa-gold/30 shadow-2xl relative">
              <ElixirShowcase3D selectedElixirId={activeElixirId} />
              <div className="absolute top-4 right-4 bg-spa-bg/80 backdrop-blur px-3 py-1 rounded-full text-[10px] text-spa-gold border border-spa-gold/30 uppercase">
                Interactive 3D Glass Model
              </div>
            </div>

            {/* Elixir Product Details */}
            {(() => {
              const currentElixir = ELIXIR_PRODUCTS.find(e => e.id === activeElixirId) || ELIXIR_PRODUCTS[0];
              return (
                <div className="lg:col-span-6 glass-card rounded-3xl p-8 border border-spa-gold/30 space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-spa-gold font-bold">{currentElixir.volume}</span>
                    <h3 className="text-3xl font-serif font-bold text-spa-pearl mt-1">{currentElixir.name}</h3>
                    <span className="text-2xl font-serif font-bold text-spa-gold block mt-2">{currentElixir.price}</span>
                  </div>

                  <p className="text-xs text-spa-muted leading-relaxed">
                    {currentElixir.benefits}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-spa-gold/15">
                    <span className="text-xs uppercase tracking-wider text-spa-gold font-semibold block">Key Ingredients:</span>
                    {currentElixir.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-spa-pearl/90">
                        <Sparkles className="w-3.5 h-3.5 text-spa-gold flex-shrink-0" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => openBookingForService(SPA_SERVICES[0])}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
                  >
                    Add Elixir Upgrade to Next Visit
                  </button>
                </div>
              );
            })()}

          </div>

        </div>
      </section>

      {/* 24K GOLD GIFT CARD DESIGNER */}
      <GiftCardDesigner onOpenSendVoucher={handleOpenSendVoucher} />

      {/* AI CONSULTATION QUIZ */}
      <ConsultationQuiz onSelectRecommended={(service) => openBookingForService(service)} />

      {/* VIP MEMBERSHIPS */}
      <Memberships onOpenBooking={() => openBookingForService(SPA_SERVICES[0])} />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FOOTER */}
      <Footer onOpenBooking={() => openBookingForService(SPA_SERVICES[0])} />

      {/* FLOATING SOUNDSCAPE PLAYER */}
      <SoundscapePlayer
        isOpen={isSoundOpen}
        onClose={() => setIsSoundOpen(false)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* FLOATING AI CONCIERGE CHAT WIDGET */}
      <ConciergeChat onOpenBooking={() => openBookingForService(SPA_SERVICES[0])} />

      {/* 4-STEP LUXURY BOOKING MODAL */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedBookingService}
        onAddReservation={handleAddReservation}
        onOpenSendVoucher={handleOpenSendVoucher}
        onOpenMyReservations={() => setIsMyReservationsOpen(true)}
      />

      {/* MY RESERVATIONS & EDIT MODAL */}
      <MyReservationsModal
        isOpen={isMyReservationsOpen}
        onClose={() => setIsMyReservationsOpen(false)}
        reservations={reservations}
        onEditReservation={handleEditReservation}
        onCancelReservation={handleCancelReservation}
        onReserveAgain={(previousRes) => {
          setIsMyReservationsOpen(false);
          openBookingForService(SPA_SERVICES[0]);
        }}
        onSendVoucher={handleOpenSendVoucher}
      />

      {/* SEND VOUCHER / PASS MODAL */}
      <SendVoucherModal
        isOpen={isSendVoucherOpen}
        onClose={() => setIsSendVoucherOpen(false)}
        voucherData={currentVoucherData}
      />

    </div>
  );
}
