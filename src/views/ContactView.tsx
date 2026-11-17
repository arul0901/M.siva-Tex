import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Phone, Mail, Clock, Send, Sparkles, Video, CheckCircle2 } from 'lucide-react';
import '../styles/contact.css';

export const ContactView: React.FC = () => {
  const { addToast, setIsConciergeOpen } = useShop();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bridal Saree Inquiry',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addToast('Message Dispatched', 'Our boutique concierge will respond via email & WhatsApp within 2 hours.', 'gold');
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Bridal Saree Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Concierge & Salons</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-burgundy font-normal tracking-wide">
            Connect with M. Siva-Tex
          </h1>
          <div className="w-12 h-0.5 bg-gold mx-auto my-3" />
          <p className="text-xs sm:text-sm text-brown-deep/80 font-light leading-relaxed">
            Whether selecting your wedding trousseau or seeking heirloom preservation guidance, our master curators are at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Boutique Salons (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Kanchipuram Flagship Salon */}
            <div className="bg-white p-6 rounded-sm border border-gold/30 shadow-xs">
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold block mb-1">
                Loom Heritage Flagship
              </span>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Kanchipuram Master Weavers Salon
              </h3>
              <p className="text-xs text-brown-deep/75 leading-relaxed font-light mb-3">
                No. 48/B, Gandhi Road, Near Ekambareswarar Temple Outer Gate,<br />
                Kanchipuram, Tamil Nadu — 631501
              </p>
              <div className="space-y-1.5 text-xs text-brown-deep/80 pt-2 border-t border-gold/15">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>+91 44 2722 8910 / +91 98401 22839</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>Open 7 Days • 9:30 AM to 8:30 PM IST</span>
                </p>
              </div>
            </div>

            {/* Chennai Boutique */}
            <div className="bg-white p-6 rounded-sm border border-gold/30 shadow-xs">
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold block mb-1">
                Bridal Studio
              </span>
              <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
                Chennai T. Nagar Bridal Studio
              </h3>
              <p className="text-xs text-brown-deep/75 leading-relaxed font-light mb-3">
                Old No. 14, G.N. Chetty Road, T. Nagar,<br />
                Chennai, Tamil Nadu — 600017
              </p>
              <div className="space-y-1.5 text-xs text-brown-deep/80 pt-2 border-t border-gold/15">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>+91 44 4855 7720</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>concierge@msivatex.com</span>
                </p>
              </div>
            </div>

            {/* Video Consultation Box */}
            <div className="bg-burgundy text-ivory p-6 rounded-sm border border-gold/40 shadow-luxury space-y-3">
              <div className="flex items-center gap-2 text-gold">
                <Video className="w-5 h-5" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider">
                  Cannot Visit In Person?
                </h4>
              </div>
              <p className="text-xs text-beige-light/85 font-light leading-relaxed">
                Connect via private WhatsApp video appointment with a senior draper who will show you the real fall, weight, and luster in natural sunlight.
              </p>
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="w-full py-2.5 bg-gold hover:bg-gold-light text-brown-dark font-serif text-xs uppercase tracking-wider font-bold rounded-sm transition-colors"
              >
                Book Video Consultation
              </button>
            </div>

          </div>

          {/* Right: Message Form (Col 6-12) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-sm border border-gold/30 shadow-sm">
            <h3 className="font-serif text-xl font-bold text-burgundy mb-2">
              Send a Concierge Inquiry
            </h3>
            <p className="text-xs text-brown-deep/70 font-light mb-6">
              Have specific questions about wedding date orders, custom blouse embroidery, or corporate gifts? Write to us below.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-burgundy">Inquiry Received</h4>
                <p className="text-xs text-brown-deep/70 max-w-xs mx-auto">
                  A personal saree consultant has been notified and will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-serif text-[10px] text-burgundy mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Smt. / Ms. Name"
                      className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-serif text-[10px] text-burgundy mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 00000"
                      className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase font-serif text-[10px] text-burgundy mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block uppercase font-serif text-[10px] text-burgundy mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                    >
                      <option>Bridal Saree Inquiry</option>
                      <option>Pure Zari Authenticity & Certification</option>
                      <option>Custom Korvai Weaving Order</option>
                      <option>Order Tracking & Delivery</option>
                      <option>Boutique Appointment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase font-serif text-[10px] text-burgundy mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your wedding date, preferred saree styles, color preferences, or any questions..."
                    className="w-full px-3 py-2 bg-ivory border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

