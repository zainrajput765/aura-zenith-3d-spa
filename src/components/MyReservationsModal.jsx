import React, { useState } from 'react';
import { X, Calendar, Clock, User, Edit3, Trash2, RotateCcw, Share2, Download, CheckCircle2, AlertCircle, PlusCircle, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MyReservationsModal({ isOpen, onClose, reservations, onEditReservation, onCancelReservation, onReserveAgain, onSendVoucher }) {
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editGuestName, setEditGuestName] = useState('');
  const [editTherapist, setEditTherapist] = useState('');
  const [successToast, setSuccessToast] = useState('');

  if (!isOpen) return null;

  const handleStartEdit = (res) => {
    setEditingId(res.code);
    setEditDate(res.date || '2026-09-22');
    setEditTime(res.time || '14:30 PM');
    setEditGuestName(res.guestName || '');
    setEditTherapist(res.therapist || 'Any Master Therapist');
  };

  const handleSaveEdit = (resCode) => {
    onEditReservation(resCode, {
      date: editDate,
      time: editTime,
      guestName: editGuestName,
      therapist: editTherapist
    });
    setEditingId(null);
    setSuccessToast(`Pass ${resCode} updated successfully!`);
    setTimeout(() => setSuccessToast(''), 4000);
    
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#10B981']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-spa-bg/90 backdrop-blur-xl animate-fadeIn">
      <div className="glass-card-gold rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative border border-spa-gold/40 text-spa-pearl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-spa-gold/20 flex items-center justify-between bg-spa-card/90">
          <div>
            <span className="font-brand text-[10px] uppercase tracking-widest text-spa-gold">Sanctuary Concierge Management</span>
            <h2 className="text-2xl font-serif font-bold text-spa-pearl">
              My Active Sanctuary Passes & Reservations
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-spa-muted hover:text-spa-gold hover:bg-spa-gold/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Toast Banner */}
        {successToast && (
          <div className="px-6 py-2.5 bg-spa-emerald/20 border-b border-spa-emerald text-spa-emerald text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast('')} className="text-spa-emerald hover:underline">Dismiss</button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {reservations.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-spa-card border border-spa-gold/30 flex items-center justify-center mx-auto text-spa-gold">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold text-spa-pearl">No Active Reservations Found</h3>
                <p className="text-xs text-spa-muted max-w-md mx-auto mt-1">
                  You do not currently have any active spa passes. Click below to reserve a new sanctuary experience.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onReserveAgain();
                }}
                className="px-6 py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
              >
                Reserve Sanctuary Ritual Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map((res) => {
                const isEditing = editingId === res.code;
                return (
                  <div
                    key={res.code}
                    className="glass-card rounded-2xl p-6 border border-spa-gold/30 hover:border-spa-gold/60 transition-all space-y-4 relative"
                  >
                    {/* Top Row: Code & Status */}
                    <div className="flex items-center justify-between pb-3 border-b border-spa-gold/15">
                      <div className="flex items-center space-x-3">
                        <span className="font-brand font-bold text-sm text-spa-gold">{res.code}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold bg-spa-emerald/15 text-spa-emerald border border-spa-emerald/30">
                          Confirmed & Active
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onSendVoucher(res)}
                          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-spa-softBg border border-spa-gold/30 text-spa-gold hover:bg-spa-gold hover:text-spa-bg text-xs font-semibold transition-all"
                          title="Send/Share Pass to VIP or Friend"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Send Pass</span>
                        </button>
                      </div>
                    </div>

                    {/* Details Row */}
                    {!isEditing ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] text-spa-muted block uppercase">Sanctuary Ritual</span>
                          <span className="text-spa-pearl font-semibold">{res.serviceName}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-spa-muted block uppercase">Date & Time Slot</span>
                          <span className="text-spa-pearl font-semibold">{res.date} @ {res.time}</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-spa-muted block uppercase">Guest & Therapist</span>
                          <span className="text-spa-pearl font-semibold block">{res.guestName}</span>
                          <span className="text-[10px] text-spa-gold">{res.therapist}</span>
                        </div>
                      </div>
                    ) : (
                      /* Expanded Edit Form */
                      <div className="p-4 rounded-xl bg-spa-card/90 border border-spa-gold/40 space-y-3 animate-fadeIn">
                        <span className="text-xs uppercase font-bold text-spa-gold block">Edit Pass Details:</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-[10px] text-spa-muted block mb-1">Reservation Date</label>
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="w-full bg-spa-softBg border border-spa-gold/50 rounded-lg px-3 py-1.5 text-xs text-spa-pearl outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-spa-muted block mb-1">Time Slot</label>
                            <select
                              value={editTime}
                              onChange={(e) => setEditTime(e.target.value)}
                              className="w-full bg-spa-softBg border border-spa-gold/50 rounded-lg px-3 py-1.5 text-xs text-spa-pearl outline-none"
                            >
                              <option>10:00 AM</option>
                              <option>11:30 AM</option>
                              <option>01:00 PM</option>
                              <option>02:30 PM</option>
                              <option>04:00 PM</option>
                              <option>05:30 PM</option>
                              <option>07:00 PM</option>
                              <option>08:30 PM</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] text-spa-muted block mb-1">Guest Full Name</label>
                            <input
                              type="text"
                              value={editGuestName}
                              onChange={(e) => setEditGuestName(e.target.value)}
                              className="w-full bg-spa-softBg border border-spa-gold/50 rounded-lg px-3 py-1.5 text-xs text-spa-pearl outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-spa-muted block mb-1">Therapist Preference</label>
                            <select
                              value={editTherapist}
                              onChange={(e) => setEditTherapist(e.target.value)}
                              className="w-full bg-spa-softBg border border-spa-gold/50 rounded-lg px-3 py-1.5 text-xs text-spa-pearl outline-none"
                            >
                              <option>Any Master Therapist</option>
                              <option>Female Senior Master Specialist</option>
                              <option>Male Senior Master Specialist</option>
                              <option>Grand Master Practitioner VIP (+ $50)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions Row */}
                    <div className="pt-3 border-t border-spa-gold/15 flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center space-x-3">
                        {!isEditing ? (
                          <button
                            onClick={() => handleStartEdit(res)}
                            className="flex items-center space-x-1.5 text-xs text-spa-gold hover:underline font-semibold"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Reschedule / Edit Pass</span>
                          </button>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveEdit(res.code)}
                              className="px-4 py-1.5 bg-spa-emerald text-spa-bg font-bold rounded-full text-xs shadow-emerald-glow"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 glass-card text-spa-muted hover:text-spa-pearl rounded-full text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to cancel reservation ${res.code}?`)) {
                              onCancelReservation(res.code);
                              setSuccessToast(`Pass ${res.code} cancelled.`);
                            }
                          }}
                          className="flex items-center space-x-1 text-xs text-red-400 hover:underline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Pass</span>
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onReserveAgain(res);
                        }}
                        className="flex items-center space-x-1.5 text-xs text-spa-emerald font-semibold hover:underline"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reserve Again (New Booking)</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-spa-gold/20 flex justify-between items-center bg-spa-card/90">
          <button
            onClick={() => {
              onClose();
              onReserveAgain();
            }}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Sanctuary Ritual</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full glass-card text-xs text-spa-muted hover:text-spa-pearl uppercase"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
