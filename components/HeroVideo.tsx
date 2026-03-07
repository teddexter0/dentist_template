'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  videoSrc?: string;
  fallbackGradient?: string;
  headline: string;
  subHeadline?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
  particleColor?: string;
}

export default function HeroVideo({
  videoSrc,
  fallbackGradient = 'linear-gradient(135deg, #1B4F72 0%, #2E86C1 100%)',
  headline,
  subHeadline,
  children,
  overlayOpacity = 0.55,
  particleColor = '#A8D5BA',
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoError, setVideoError] = useState(false);

  // GSAP entrance animation
  useEffect(() => {
    let gsapInstance: typeof import('gsap') | null = null;

    const initGSAP = async () => {
      if (typeof window === 'undefined') return;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = { gsap } as unknown as typeof import('gsap');

      const chars = headlineRef.current?.querySelectorAll('.hero-char');
      const tl = gsap.timeline({ delay: 0.2 });

      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { y: 60, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: 'back.out(1.7)',
          }
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
          '-=0.2'
        );
      }
    };

    initGSAP();
    return () => {
      // cleanup handled by gsap itself
    };
  }, []);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    };

    const particles: Particle[] = [];
    const MAX = 35;

    const spawn = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 1.2 + 0.4),
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.6 + 0.2,
      life: 0,
      maxLife: Math.random() * 180 + 120,
    });

    for (let i = 0; i < MAX / 2; i++) {
      const p = spawn();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      while (particles.length < MAX) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [particleColor]);

  const splitToChars = (text: string) =>
    text.split('').map((ch, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{ background: fallbackGradient }}
    >
      {/* Video background */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', perspective: '800px' }}
          aria-label={headline}
        >
          {splitToChars(headline)}
        </div>

        {subHeadline && (
          <p
            ref={subRef}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {subHeadline}
          </p>
        )}

        <div ref={ctaRef}>{children}</div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}
