import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, Info, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-ivory border border-gold/40 shadow-luxury rounded-sm p-4 flex items-start gap-3 text-brown-deep relative overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gold" />
            <div className="mt-0.5 text-gold shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-wine" />}
              {toast.type === 'gold' && <Sparkles className="w-5 h-5 text-gold" />}
            </div>
            <div className="flex-1 pr-4">
              <h4 className="font-serif font-semibold text-burgundy text-sm">{toast.title}</h4>
              <p className="text-xs text-brown-deep/80 mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-brown-deep/50 hover:text-burgundy p-1 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

