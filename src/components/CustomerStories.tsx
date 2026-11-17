import React from 'react';
import { CUSTOMER_REVIEWS } from '../data/sarees';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomerStories: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-gold font-medium text-xs tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cherished Memories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Draped by You
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto my-3" />
          <p className="text-sm text-brown-deep/75 font-light leading-relaxed">
            From sacred temple weddings in Mylapore to royal receptions across the globe, hear from patrons who wear M. Siva-Tex silks with pride.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CUSTOMER_REVIEWS.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-beige/30 p-6 rounded-sm border border-gold/20 flex flex-col justify-between shadow-xs hover:border-gold/50 transition-all duration-300"
            >
              <div>
                <Quote className="w-8 h-8 text-gold/30 mb-3" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-gold" />
                  ))}
                </div>

                <h4 className="font-serif text-sm font-bold text-burgundy mb-2">
                  "{rev.title}"
                </h4>
                
                <p className="text-xs text-brown-deep/80 leading-relaxed font-light mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs font-semibold text-burgundy">
                    {rev.author}
                  </span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-brown-deep/60 mt-1">
                  <span>{rev.location}</span>
                  <span>{rev.date}</span>
                </div>
                <div className="mt-2 text-[10px] text-gold font-serif italic truncate">
                  Draped: {rev.sareeDraped}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

