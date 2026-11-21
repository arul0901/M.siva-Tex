import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import '../styles/trust-service.css';

export const TrustService: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Insured Shipping',
      description: 'Free express delivery on orders above ₹3,000.'
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Payments',
      description: 'UPI, Cards & NetBanking — fully encrypted.'
    },
    {
      icon: RefreshCw,
      title: '7-Day Easy Returns',
      description: 'Hassle-free returns on all eligible handlooms.'
    },
    {
      icon: Headphones,
      title: 'Saree Concierge',
      description: 'Personal styling & virtual shopping sessions.'
    }
  ];

  return (
    <section className="trust-section">
      <div className="trust-container">
        <div className="trust-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="trust-item">
                <div className="trust-icon-box">
                  <Icon className="trust-icon" strokeWidth={1.5} />
                </div>
                <div className="trust-item-body">
                  <h4 className="trust-item-title">
                    {feature.title}
                  </h4>
                  <p className="trust-item-desc">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
