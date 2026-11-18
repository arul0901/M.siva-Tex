import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Calendar, Clock, Video, CheckCircle2, Sparkles, User, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/modals.css';

export const ConciergeModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, addToast } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Bridal Muhurtham',
    preferredDate: '',
    preferredTime: '11:00 AM - 12:00 PM IST',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isConciergeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast(
      'Concierge Session Reserved',
      `Our Master Draper will contact you on WhatsApp at ${formData.phone || '+91'} for your live session.`,
      'gold'
    );
    setTimeout(() => {
      setSubmitted(false);
      setIsConciergeOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsConciergeOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-ivory border border-gold/40 shadow-2xl rounded-sm max-w-xl w-full p-5 sm:p-8 z-10 text-brown-deep max-h-[92vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsConciergeOpen(false)}
            className="absolute top-3 right-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-brown-deep/60 hover:text-burgundy transition-colors rounded-full hover:bg-beige"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-burgundy">
                Session Confirmed!
              </h3>
              <p className="text-xs text-brown-deep/80 max-w-sm mx-auto leading-relaxed">
                We have assigned a Senior Handloom Specialist to show you your shortlisted sarees under natural sunlight. A calendar invite has been sent to your email.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 text-gold text-xs font-serif uppercase tracking-[0.25em] mb-1">
                  <Video className="w-3.5 h-3.5" />
                  <span>Private Virtual Salon</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-burgundy">
                  Book a Video Saree Consultation
                </h3>
                <div className="w-10 h-0.5 bg-gold mx-auto my-2" />
                <p className="text-xs text-brown-deep/75 leading-relaxed font-light">
                  Inspect the weave, zari reflection, pleat fall, and blouse pairing live via WhatsApp or Google Meet with our Kanchipuram master drapers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Smt. / Ms. Name"
                        className="w-full pl-8 pr-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      WhatsApp Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full pl-8 pr-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="w-full pl-8 pr-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      Auspicious Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold min-h-[44px]"
                    >
                      <option value="Bridal Muhurtham">Bridal Muhurtham</option>
                      <option value="Wedding Reception">Wedding Reception</option>
                      <option value="Seemantham / Valai Kappu">Seemantham / Valai Kappu</option>
                      <option value="Festive Puja & Temple Visit">Festive Puja & Temple Visit</option>
                      <option value="Heirloom Trousseau Curation">Heirloom Trousseau Curation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                      Preferred Time Slot (IST)
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold min-h-[44px]"
                    >
                      <option>10:00 AM - 11:00 AM IST</option>
                      <option>11:30 AM - 12:30 PM IST</option>
                      <option>03:00 PM - 04:00 PM IST</option>
                      <option>05:00 PM - 06:00 PM IST</option>
                      <option>07:30 PM - 08:30 PM IST (NRI Slot)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] font-serif text-burgundy mb-1">
                    Specific Sarees or Colors You Wish to View
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Royal Purple Korvai Kanchipuram, Crimson bridal silks with heavy zari pallu..."
                    className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-3.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 mt-2 shadow-sm"
                >
                  Confirm Complimentary Session
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

