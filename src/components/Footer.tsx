import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Send, Check, ChevronDown } from 'lucide-react';
import '../styles/footer.css';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, addToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mobileQuickLinksOpen, setMobileQuickLinksOpen] = useState(false);
  const [mobileConciergeOpen, setMobileConciergeOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'info');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to M. Siva-Tex', 'Thank you for subscribing to our private salon updates.', 'gold');
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const navigateTo = (view: any, cat?: string) => {
    if (cat) {
      setSelectedCategoryFilter(cat);
    } else {
      setSelectedCategoryFilter(null);
    }
    setCurrentView(view);
  };

  return (
    <footer className="footer-wrapper">
      
      {/* Top Heritage Seal Bar */}
      <div className="footer-seal-bar">
        <div className="footer-seal-container">
          <div className="footer-seal-left">
            <div className="footer-seal-icon-box">
              <Sparkles className="footer-seal-icon" />
            </div>
            <div>
              <p className="footer-seal-title">
                Silk Mark India Authorized Handloom Weavers
              </p>
              <p className="footer-seal-subtitle">
                Preserving authentic three-shuttle Korvai & Kadwa pit loom traditions since 1974.
              </p>
            </div>
          </div>

          <div className="footer-seal-locations">
            Kanchipuram • Varanasi • Chennai • Worldwide
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="footer-main-container">
        <div className="footer-grid">
          
          {/* Brand Section (Col 1-4) */}
          <div className="footer-brand-col">
            <button
              onClick={() => navigateTo('home')}
              className="footer-brand-logo-btn"
              aria-label="M. SIVA-TEX Home"
            >
              <img
                src="/assets/logo-gold-transparent.png"
                alt="M. SIVA-TEX"
                className="footer-brand-logo-img"
              />
            </button>

            <p className="footer-brand-desc">
              Dedicated exclusively to the art of the saree. Weaving pure mulberry silk with real gold zari for discerning connoisseurs, modern brides, and timeless celebrations.
            </p>

            <div className="footer-social-wrap">
              <p className="footer-social-title">Connect With Our Salons</p>
              <div className="footer-social-links">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="footer-social-icon" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="footer-social-icon" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-link-btn"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="footer-social-icon" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="footer-links-col">
            <button
              type="button"
              onClick={() => setMobileQuickLinksOpen(!mobileQuickLinksOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 md:pb-0 border-b md:border-b-0 border-[#D4AF37]/20"
            >
              <h4 className="footer-links-title mb-0">
                Quick Links
              </h4>
              <ChevronDown className={`w-4 h-4 text-[#ECBA51] transition-transform md:hidden ${mobileQuickLinksOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`footer-links-list ${mobileQuickLinksOpen ? 'block' : 'hidden md:block'} mt-2.5 md:mt-0`}>
              <li>
                <button onClick={() => navigateTo('home')} className="footer-link-btn">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="footer-link-btn">
                  Shop Sarees
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Bridal Silk')} className="footer-link-btn">
                  Bridal Trousseau
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', 'Kanchipuram Silk')} className="footer-link-btn">
                  Kanchipuram Silks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('heritage')} className="footer-link-btn">
                  Our Heritage & Looms
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="footer-link-btn">
                  Contact & Boutiques
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support (Col 7-8) */}
          <div className="footer-links-col">
            <button
              type="button"
              onClick={() => setMobileConciergeOpen(!mobileConciergeOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none pb-2 md:pb-0 border-b md:border-b-0 border-[#D4AF37]/20"
            >
              <h4 className="footer-links-title mb-0">
                Client Concierge
              </h4>
              <ChevronDown className={`w-4 h-4 text-[#ECBA51] transition-transform md:hidden ${mobileConciergeOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`footer-links-list ${mobileConciergeOpen ? 'block' : 'hidden md:block'} mt-2.5 md:mt-0`}>
              <li>
                <button onClick={() => navigateTo('contact')} className="footer-link-btn">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="footer-link-btn">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('heritage')} className="footer-link-btn">
                  Saree Draping & Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="footer-link-btn">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="footer-link-btn">
                  FAQs & Silk Mark Info
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="footer-link-btn">
                  Book Video Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter (Col 9-12) */}
          <div className="footer-newsletter-col">
            <h4 className="footer-newsletter-title">
              Be Part of Our Story
            </h4>
            <p className="footer-newsletter-desc">
              Subscribe to receive private previews of new loom releases, royal bridal launches, and master artisan stories.
            </p>

            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <div className="footer-newsletter-input-wrap">
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="footer-newsletter-input text-base sm:text-xs"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="footer-newsletter-submit-btn min-w-[44px] min-h-[44px]"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>

            <div className="footer-payments-wrap">
              <p className="footer-payments-title">Accepted Payment Modes</p>
              <div className="footer-payments-badges">
                <span className="footer-payment-badge">UPI (GPay / PhonePe)</span>
                <span className="footer-payment-badge">Visa / Mastercard</span>
                <span className="footer-payment-badge">RuPay</span>
                <span className="footer-payment-badge">NetBanking</span>
                <span className="footer-payment-badge">Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="footer-copyright-bar">
          <p className="footer-copyright-text">
            &copy; {new Date().getFullYear()} M. SIVA-TEX HANDLOOM PRIVATE LIMITED. All rights reserved. Handcrafted with reverence in India.
          </p>
          <div className="footer-legal-links">
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Privacy Policy
            </button>
            <span className="footer-legal-sep">•</span>
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Terms of Service
            </button>
            <span className="footer-legal-sep">•</span>
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Authenticity Guarantee
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
