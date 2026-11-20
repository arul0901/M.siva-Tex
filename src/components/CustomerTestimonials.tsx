import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, PanInfo } from 'framer-motion';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'M.Siva Tex has made it possible for me to find my dream Muhurtham Kanjivaram without travelling to Kanchipuram. The pure gold zari and pit-loom Korvai finish exceeded all my expectations.',
    author: 'Emily Johnson',
    role: 'Sales Manager',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    rating: 5
  },
  {
    id: 't-2',
    quote: "I've been using M.Siva Tex silks for three years now and it's made celebrating weddings and festivals so much more memorable and effortless.",
    author: 'Ethan Miller',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'M.Siva Tex stands out as the most authentic, user-friendly and effective solution for bridal handlooms and heirloom pure silk sarees.',
    author: 'Olivia Carter',
    role: 'Design Lead',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 5
  },
  {
    id: 't-4',
    quote: 'The colour palette, delicate Kadwa motifs, and pit-loom weave quality are truly exceptional. It was the centerpiece of our family celebration.',
    author: 'Sophia Chen',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    rating: 5
  },
  {
    id: 't-5',
    quote: 'From virtual video concierge to insured doorstep delivery, every single detail was handled with extraordinary care and utmost professionalism.',
    author: 'Amara Williams',
    role: 'Fashion Stylist',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=160&q=80',
    rating: 5
  }
];

export const CustomerTestimonials: React.FC = () => {
  // Start at index 1 so the middle card (Ethan Miller) is centered, matching the reference image
  const [currentIndex, setCurrentIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const cardWidth = isMobile ? Math.min(300, windowWidth - 60) : 420;
  const gap = isMobile ? 16 : 28;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < TESTIMONIALS.length - 1 ? prev + 1 : 0));
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-white border-b border-gray-100 relative overflow-hidden" 
      id="testimonials"
      aria-label="Testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-secondary font-bold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Testimonial
          </h2>
          <p className="font-secondary text-sm sm:text-base text-[#64748B] font-normal leading-relaxed mt-3 sm:mt-4 max-w-2xl mx-auto">
            We provide all the advantage that can simplify all your luxury saree and bridal shopping without any further issues
          </p>
        </div>

        {/* Carousel Showcase Track with Smooth Centering & Touch Drag */}
        <div className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing">
          <div className="flex justify-center items-center">
            <motion.div 
              className="flex items-stretch"
              style={{
                gap: `${gap}px`,
                width: 'max-content'
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: `calc(50% - ${cardWidth / 2}px - ${currentIndex * (cardWidth + gap)}px)`
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28
              }}
            >
              {TESTIMONIALS.map((t, index) => {
                const isActive = index === currentIndex;

                return (
                  <motion.div
                    key={t.id}
                    onClick={() => setCurrentIndex(index)}
                    animate={{
                      scale: isActive ? 1 : 0.98,
                      opacity: isActive ? 1 : 0.85
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: `${cardWidth}px` }}
                    className={`shrink-0 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#EEF2FF] border border-[#E0E7FF] shadow-sm'
                        : 'bg-[#F9FAFB] border border-[#F3F4F6] shadow-none hover:border-[#E5E7EB]'
                    }`}
                  >
                    {/* Testimonial Quote */}
                    <p className="font-secondary text-sm sm:text-[15px] text-[#334155] leading-relaxed font-normal mb-8">
                      {t.quote}
                    </p>

                    {/* Bottom Row: Avatar, Author, Role, and 5 Star Rating */}
                    <div className="flex items-center justify-between">
                      {/* Left: Avatar + Name + Role */}
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={t.avatar} 
                          alt={t.author}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div className="flex flex-col">
                          <h4 className="font-secondary font-semibold text-sm sm:text-base text-[#0F172A] leading-snug">
                            {t.author}
                          </h4>
                          <span className="font-secondary text-xs sm:text-[13px] text-[#6366F1] font-medium">
                            {t.role}
                          </span>
                        </div>
                      </div>

                      {/* Right: 5 Yellow Gold Stars */}
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" 
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Centered Navigation Buttons (Exact reference design) */}
        <div className="flex items-center justify-center gap-4 mt-10 sm:mt-12">
          {/* Left Arrow Button (White/Outline) */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-12 h-12 rounded-full border border-[#D1D5DB] bg-white text-[#1E293B] shadow-xs hover:bg-[#F8FAFC] hover:border-[#94A3B8] flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Right Arrow Button (Filled Accent) */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-12 h-12 rounded-full bg-[#4F46E5] text-white shadow-md hover:bg-[#4338CA] flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

      </div>
    </section>
  );
};
