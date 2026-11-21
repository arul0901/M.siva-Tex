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

const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
        {/* Desktop View (Standard Grid) */}
        <div className="footer-grid footer-grid-desktop hidden md:grid">
          
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
            <h4 className="footer-links-title mb-0">
              Quick Links
            </h4>
            <ul className="footer-links-list mt-2.5 md:mt-0">
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
            <h4 className="footer-links-title mb-0">
              Client Concierge
            </h4>
            <ul className="footer-links-list mt-2.5 md:mt-0">
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
          </div>

        </div>

        {/* Mobile View: Same Desktop Features in Clean 2-Column Screenshot Layout */}
        <div className="footer-mobile-view block md:hidden">
          
          {/* Top Brand Logo & Description */}
          <div className="footer-mobile-brand">
            <button
              onClick={() => navigateTo('home')}
              className="footer-brand-logo-btn"
              aria-label="M. SIVA-TEX Home"
            >
              <img
                src="/assets/logo-gold-transparent.png"
                alt="M. SIVA-TEX"
                className="footer-mobile-logo-img"
              />
            </button>
            <p className="footer-brand-desc mt-2">
              Dedicated exclusively to the art of the saree. Weaving pure mulberry silk with real gold zari for discerning connoisseurs.
            </p>
          </div>

          {/* 2-Column Grid for Links (Exact Screenshot Layout) */}
          <div className="footer-mobile-grid">
            
            {/* Box 1: QUICK LINKS (Same features from Desktop) */}
            <div className="footer-mobile-col">
              <h4 className="footer-mobile-heading">QUICK LINKS</h4>
              <ul className="footer-mobile-list">
                <li><button onClick={() => navigateTo('home')} className="footer-mobile-link">Home</button></li>
                <li><button onClick={() => navigateTo('shop')} className="footer-mobile-link">Shop Sarees</button></li>
                <li><button onClick={() => navigateTo('shop', 'Bridal Silk')} className="footer-mobile-link">Bridal Trousseau</button></li>
                <li><button onClick={() => navigateTo('shop', 'Kanchipuram Silk')} className="footer-mobile-link">Kanchipuram Silks</button></li>
                <li><button onClick={() => navigateTo('heritage')} className="footer-mobile-link">Our Heritage & Looms</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Contact & Boutiques</button></li>
              </ul>
            </div>

            {/* Box 2: CLIENT CONCIERGE (Same features from Desktop) */}
            <div className="footer-mobile-col">
              <h4 className="footer-mobile-heading">CLIENT CONCIERGE</h4>
              <ul className="footer-mobile-list">
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Shipping Policy</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Returns & Exchanges</button></li>
                <li><button onClick={() => navigateTo('heritage')} className="footer-mobile-link">Saree Draping & Care</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">FAQs & Silk Mark Info</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Book Video Appointment</button></li>
              </ul>
            </div>

            {/* Box 3: CONNECT & SOCIALS (Screenshot icon box style) */}
            <div className="footer-mobile-col">
              <h4 className="footer-mobile-heading">CONNECT WITH US</h4>
              <div className="footer-mobile-socials">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-mobile-social-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-mobile-social-btn"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-mobile-social-btn"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
              <a href="mailto:care@msivatex.com" className="footer-mobile-email">
                <Send className="w-3.5 h-3.5 rotate-[-45deg] shrink-0" />
                <span>care@msivatex.com</span>
              </a>
            </div>

            {/* Box 4: LEGAL & POLICIES */}
            <div className="footer-mobile-col">
              <h4 className="footer-mobile-heading">LEGAL & TRUST</h4>
              <ul className="footer-mobile-list">
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Privacy Policy</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Terms of Service</button></li>
                <li><button onClick={() => navigateTo('contact')} className="footer-mobile-link">Authenticity Guarantee</button></li>
              </ul>
            </div>

          </div>

          {/* Newsletter Box (Same Desktop feature preserved) */}
          <div className="footer-mobile-newsletter mt-6 pt-5 border-t border-white/10">
            <h4 className="footer-mobile-heading mb-1">BE PART OF OUR STORY</h4>
            <p className="text-xs text-[#FDFBF7]/70 font-light mb-3">
              Subscribe for private previews of new loom releases & royal bridal launches.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <div className="footer-newsletter-input-wrap">
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="footer-newsletter-input text-xs"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="footer-newsletter-submit-btn min-w-[40px] min-h-[40px]"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </form>
          </div>

          {/* Watermark Brand Outline */}
          <div className="footer-mobile-watermark">
            M. SIVA-TEX
          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="footer-copyright-bar">
          <p className="footer-copyright-text">
            M. SIVA-TEX &bull; &copy; {new Date().getFullYear()}. ALL RIGHTS RESERVED
          </p>
          <div className="footer-legal-links hidden md:flex">
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Privacy Policy
            </button>
            <span className="footer-legal-sep">&bull;</span>
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Terms of Service
            </button>
            <span className="footer-legal-sep">&bull;</span>
            <button onClick={() => navigateTo('contact')} className="footer-legal-btn">
              Authenticity Guarantee
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
