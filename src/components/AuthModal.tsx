import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Sparkles, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, addToast, setCurrentView } = useShop();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      addToast('Missing Details', 'Please fill in both email and password.', 'info');
      return;
    }
    addToast('Welcome Back!', `Signed in successfully as ${loginEmail.split('@')[0]}.`, 'gold');
    setIsAuthModalOpen(false);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !signupEmail || !signupPassword) {
      addToast('Missing Details', 'Please complete all required fields.', 'info');
      return;
    }
    addToast('Account Created!', `Welcome to M. Siva-Tex, ${name}!`, 'gold');
    setIsAuthModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAuthModalOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-md bg-[#2A0004] text-[#FDFBF7] border border-[#D4AF37]/40 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Subtle Decorative Golden Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#ECBA51] to-[#D4AF37]" />

          {/* Close Button */}
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FDFBF7]/70 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="pt-7 pb-4 px-6 sm:px-8 text-center border-b border-[#D4AF37]/20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4D0007] border border-[#D4AF37]/35 text-[#ECBA51] text-[10px] tracking-widest uppercase font-semibold mb-2">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Patron Lounge</span>
            </div>
            <h3 className="font-primary text-2xl font-medium tracking-wide text-[#FDFBF7]">
              {tab === 'login' ? 'Sign In to Your Account' : 'Join Our Legacy'}
            </h3>
            <p className="text-xs text-[#FDFBF7]/70 font-light mt-1 max-w-xs mx-auto">
              {tab === 'login'
                ? 'Access your saved bridal orders, custom loom previews, and curated wishlist.'
                : 'Create an account for personalized styling sessions, express checkout, and VIP alerts.'}
            </p>

            {/* Toggle Tabs (Login vs Signup) */}
            <div className="flex border border-[#D4AF37]/30 rounded-lg p-1 bg-[#1A0002] mt-5">
              <button
                type="button"
                onClick={() => setTab('login')}
                className={`flex-1 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                  tab === 'login'
                    ? 'bg-[#4D0007] text-[#ECBA51] shadow-md border border-[#D4AF37]/40'
                    : 'text-[#FDFBF7]/60 hover:text-[#FDFBF7]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`flex-1 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-md transition-all ${
                  tab === 'signup'
                    ? 'bg-[#4D0007] text-[#ECBA51] shadow-md border border-[#D4AF37]/40'
                    : 'text-[#FDFBF7]/60 hover:text-[#FDFBF7]'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Modal Form Body */}
          <div className="p-6 sm:p-8 pt-5">
            {tab === 'login' ? (
              /* ── 1. LOGIN FORM ── */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => addToast('Password Reset', 'Password recovery instructions sent to your email.', 'info')}
                      className="text-[11px] text-[#ECBA51]/80 hover:text-[#ECBA51] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-10 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FDFBF7]/40 hover:text-[#FDFBF7]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-gradient-to-r from-[#D4AF37] to-[#ECBA51] text-[#2A0004] font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              /* ── 2. SIGNUP FORM ── */
              <form onSubmit={handleSignupSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Smt. Lakshmi Priya"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-3.5 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[#ECBA51] uppercase tracking-wider mb-1.5">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FDFBF7]/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full bg-[#1A0002] border border-[#D4AF37]/35 rounded-lg py-2.5 pl-10 pr-10 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/30 focus:outline-none focus:border-[#ECBA51] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#FDFBF7]/40 hover:text-[#FDFBF7]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-gradient-to-r from-[#D4AF37] to-[#ECBA51] text-[#2A0004] font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Quick Demo Help Text */}
            <p className="text-[10px] text-center text-[#FDFBF7]/40 mt-4">
              Protected by Silk Mark Security • 256-Bit SSL Encrypted
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
