import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating Silk Petals & Golden Bokeh Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angularSpeed: number;
      opacity: number;
      color: string;
      aspect: number;
    }

    const petals: Petal[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: Math.random() * 0.5 - 0.25,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.25,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(217, 140, 130, 0.45)', // gold or soft rose petal
      aspect: Math.random() * 0.4 + 0.6
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.6 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * p.aspect, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* 1. Ambient Background Layer */}
      <div className="cinematic-hero-bg-ambience" />

      {/* 2. Lighting Overlays & Vignettes */}
      <div className="cinematic-hero-gradient-overlay" />
      <div className="cinematic-hero-vignette-top" />
      <div className="cinematic-hero-vignette-bottom" />

      {/* 3. Canvas Floating Silk Petals & Golden Bokeh */}
      <canvas ref={canvasRef} className="cinematic-hero-canvas-petals" />
    </>
  );
};
