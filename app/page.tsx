'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Menu, X } from 'lucide-react';
import { clinicConfig } from '@/config/clinic';
import HeroVideo from '@/components/HeroVideo';
import ParticleField from '@/components/ParticleField';

// GSAP scroll-triggered counter
function AnimatedCounter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || triggered.current) return;
      triggered.current = true;
      obs.disconnect();

      const initGSAP = async () => {
        const { gsap } = await import('gsap');
        const obj = { n: 0 };
        gsap.to(obj, {
          n: to,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            setVal(Math.round(obj.n));
          },
        });
      };
      initGSAP();
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// 3D tilt card on mouse move
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

// GSAP reveal on scroll
function RevealOnScroll({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      const initGSAP = async () => {
        const { gsap } = await import('gsap');
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: delay / 1000,
          ease: 'power3.out',
        });
      };
      initGSAP();
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % clinicConfig.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Seasonal particle color (matches SEASON_THEMES particleColor)
  const particleColors: Record<string, string> = {
    valentine:    '#FF6B9D',
    ramadan:      '#C9A84C',
    eid_fitr:     '#FFD700',
    easter:       '#C471ED',
    eid_adha:     '#C9A84C',
    summer:       '#FFB347',
    diwali:       '#FF8C00',
    halloween:    '#FF6B00',
    thanksgiving: '#D2691E',
    christmas:    '#FFD700',
    newyear:      '#FFD700',
    default:      '#A8D5BA',
  };
  const season = typeof document !== 'undefined'
    ? (document.documentElement.getAttribute('data-season') || 'default')
    : 'default';
  const pColor = particleColors[season] || '#A8D5BA';

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              {clinicConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-base">
            <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <a href={`tel:${clinicConfig.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">{clinicConfig.phone}</a>
            <Link
              href="/book"
              className="magnetic-btn px-5 py-2 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90 spring-hover"
              style={{ background: 'var(--color-primary)' }}
            >
              Book Appointment
            </Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <Link href="/services" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/about" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>About</Link>
            <Link
              href="/book"
              className="block py-2 text-center rounded-full text-white font-medium"
              style={{ background: 'var(--color-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </header>

      {/* HERO — cinematic diagonal overlay. Add imageSrc prop (or videoSrc) once client provides media. */}
      <HeroVideo
        videoSrc={clinicConfig.heroVideo}
        headline={clinicConfig.name}
        subHeadline={clinicConfig.tagline}
        overlayOpacity={0.5}
        particleColor={pColor}
        fallbackGradient="var(--hero-bg)"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="px-10 py-4 rounded-full text-white font-semibold text-lg spring-hover shadow-md"
            style={{ background: 'var(--color-primary)' }}
          >
            Book Appointment
          </Link>
          <a
            href={`https://wa.me/${clinicConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full font-semibold text-lg border-2 border-white text-white spring-hover backdrop-blur-sm bg-white/10"
          >
            WhatsApp Us
          </a>
        </div>
      </HeroVideo>

      {/* TRUST BAR — animated counters */}
      <section className="py-10 bg-white border-y border-gray-100 relative overflow-hidden">
        <ParticleField color={pColor} count={15} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { icon: '🏆', label: 'Years Experience', value: 10, suffix: '+' },
              { icon: '😊', label: 'Happy Patients', value: 2000, suffix: '+' },
              { icon: '⚡', label: 'Same-Day Rate', value: 95, suffix: '%' },
              { icon: '👨‍⚕️', label: 'Qualified Specialists', value: 4, suffix: '' },
            ].map((item) => (
              <RevealOnScroll key={item.label} delay={100}>
                <div className="flex flex-col items-center gap-1 text-gray-700 spring-hover cursor-default">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    <AnimatedCounter to={item.value} suffix={item.suffix} />
                  </span>
                  <span className="text-base text-gray-500">{item.label}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — 3D tilt cards */}
      <section id="services" className="py-20 px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              Our Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Comprehensive dental care for the whole family, all under one roof.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicConfig.services.map((service, i) => (
              <RevealOnScroll key={service.name} delay={i * 80}>
                <TiltCard className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md border border-gray-50 h-full cursor-default">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{service.name}</h3>
                  <p className="text-gray-500 text-base leading-relaxed mb-3">{service.description}</p>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>{service.price}</p>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="magnetic-btn inline-block px-8 py-3 rounded-full font-semibold border-2 spring-hover"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              How It Works
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Book Online', desc: 'Choose your service and preferred date in seconds.' },
              { step: '2', title: 'Visit Us', desc: 'Our team welcomes you at our comfortable clinic.' },
              { step: '3', title: 'Leave Smiling', desc: 'Walk out with a healthier, more confident smile.' },
            ].map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 120}>
                <div className="flex flex-col items-center spring-hover cursor-default">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{item.title}</h3>
                  <p className="text-gray-500 text-base">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              What Our Patients Say
            </h2>
          </RevealOnScroll>
          <div className="bg-white rounded-2xl p-8 shadow-sm relative min-h-48">
            {clinicConfig.testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${i === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
              >
                <div className="flex justify-center mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-xl italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-base" style={{ color: 'var(--color-primary)' }}>{t.name}</p>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-8">
              {clinicConfig.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className="h-2 rounded-full transition-all"
                  style={i === currentTestimonial
                    ? { background: 'var(--color-primary)', width: '2rem' }
                    : { background: '#D1D5DB', width: '0.5rem' }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* OUR LOCATIONS */}
      <section className="py-20 px-4 bg-white" id="locations">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              Our Locations
            </h2>
            <p className="text-gray-600">Two convenient branches — Eldoret &amp; Kitale</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 gap-6">
            {clinicConfig.branches.map((branch, i) => (
              <RevealOnScroll key={branch.name} delay={i * 120}>
                <TiltCard className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-primary)' }}>{branch.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>{branch.address}</p>
                    <p>
                      <a href={`tel:${branch.phone}`} className="hover:underline font-medium" style={{ color: 'var(--color-primary)' }}>
                        {branch.phone}
                      </a>
                    </p>
                    <div className="pt-2 border-t border-gray-100 text-xs space-y-1">
                      <p>Mon–Fri: {branch.hours.weekdays}</p>
                      <p>Sat: {branch.hours.saturday}</p>
                      <p className="text-red-400">Sun: {branch.hours.sunday}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a href={branch.mapsLink} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-full text-sm font-medium border-2 spring-hover"
                      style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                      Get Directions
                    </a>
                    <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-full text-sm font-medium text-white spring-hover"
                      style={{ background: '#25D366' }}>
                      WhatsApp
                    </a>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal marquee strip */}
      <div
        className="py-3 overflow-hidden"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            <span key={rep} className="flex gap-12 px-6">
              {['😁 Healthy Smiles', '🦷 Expert Care', '📅 Easy Booking', '💎 Premium Results', '🏆 10+ Years', '❤️ Family Friendly'].map(item => (
                <span key={item} className="text-white/90 text-sm font-medium tracking-wide whitespace-nowrap">{item}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-20 px-4 text-white text-center" style={{ background: 'var(--color-primary)' }}>
        <div className="max-w-2xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready for Your Best Smile?
            </h2>
            <p className="opacity-90 text-lg mb-8">Book today — same-day appointments often available.</p>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="magnetic-btn px-10 py-4 rounded-full font-semibold text-lg text-gray-900 spring-hover" style={{ background: 'var(--color-accent)' }}>
                Book Appointment
              </Link>
              <a href={`tel:${clinicConfig.phone}`} className="magnetic-btn px-10 py-4 rounded-full font-semibold text-lg border-2 border-white spring-hover hover:bg-white hover:text-gray-900 transition-colors">
                {clinicConfig.phone}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{clinicConfig.name}</h3>
              <p className="text-gray-400 text-sm">{clinicConfig.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-base text-gray-400">
                <Link href="/services" className="block hover:text-white transition-colors">Services</Link>
                <Link href="/about" className="block hover:text-white transition-colors">About Us</Link>
                <Link href="/book" className="block hover:text-white transition-colors">Book Appointment</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Our Branches</h4>
              <div className="space-y-4 text-sm text-gray-400">
                {clinicConfig.branches.map((branch) => (
                  <div key={branch.name}>
                    <p className="text-white text-xs font-semibold mb-1">{branch.name}</p>
                    <div className="flex items-start gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <a href={`tel:${branch.phone}`} className="hover:text-white">{branch.phone}</a>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-800">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <a href={`mailto:${clinicConfig.email}`} className="hover:text-white">{clinicConfig.email}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} {clinicConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
