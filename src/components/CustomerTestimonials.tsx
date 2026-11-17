import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import '../styles/customer-testimonials.css';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  category: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'The richness of the silk and the beautiful zari detailing exceeded my expectations.',
    author: 'Ananya Krishnan',
    location: 'Chennai',
    category: 'Bridal Muhurtham Kanjivaram',
    rating: 5
  },
  {
    id: 't-2',
    quote: 'A beautiful addition to my wedding collection. The craftsmanship is exceptional.',
    author: 'Priyanka Sharma',
    location: 'Mumbai',
    category: 'Heritage 3-Ply Korvai',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'The colour, texture and finish were exactly what I was looking for.',
    author: 'Divya Reddy',
    location: 'Hyderabad',
    category: 'Banarasi Kadwa Zari',
    rating: 5
  },
  {
    id: 't-4',
    quote: 'A timeless saree that I will treasure for years to come. The video concierge made selection seamless.',
    author: 'Meera Sengupta',
    location: 'Kolkata',
    category: 'Whispering Soft Silk',
    rating: 5
  },
  {
    id: 't-5',
    quote: 'Authentic pure silk certified with Silk Mark India. Truly feels like wearing an heirloom.',
    author: 'Rukmini Venkatesh',
    location: 'Bangalore',
    category: 'Temple Border Silk',
    rating: 5
  }
];

export const CustomerTestimonials: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="testimonials-header">
          <div className="testimonials-eyebrow">
            <Sparkles className="testimonials-eyebrow-icon" />
            <span>TESTIMONIALS</span>
          </div>

          <h2 className="testimonials-heading">
            Loved By Our <span className="testimonials-heading-accent">community</span>
          </h2>

          <div className="testimonials-divider" />
        </div>

        {/* Carousel Container */}
        <div className="testimonials-carousel-wrapper">
          
          {/* Desktop Left/Right Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="testimonials-nav-arrow-left"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="testimonials-arrow-icon" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="testimonials-nav-arrow-right"
            aria-label="Next testimonial"
          >
            <ChevronRight className="testimonials-arrow-icon" />
          </button>

          {/* Testimonials Track */}
          <div ref={carouselRef} className="testimonials-track no-scrollbar">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div>
                  {/* 5 Small Gold Stars */}
                  <div className="testimonial-stars">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="testimonial-star-icon" />
                    ))}
                  </div>

                  {/* Review Quote */}
                  <p className="testimonial-quote">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="testimonial-author-box">
                  <h4 className="testimonial-author-name">
                    {t.author}
                  </h4>
                  <div className="testimonial-author-meta">
                    <span>{t.location}</span>
                    <span className="testimonial-author-category">{t.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
