import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const SareeAuraLogo: React.FC<LogoProps> = ({ variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';
  
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={isLight ? "/assets/logo-gold.png" : "/assets/logo-burgundy.png"}
        alt="M. SIVA-TEX"
        className="h-10 sm:h-12 w-auto max-w-[220px] object-contain drop-shadow-sm"
      />
    </div>
  );
};


